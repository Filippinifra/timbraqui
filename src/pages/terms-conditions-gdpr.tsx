import { Divider } from "@/components/Dumb/Divider";
import { Typography } from "@/components/Dumb/Typography";
import { Layout } from "@/components/Layout/Layout";
import { BUSINESS_EMAIL, BUSINESS_NAME } from "@/utils/businessInfo";
import { colors } from "@/utils/colors";
import { Routes } from "@/utils/routes";

const TermsConditionsGDPR = () => {
  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Typography variant="h1">Termini e Condizioni di Servizio</Typography>

        <Typography variant="h3">1. Introduzione</Typography>
        <Typography variant="p-m-r">
          Benvenuto su {BUSINESS_NAME}, la piattaforma digitale che permette a
          scuole e PMI di gestire con semplicità le presenze dei propri
          dipendenti. TimbraQui funge da ponte tecnologico tra il datore di
          lavoro e il personale, consentendo ai dipendenti di registrare
          ingressi e uscite in modo rapido e geolocalizzato e ai responsabili di
          monitorare le timbrature in maniera chiara, sicura e trasparente. I
          tre attori coinvolti sono: la piattaforma TimbraQui, l’azienda e i
          dipendenti.
        </Typography>
        <Typography variant="p-m-r">
          Per garantire un’esperienza sicura e affidabile, {BUSINESS_NAME} si
          avvale della collaborazione di partner tecnologici di fiducia:{" "}
          <strong>Clerk.js</strong>, che gestisce l’autenticazione degli utenti
          e offre login sicuro e moderno.
        </Typography>
        <Typography variant="p-m-r">
          L’uso della piattaforma implica l’accettazione di questi Termini e
          Condizioni.
        </Typography>

        <Divider color={colors.greyLight} />

        <Typography variant="h3">Termini e Condizioni</Typography>

        <Typography variant="p-m-sb">2. Registrazione e Account</Typography>
        <Typography variant="p-m-r">
          • Gli admin possono accedere alla piattaforma solo dopo aver
          contattato l'amministratore a {BUSINESS_EMAIL} e aver sottoscritto un
          piano.
        </Typography>
        <Typography variant="p-m-r">
          • Gli utenti possono accedere alla piattaforma solo se precedentemente
          invitati da un admin.
        </Typography>

        <Typography variant="p-m-sb">
          3. Funzionamento della Piattaforma
        </Typography>
        <Typography variant="p-m-r">
          • Gli admin possono invitare nuovi utenti alla piattaforma tramite
          interfaccia, possono visualizzare, modificare e eliminare tutti gli
          utenti e modificarne i dati. Per ogni organizzazione è possibile
          invitare un numero massimo di utenti attivi deciso in fase di
          sottoscrizione.
        </Typography>
        <Typography variant="p-m-r">
          • Gli utenti possono visualizzare le proprie timbrature e timbrare
          solo se con la geolocalizzazione abilitata e nei pressi dell'indirizzo
          dell'organizzazione. Ogni timbratura può essere effettuata una volta
          ogni 30 minuti.
        </Typography>

        <Typography variant="p-m-sb">4. Geolocalizzazione</Typography>
        <Typography variant="p-m-r">
          • La geolocalizzazione è necessaria per timbrare le presenze. Non
          siamo in grado di tracciare la posizione dell'utente se la
          geolocalizzazione non è abilitata. La geolocalizzazione è abilitata
          solo se l'utente visita il sito della piattaforma. Gli indirizzi di
          geolocalizzazione non sono memorizzati nel database, servono solo per
          verificare che l'utente sia nei pressi dell'organizzazione.
        </Typography>

        <Divider color={colors.greyLight} />

        <Typography variant="h3">Informativa sulla Privacy (GDPR)</Typography>

        <Typography variant="p-m-sb">1. Introduzione</Typography>
        <Typography variant="p-m-r">
          Questa informativa descrive come raccogliamo, utilizziamo e
          proteggiamo i dati personali in conformità al GDPR.
        </Typography>

        <Typography variant="p-m-sb">2. Tipologie di Dati Raccolti</Typography>
        <Typography variant="p-m-r">
          • Dati identificativi: nome, cognome, email, password (hashata).
        </Typography>
        <Typography variant="p-m-r">
          • Dati riguardo le timbrature: orario, utente che ha timbrato.
        </Typography>
        <Typography variant="p-m-r">
          • Dati tecnici e di navigazione: tipo dispositivo, sistema operativo,
          browser, cookie tecnici e analitici.
        </Typography>

        <Typography variant="p-m-sb">3. Finalità del Trattamento</Typography>
        <Typography variant="p-m-r">• Fornitura e gestione servizi</Typography>
        <Typography variant="p-m-r">
          • Fatturazione, transazioni e notifiche
        </Typography>
        <Typography variant="p-m-r">
          • Sicurezza e adempimenti legali
        </Typography>

        <Typography variant="p-m-sb">4. Condivisione Dati</Typography>
        <Typography variant="p-m-r">
          • Con autorità competenti ove richiesto
        </Typography>

        <Typography variant="p-m-sb">5. Conservazione Dati</Typography>
        <Typography variant="p-m-r">
          I dati vengono conservati per il tempo necessario alla fornitura dei
          servizi e secondo legge.
        </Typography>

        <Typography variant="p-m-sb">6. Diritti degli Utenti</Typography>
        <Typography variant="p-m-r">
          • Accesso, rettifica, cancellazione
        </Typography>
        <Typography variant="p-m-r">
          • Limitazione e opposizione trattamento
        </Typography>
        <Typography variant="p-m-r">• Portabilità dei dati</Typography>

        <Typography variant="p-m-sb">7. Sicurezza</Typography>
        <Typography variant="p-m-r">
          Crittografia, firewall, accessi controllati e monitoraggio continuo in
          conformità GDPR.
        </Typography>

        <Typography variant="p-m-sb">8. Cookie</Typography>
        <Typography variant="p-m-r">
          Utilizziamo cookie tecnici e di terze parti (Clerk.js) per far
          funzionare la piattaforma. Per maggiori informazioni sui cookie
          utilizzati, consulta la nostra{" "}
          <Typography
            variant="p-m-r"
            href={Routes.cookies}
            color={colors.primary}
            component="a"
          >
            Cookie policy
          </Typography>
        </Typography>

        <Divider color={colors.greyLight} />

        <Typography variant="p-m-r">
          Per qualsiasi domanda o richiesta, contattaci a{" "}
          <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
        </Typography>
      </div>
    </Layout>
  );
};

export default TermsConditionsGDPR;
