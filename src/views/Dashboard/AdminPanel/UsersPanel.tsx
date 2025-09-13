import { Button } from "@/components/Dumb/Button";
import { Modal } from "@/components/Dumb/Modal";
import { Spacer } from "@/components/Dumb/Spacer";
import { Table } from "@/components/Dumb/Table";
import { Typography } from "@/components/Dumb/Typography";
import { useToast } from "@/context/ToastContext";
import { useUsers } from "@/hooks/api/useUsers";
import { useAxios } from "@/hooks/useAxios";
import { Organization } from "@/types/Organization";
import { colors } from "@/utils/colors";
import dayjs from "dayjs";
import { useState } from "react";
import { UserFormModal } from "./UserFormModal";
import {
  panelActions,
  panelActionsDesktop,
  panelActionsMobile,
  panelHeader,
  panelTitle,
} from "./styles.css";

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

  const { showToast } = useToast();

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

    try {
      await axios(`/api/users?id=${userToDeleteId}`, "DELETE");
      await refreshUsers();
      showToast("success", "Utente eliminato con successo");
      setUserToDeleteId(null);
    } catch {
      showToast("error", "Errore nell'eliminazione dell'utente");
    }
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
          background: "white",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f1f5f9",
        }}
      >
        <div className={panelHeader}>
          <div className={panelTitle}>
            <div
              style={{
                background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
                borderRadius: "12px",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>👥</span>
            </div>
            <div>
              <Typography variant="h3" style={{ color: "#1e293b", margin: 0 }}>
                Gestione Utenti
              </Typography>
              <Typography variant="p-s-r" color="#64748b" style={{ margin: 0 }}>
                Aggiungi, modifica e gestisci i membri del team
              </Typography>
            </div>
          </div>
          <div className={panelActions}>
            <div className={panelActionsDesktop}>
              <Button onClick={openAdd} icon="Plus" variant="success">
                Aggiungi Utente
              </Button>
            </div>
            <div className={panelActionsMobile}>
              <div style={{ width: "100%" }}>
                <Button onClick={openAdd} icon="Plus" variant="success">
                  Aggiungi Utente
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Spacer size={32} />
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
      </div>
    </div>
  );
};
