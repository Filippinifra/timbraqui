export const AdminPanel = () => {
  return (
    <div style={{ marginTop: 40 }}>
      <h2>Gestione utenti e timbrature (Admin)</h2>
      <div
        style={{
          margin: "24px 0",
          background: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 2px 8px #0001",
        }}
      >
        <b>Tabella utenti (placeholder)</b>
        <div>
          Qui puoi modificare, eliminare, aggiungere utenti della tua
          organizzazione.
        </div>
      </div>
      {/* TODO: Gestione timbrature di tutti gli utenti */}
      <div
        style={{
          margin: "24px 0",
          background: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 2px 8px #0001",
        }}
      >
        <b>Gestione timbrature (placeholder)</b>
        <div>
          Qui puoi vedere, modificare, eliminare e aggiungere le timbrature di
          tutti gli utenti.
        </div>
      </div>
    </div>
  );
};
