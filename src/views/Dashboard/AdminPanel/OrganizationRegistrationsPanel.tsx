import { Button } from "@/components/Dumb/Button";
import { DatePicker } from "@/components/Dumb/DatePicker";
import { Divider } from "@/components/Dumb/Divider";
import { Dropdown } from "@/components/Dumb/Dropdown";
import { DropdownForm } from "@/components/Dumb/FormElements/DropdownForm";
import { InputForm } from "@/components/Dumb/FormElements/InputForm";
import { IconButton } from "@/components/Dumb/IconButton";
import { Modal } from "@/components/Dumb/Modal";
import { Panel } from "@/components/Dumb/Panel";
import { Spacer } from "@/components/Dumb/Spacer";
import { Switcher } from "@/components/Dumb/Switcher";
import { Table } from "@/components/Dumb/Table";
import { Typography } from "@/components/Dumb/Typography";
import { useToast } from "@/context/ToastContext";
import { useOrganizationRegistrations } from "@/hooks/api/useRegistrations";
import { useAxios } from "@/hooks/useAxios";
import { toRegistrationApi } from "@/mappers/toRegistration";
import { Organization } from "@/types/Organization";
import { RegistrationApi } from "@/types/Registration";
import { User } from "@/types/User";
import { colors } from "@/utils/colors";
import { groupRegistrationsByDay } from "@/utils/registrations";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { v4 } from "uuid";
import * as Yup from "yup";
import { Calendar } from "../UserPanel/Calendar";

type view = "list" | "calendar" | "listGrouped";

