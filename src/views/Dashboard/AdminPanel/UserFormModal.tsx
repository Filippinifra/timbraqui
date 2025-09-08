import { Button } from "@/components/Dumb/Button";
import { Checkbox } from "@/components/Dumb/Checkbox";
import { InputForm } from "@/components/Dumb/FormElements/InputForm";
import { Modal } from "@/components/Dumb/Modal";
import { Spacer } from "@/components/Dumb/Spacer";
import { useToast } from "@/context/ToastContext";
import { useAxios } from "@/hooks/useAxios";
import { Organization } from "@/types/Organization";
import { User, UserApi } from "@/types/User";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { FC, useMemo } from "react";
import { v4 } from "uuid";
import * as Yup from "yup";

type Props = {
  visible: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  organization: Organization;
  selectedUserId: string | null;
  users: User[] | undefined;
  refreshUsers: () => Promise<any>;
};

export const UserFormModal: FC<Props> = ({
  visible,
  onClose,
  mode,
  organization,
  selectedUserId,
  users,
  refreshUsers,
}) => {
  const axios = useAxios();
  const { showToast } = useToast();

  const initialValues = useMemo(
    () => ({ name: "", surname: "", email: "", active: true }),
    []
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required("Campo obbligatorio"),
        surname: Yup.string().required("Campo obbligatorio"),
        email: Yup.string()
          .email("Email non valida")
          .required("Campo obbligatorio"),
        active: Yup.boolean().required(),
      }),
    []
  );

  const onSubmit = async (values: Yup.InferType<typeof validationSchema>) => {
    try {
      if (mode === "add") {
        await axios<UserApi>("/api/users", "POST", {
          org_id: organization.id,
          name: values.name || "",
          surname: values.surname,
          email: values.email,
          created_at: dayjs().toISOString(),
          id: v4(),
          deleted: false,
          active: values.active,
        });
        showToast("success", "Utente aggiunto con successo");
      } else if (mode === "edit" && selectedUserId) {
        await axios<UserApi>("/api/users", "PUT", {
          id: selectedUserId,
          name: values.name,
          surname: values.surname,
          email: values.email,
          created_at: userSelected?.createdAt || "",
          org_id: organization.id,
          deleted: false,
          active: values.active,
        });
        showToast("success", "Utente aggiornato con successo");
      }
      await refreshUsers();
      onClose();
    } catch {
      showToast("error", "Errore nel salvataggio dell'utente");
    }
  };

  const userSelected = users?.find((u) => u.id === selectedUserId);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={mode === "add" ? "Aggiungi utente" : "Modifica utente"}
    >
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={
          mode === "edit"
            ? {
                name: userSelected?.name || "",
                surname: userSelected?.surname || "",
                email: userSelected?.email || "",
                active:
                  userSelected?.active !== undefined
                    ? userSelected?.active
                    : true,
              }
            : initialValues
        }
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: 12, minWidth: 320 }}>
              <InputForm
                name="name"
                title="Nome"
                placeholder="Mario"
                isRequired
              />
              <InputForm
                name="surname"
                title="Cognome"
                placeholder="Rossi"
                isRequired
              />
              <InputForm
                name="email"
                title="Email"
                placeholder="mario.rossi@example.com"
                isRequired
              />
              <Checkbox
                checked={values.active}
                onChange={(v) => {
                  setFieldValue("active", v);
                }}
              >
                Attivo
              </Checkbox>
            </div>
            <Spacer size={16} />
            <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
              <Button
                variant="secondary"
                onClick={onClose}
                type="button"
                disabled={isSubmitting}
              >
                Annulla
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Salva
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
