import { Button } from "@/components/Dumb/Button";
import { DatePicker } from "@/components/Dumb/DatePicker";
import { Dropdown } from "@/components/Dumb/Dropdown";
import { DropdownForm } from "@/components/Dumb/FormElements/DropdownForm";
import { InputForm } from "@/components/Dumb/FormElements/InputForm";
import { Modal } from "@/components/Dumb/Modal";
import { Panel } from "@/components/Dumb/Panel";
import { Spacer } from "@/components/Dumb/Spacer";
import { Switcher } from "@/components/Dumb/Switcher";
import { Table } from "@/components/Dumb/Table";
import { Typography } from "@/components/Dumb/Typography";
import { useToast } from "@/context/ToastContext";
import { useOrganizationRegistrations } from "@/hooks/api/useRegistrations";
import { useAxios } from "@/hooks/useAxios";
import { Organization } from "@/types/Organization";
import { RegistrationApi } from "@/types/Registration";
import { User } from "@/types/User";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { v4 } from "uuid";
import * as Yup from "yup";
import { Calendar } from "../UserPanel/Calendar";

type view = "list" | "calendar";

export const OrganizationRegistrationsPanel: FC<{
  organization: Organization;
  users: User[];
}> = ({ organization, users }) => {
  const axios = useAxios();
  const { showToast } = useToast();
  const [isAddRegOpen, setIsAddRegOpen] = useState(false);
  const [filterUserId, setFilterUserId] = useState<string | "all">("all");
  const [view, setView] = useState<view>("list");

  const {
    registration: orgRegistrations,
    registrationLoading,
    refreshRegistrations,
  } = useOrganizationRegistrations(organization.id);

  const orgRegistrationsToShow = orgRegistrations
    ?.filter((r) => (filterUserId === "all" ? true : r.userId === filterUserId))
    .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="p-m-r">Timbrature utenti</Typography>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => {}} variant="secondary" icon="Download">
            Esporta timbrature
          </Button>
          <Button onClick={() => setIsAddRegOpen(true)} icon="Plus">
            Aggiungi timbratura
          </Button>
        </div>
      </div>
      <Spacer size={8} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        {registrationLoading && (
          <Typography variant="p-s-r">Caricamento timbrature...</Typography>
        )}
        {!!orgRegistrations?.length ? (
          <>
            {view === "list" && (
              <Table
                headers={["Utente", "Data", "Ora"]}
                values={orgRegistrationsToShow?.map((r) => {
                  const u = users.find((u) => u.id === r.userId);
                  return [
                    <Typography variant="p-s-r" color="#0f172a" ellipsis>
                      {u
                        ? `${u.name} ${u.surname}`.trim() || u.email
                        : r.userId}
                    </Typography>,
                    <Typography variant="p-s-r" color="#64748b">
                      {dayjs(r.date).format("DD/MM/YYYY")}
                    </Typography>,
                    <Typography variant="p-s-r" color="#64748b">
                      {dayjs(r.date).format("HH:mm")}
                    </Typography>,
                  ];
                })}
                maxWidth="500px"
                padding="4px 24px"
              />
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
    </>
  );
};