export const OrganizationRegistrationsPanel: FC<{
  organization: Organization;
  users: User[];
}> = ({ organization, users }) => {
  const axios = useAxios();
  const { showToast } = useToast();
  const [isAddRegOpen, setIsAddRegOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [filterUserId, setFilterUserId] = useState<string | "all">("all");
  const [view, setView] = useState<view>("listGrouped");
  const [registrationIdToRemove, setRegistrationIdToRemove] = useState<
    string | null
  >(null);

  const {
    registration: orgRegistrations,
    registrationLoading,
    refreshRegistrations,
  } = useOrganizationRegistrations(organization.id);

  const orgRegistrationsToShow = orgRegistrations
    ?.filter((r) => (filterUserId === "all" ? true : r.userId === filterUserId))
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

  const orgRegistrationsByDayToShowGrouped = groupRegistrationsByDay(
    orgRegistrationsToShow || []
  );

  const regToRemove = orgRegistrations?.find(
    (r) => r.id === registrationIdToRemove
  );
  const onDeleteRegistration = async () => {
    if (regToRemove) {
      try {
        await axios("/api/registrations", "DELETE", {
          id: registrationIdToRemove,
        });
        setRegistrationIdToRemove(null);
        refreshRegistrations(toRegistrationApi(regToRemove), "remove");
        showToast("success");
      } catch {
        showToast("error");
      }
    }
  };

  return (
    <>
      <Modal
        visible={Boolean(registrationIdToRemove)}
        onClose={() => setRegistrationIdToRemove(null)}
        title={"Conferma eliminazione"}
      >
        <Typography variant="p-m-r">
          {`Sei sicuro di voler eliminare la registrazione di ${
            users?.find((u) => u.id === regToRemove?.userId)?.name ||
            "questo utente"
          } del ${dayjs(regToRemove?.date).format(
            "D MMMM YYYY (dddd)"
          )} delle ore ${dayjs(regToRemove?.date).format("HH:mm")}?`}
        </Typography>
        <Spacer size={16} />
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setRegistrationIdToRemove(null)}
          >
            Annulla
          </Button>
          <Button
            variant="distructive"
            type="button"
            onClick={onDeleteRegistration}
          >
            Elimina
          </Button>
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Timbrature utenti</Typography>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => setIsExportOpen(true)}
            variant="secondary"
            icon="Download"
          >
            Esporta timbrature
          </Button>
          <Button onClick={() => setIsAddRegOpen(true)} icon="Plus">
            Aggiungi timbratura
          </Button>
        </div>
      </div>
      <Spacer size={16} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <div style={{ minWidth: 200 }}>
          <Dropdown
            onChange={(v) => {
              setFilterUserId(v.value);
            }}
            value={
              filterUserId && filterUserId !== "all"
                ? {
                    label: `${
                      users.find(({ id }) => id === filterUserId)?.name
                    } ${users.find(({ id }) => id === filterUserId)?.surname}`,
                    value: filterUserId,
                  }
                : null
            }
            placeholder="Tutti"
            options={[
              ...(view !== "calendar"
                ? [{ label: "Tutti", value: "all" }]
                : []),
              ...users.map((u) => ({
                label: `${u.name} ${u.surname}`.trim() || u.email,
                value: u.id,
              })),
            ]}
            menuPosition="fixed"
          />
        </div>
        <Switcher
          active={view}
          elements={[
            { icon: "ListCheck", id: "listGrouped" },
            { icon: "List", id: "list" },
            { icon: "Calendar", id: "calendar" },
          ]}
          onChange={(id) => {
            if (id === "calendar" && filterUserId === "all" && users[0]) {
              setFilterUserId(users[0].id);
            }
            setView(id as view);
          }}
        />
      </div>
      <Spacer size={8} />
      <Panel>
        <div style={{ minHeight: 600 }}>
          {registrationLoading && (
            <Typography variant="p-s-r">Caricamento timbrature...</Typography>
          )}
          {!!orgRegistrations?.length ? (
            <>
              {view === "listGrouped" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 48 }}
                >
                  {orgRegistrationsByDayToShowGrouped.map(
                    ({ day, items: registrations }, index) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                        }}
                        key={day}
                      >
                        <Typography variant="p-m-sb">
                          {dayjs(day).format("D MMMM YYYY (dddd)")}
                        </Typography>
                        <Table
                          maxWidth="400px"
                          headers={["Utente", "Ora entrata", "Ora uscita"]}
                          values={registrations?.reverse().map((r) => {
                            const u = users.find((u) => u.id === r.userId);

                            return [
                              <div style={{ width: 120 }} key="cell-name">
                                <Typography
                                  variant="p-s-r"
                                  color={r.out ? "#0f172a" : colors.error}
                                  ellipsis
                                >
                                  {u
                                    ? `${u.name} ${u.surname}`.trim() || u.email
                                    : r.userId}
                                </Typography>
                              </div>,
                              <Typography
                                variant="p-s-r"
                                color={r.out ? "#64748b" : colors.error}
                                key="cell-in"
                              >
                                {r.in}
                              </Typography>,
                              <Typography
                                variant="p-s-r"
                                color={r.out ? "#64748b" : colors.error}
                                key="cell-out"
                              >
                                {r.out || "-"}
                              </Typography>,
                            ];
                          })}
                          padding="4px 24px"
                        />
                        {index !==
                        orgRegistrationsByDayToShowGrouped.length - 1 ? (
                          <div>
                            <Spacer size={32} />
                            <Divider />
                          </div>
                        ) : null}
                      </div>
                    )
                  )}
                </div>
              )}
              {view === "list" && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 48 }}
                >
                  <Table
                    headers={["Utente", "Data", "Ora", "Azioni"]}
                    values={orgRegistrationsToShow?.reverse().map((r) => {
                      const u = users.find((u) => u.id === r.userId);

                      return [
                        <div style={{ width: 120 }} key="cell-name">
                          <Typography
                            variant="p-s-r"
                            color={"#0f172a"}
                            ellipsis
                          >
                            {u
                              ? `${u.name} ${u.surname}`.trim() || u.email
                              : r.userId}
                          </Typography>
                        </div>,
                        <Typography
                          variant="p-s-r"
                          color={"#64748b"}
                          key="cell-date"
                        >
                          {dayjs(r.date).format("D MMMM YYYY (ddd)")}
                        </Typography>,
                        <Typography
                          variant="p-s-r"
                          color={"#64748b"}
                          key="cell-hour"
                        >
                          {dayjs(r.date).format("HH:mm")}
                        </Typography>,
                        <IconButton
                          icon="Trash2"
                          onClick={() => {
                            setRegistrationIdToRemove(r.id);
                          }}
                          key="cell-trash"
                        />,
                      ];
                    })}
                    padding="4px 24px"
                  />
                </div>
              )}
              {view === "calendar" && (
                <Calendar registrations={orgRegistrationsToShow} />
              )}
            </>
          ) : (
            <Typography variant="p-s-r" color="lightgray">
              Nessuna timbratura
            </Typography>
          )}
        </div>
      </Panel>

      <Modal
        visible={isAddRegOpen}
        onClose={() => setIsAddRegOpen(false)}
        title="Aggiungi timbratura"
      >
        <Formik
          enableReinitialize
          validationSchema={Yup.object({
            userId: Yup.string().required("Campo obbligatorio"),
            date: Yup.date().required("Campo obbligatorio"),
            time: Yup.string()
              .matches(/^\d{2}:\d{2}$/g, "Formato HH:mm")
              .required("Campo obbligatorio"),
          })}
          initialValues={{
            userId: "",
            date: new Date(),
            time: dayjs().format("HH:mm"),
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload: RegistrationApi = {
                id: v4(),
                created_at: dayjs().toISOString(),
                date: dayjs(values.date)
                  .hour(Number(values.time.split(":")[0]))
                  .minute(Number(values.time.split(":")[1]))
                  .toISOString(),
                user_id: values.userId as unknown as string,
              } as RegistrationApi;

              await axios<RegistrationApi>(
                "/api/registrations",
                "POST",
                payload
              );

              await refreshRegistrations(payload, "add");
              setIsAddRegOpen(false);
              showToast("success", "Timbratura aggiunta");
            } catch {
              showToast("error", "Errore nell'aggiunta della timbratura");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: 12, minWidth: 340 }}>
                <DropdownForm
                  name="userId"
                  title="Utente"
                  placeholder="Seleziona utente"
                  options={users.map((u) => ({
                    label: `${u.name} ${u.surname}`.trim() || u.email,
                    value: u.id,
                  }))}
                  isRequired
                  menuPosition="absolute"
                />
                <div>
                  <Typography variant="p-s-sb">Data</Typography>
                  <Spacer size={4} />
                  <DatePicker
                    value={{
                      from: values.date as Date,
                      to: values.date as Date,
                    }}
                    onChange={(dr) => {
                      setFieldValue("date", dr?.to || new Date());
                    }}
                    datesDisabled={() => false}
                  />
                </div>
                <InputForm
                  name="time"
                  title="Ora"
                  placeholder="HH:mm"
                  isRequired
                />
              </div>
              <Spacer size={16} />
              <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setIsAddRegOpen(false)}
                >
                  Annulla
                </Button>
                <Button type="submit">Salva</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        visible={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Esporta timbrature"
      >
        <Formik
          enableReinitialize
          validationSchema={Yup.object({
            dateRange: Yup.object({
              from: Yup.date().required("Data inizio richiesta"),
              to: Yup.date().required("Data fine richiesta"),
            }).required(),
            userIds: Yup.array()
              .min(1, "Seleziona almeno un utente")
              .required(),
            format: Yup.string().oneOf(["csv", "json"]).required(),
          })}
          initialValues={{
            dateRange: {
              from: dayjs().startOf("month").toDate(),
              to: dayjs().endOf("month").toDate(),
            },
            userIds: users.map((u) => u.id),
            format: "csv" as "csv" | "json",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const filteredRegistrations =
                orgRegistrations?.filter((r) => {
                  const regDate = dayjs(r.date);
                  const isInRange =
                    regDate.isAfter(values.dateRange.from) &&
                    regDate.isBefore(values.dateRange.to);
                  const isUserSelected = values.userIds.includes(r.userId);
                  return isInRange && isUserSelected;
                }) || [];

              if (filteredRegistrations.length === 0) {
                showToast(
                  "error",
                  "Nessuna timbratura trovata per i criteri selezionati"
                );
                return;
              }

              if (values.format === "csv") {
                const csvContent = [
                  "Utente,Data,Ora",
                  ...filteredRegistrations.map((r) => {
                    const u = users.find((u) => u.id === r.userId);
                    const userName = u
                      ? `${u.name} ${u.surname}`.trim() || u.email
                      : r.userId;
                    const date = dayjs(r.date).format("DD/MM/YYYY");
                    const time = dayjs(r.date).format("HH:mm");
                    return `"${userName}","${date}","${time}"`;
                  }),
                ].join("\n");

                const blob = new Blob([csvContent], {
                  type: "text/csv;charset=utf-8;",
                });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `timbrature_${dayjs(
                  values.dateRange.from
                ).format("YYYY-MM-DD")}_${dayjs(values.dateRange.to).format(
                  "YYYY-MM-DD"
                )}.csv`;
                link.click();
              } else {
                const jsonContent = JSON.stringify(
                  filteredRegistrations.map((r) => {
                    const u = users.find((u) => u.id === r.userId);
                    return {
                      utente: u
                        ? `${u.name} ${u.surname}`.trim() || u.email
                        : r.userId,
                      data: dayjs(r.date).format("DD/MM/YYYY"),
                      ora: dayjs(r.date).format("HH:mm"),
                      timestamp: r.date,
                    };
                  }),
                  null,
                  2
                );

                const blob = new Blob([jsonContent], {
                  type: "application/json",
                });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `timbrature_${dayjs(
                  values.dateRange.from
                ).format("YYYY-MM-DD")}_${dayjs(values.dateRange.to).format(
                  "YYYY-MM-DD"
                )}.json`;
                link.click();
              }

              showToast("success", "Esportazione completata");
              setIsExportOpen(false);
            } catch {
              showToast("error", "Errore durante l'esportazione");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: 16, minWidth: 400 }}>
                <div>
                  <Typography variant="p-s-sb">Intervallo date</Typography>
                  <Spacer size={4} />
                  <DatePicker
                    value={values.dateRange}
                    onChange={(dr) => {
                      setFieldValue(
                        "dateRange",
                        dr || { from: new Date(), to: new Date() }
                      );
                    }}
                    datesDisabled={() => false}
                  />
                </div>

                <div>
                  <Typography variant="p-s-sb">Utenti</Typography>
                  <Spacer size={4} />
                  <DropdownForm
                    name="userIds"
                    title=""
                    placeholder="Seleziona utenti"
                    options={users.map((u) => ({
                      label: `${u.name} ${u.surname}`.trim() || u.email,
                      value: u.id,
                    }))}
                    isMulti
                    menuPosition="absolute"
                  />
                </div>

                <div>
                  <Typography variant="p-s-sb">Formato</Typography>
                  <Spacer size={4} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      type="button"
                      variant={
                        values.format === "csv" ? "primary" : "secondary"
                      }
                      onClick={() => setFieldValue("format", "csv")}
                    >
                      CSV
                    </Button>
                    <Button
                      type="button"
                      variant={
                        values.format === "json" ? "primary" : "secondary"
                      }
                      onClick={() => setFieldValue("format", "json")}
                    >
                      JSON
                    </Button>
                  </div>
                </div>
              </div>
              <Spacer size={16} />
              <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setIsExportOpen(false)}
                >
                  Annulla
                </Button>
                <Button type="submit">Esporta</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
