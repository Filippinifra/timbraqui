import { Button } from "@/components/Dumb/Button";
import { DropdownForm } from "@/components/Dumb/FormElements/DropdownForm";
import { InputForm } from "@/components/Dumb/FormElements/InputForm";
import { Modal } from "@/components/Dumb/Modal";
import { Panel } from "@/components/Dumb/Panel";
import { Spacer } from "@/components/Dumb/Spacer";
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

export const OrganizationRegistrationsPanel: FC<{
  organization: Organization;
  users: User[];
}> = ({ organization, users }) => {
  const axios = useAxios();
  const { showToast } = useToast();
  const [isAddRegOpen, setIsAddRegOpen] = useState(false);
  const [filterUserId, setFilterUserId] = useState<string | "all">("all");

  const {
    registration: orgRegistrations,
    registrationLoading,
  } = useOrganizationRegistrations(organization.id);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="p-m-r">Timbrature utenti</Typography>
        <Button onClick={() => setIsAddRegOpen(true)}>Aggiungi timbratura</Button>
      </div>
      <Spacer size={8} />
      <div style={{ maxWidth: 360 }}>
        <Formik
          enableReinitialize
          initialValues={{ userId: filterUserId }}
          onSubmit={() => {}}
        >
          {({ setFieldValue }) => (
            <Form>
              <DropdownForm
                name="userId"
                title="Filtra per utente"
                placeholder="Tutti"
                options={[
                  { label: "Tutti", value: "all" },
                  ...users.map((u) => ({
                    label: `${u.name} ${u.surname}`.trim() || u.email,
                    value: u.id,
                  })),
                ]}
                menuPosition="fixed"
              />
            </Form>
          )}
        </Formik>
      </div>
      <Spacer size={8} />
      <Panel>
        {registrationLoading && (
          <Typography variant="p-s-r">Caricamento timbrature...</Typography>
        )}
        {!!orgRegistrations?.length ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>Utente</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Data</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Ora</th>
                </tr>
              </thead>
              <tbody>
                {orgRegistrations
                  .filter((r) => (filterUserId === "all" ? true : r.userId === filterUserId))
                  .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
                  .map((r) => {
                    const u = users.find((u) => u.id === r.userId);
                    return (
                      <tr key={r.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                        <td style={{ padding: 8 }}>
                          <Typography variant="p-s-r" color="#0f172a">
                            {u ? `${u.name} ${u.surname}`.trim() || u.email : r.userId}
                          </Typography>
                        </td>
                        <td style={{ padding: 8 }}>
                          <Typography variant="p-s-r" color="#64748b">
                            {dayjs(r.date).format("DD/MM/YYYY")}
                          </Typography>
                        </td>
                        <td style={{ padding: 8 }}>
                          <Typography variant="p-s-r" color="#64748b">
                            {dayjs(r.date).format("HH:mm")}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <Typography variant="p-s-r" color="lightgray">Nessuna timbratura</Typography>
        )}
      </Panel>

      <Modal visible={isAddRegOpen} onClose={() => setIsAddRegOpen(false)} title="Aggiungi timbratura">
        <Formik
          enableReinitialize
          initialValues={{ userId: "", datetime: dayjs().format("YYYY-MM-DDTHH:mm") }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload: RegistrationApi = {
                id: v4(),
                created_at: dayjs().toISOString(),
                date: dayjs(values.datetime).toISOString(),
                user_id: values.userId as unknown as string,
              } as RegistrationApi;
              await axios<RegistrationApi>("/api/registrations", "POST", payload);
              setIsAddRegOpen(false);
              showToast("success", "Timbratura aggiunta");
            } catch {
              showToast("error", "Errore nell'aggiunta della timbratura");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit }) => (
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
                  menuPosition="fixed"
                />
                <InputForm name="datetime" title="Data e ora" placeholder="" isRequired />
              </div>
              <Spacer size={16} />
              <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
                <Button variant="secondary" type="button" onClick={() => setIsAddRegOpen(false)}>
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


