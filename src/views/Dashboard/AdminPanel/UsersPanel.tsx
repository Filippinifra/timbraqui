import { Button } from "@/components/Dumb/Button";
import { Modal } from "@/components/Dumb/Modal";
import { Panel } from "@/components/Dumb/Panel";
import { Spacer } from "@/components/Dumb/Spacer";
import { Table } from "@/components/Dumb/Table";
import { Typography } from "@/components/Dumb/Typography";
import { useUsers } from "@/hooks/api/useUsers";
import { useAxios } from "@/hooks/useAxios";
import { Organization } from "@/types/Organization";
import { colors } from "@/utils/colors";
import dayjs from "dayjs";
import { useState } from "react";
import { UserFormModal } from "./UserFormModal";

export const UsersPanel = ({
  organization,
}: {
  organization: Organization;
}) => {
  const { users, usersLoading, usersError, refreshUsers } = useUsers(
    organization.id
  );
  const axios = useAxios();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setMode("add");
    setSelectedUserId(null);
    setIsModalOpen(true);
  };

  const openEdit = (id: string) => {
    setMode("edit");
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = async () => {
    if (!userToDeleteId) return;
    await axios(`/api/users?id=${userToDeleteId}`, "DELETE");
    await refreshUsers();
    setUserToDeleteId(null);
  };

  return (
    <div>
      <Modal
        visible={Boolean(userToDeleteId)}
        onClose={() => setUserToDeleteId(null)}
        title={"Conferma eliminazione"}
      >
        <Typography variant="p-m-r">
          {`Sei sicuro di voler eliminare ${
            users?.find((u) => u.id === userToDeleteId)?.name || "questo utente"
          }?`}
        </Typography>
        <Spacer size={16} />
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setUserToDeleteId(null)}
          >
            Annulla
          </Button>
          <Button variant="distructive" type="button" onClick={confirmDelete}>
            Elimina
          </Button>
        </div>
      </Modal>
      <UserFormModal
        visible={isModalOpen}
        onClose={closeModal}
        mode={mode}
        organization={organization}
        selectedUserId={selectedUserId}
        users={users}
        refreshUsers={refreshUsers}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Utenti</Typography>
        <Button onClick={openAdd} icon="Plus">
          Aggiungi utente
        </Button>
      </div>
      <Spacer size={8} />
      <Panel>
        {usersLoading && (
          <Typography variant="p-s-r">Caricamento utenti...</Typography>
        )}
        {usersError && (
          <Typography variant="p-s-r" color="#ef4444">
            Errore nel caricamento utenti.
          </Typography>
        )}
        {!!users?.length ? (
          <Table
            headers={[
              "Nome",
              "Cognome",
              "Email",
              "Creato il",
              "Stato",
              "Azioni",
            ]}
            values={users
              .sort(({ createdAt: ca1 }, { createdAt: ca2 }) =>
                dayjs(ca1).isBefore(dayjs(ca2)) ? -1 : 1
              )
              .map((u) => {
                const colorTextRow = u.active ? "#64748b" : "#bebebe";

                return [
                  <Typography
                    variant="p-s-r"
                    key="cell-name"
                    color={colorTextRow}
                  >
                    {u.name}
                  </Typography>,
                  <Typography
                    variant="p-s-r"
                    key="cell-surname"
                    color={colorTextRow}
                  >
                    {u.surname}
                  </Typography>,
                  <Typography
                    variant="p-s-r"
                    key="cell-email"
                    color={colorTextRow}
                  >
                    {u.email}
                  </Typography>,
                  <Typography
                    variant="p-s-r"
                    color={colorTextRow}
                    key="cell-created"
                  >
                    {new Date(u.createdAt).toLocaleDateString()}
                  </Typography>,
                  <Typography
                    variant="p-s-r"
                    color={u.active ? colors.success : colors.error}
                    key="cell-status"
                  >
                    {u.active ? "Attivo" : "Non attivo"}
                  </Typography>,
                  <div key="cell-buttons" style={{ minHeight: 38 }}>
                    {!organization.adminId.some((e) => e === u.id) && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button
                          variant="tertiary"
                          onClick={() => openEdit(u.id)}
                        >
                          Modifica
                        </Button>
                        <Button
                          variant="distructive"
                          onClick={() => setUserToDeleteId(u.id)}
                        >
                          Elimina
                        </Button>
                      </div>
                    )}
                  </div>,
                ];
              })}
          />
        ) : (
          !usersLoading && (
            <Typography variant="p-s-r" color="lightgray">
              Nessun utente presente.
            </Typography>
          )
        )}
      </Panel>
    </div>
  );
};
