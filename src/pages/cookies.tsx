import { Typography } from "@/components/Dumb/Typography";
import { Layout } from "@/components/Layout/Layout";
import { BUSINESS_EMAIL, BUSINESS_NAME } from "@/utils/businessInfo";

const Cookies = () => {
  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Typography variant="h1">Cookie Policy</Typography>

        <Typography variant="p-m-r">
          {`Questa Cookie Policy descrive i tipi di cookie utilizzati da ${BUSINESS_NAME} (di seguito "noi" o "il sito") e come questi vengono utilizzati per raccogliere e memorizzare informazioni quando visiti il nostro sito web.`}
        </Typography>

        <Typography variant="p-m-sb">Cosa sono i cookie?</Typography>

        <Typography variant="p-m-r">
          I cookie sono piccoli file di testo che vengono memorizzati nel tuo
          dispositivo (computer, smartphone, tablet) quando visiti il nostro
          sito web. I cookie ci permettono di migliorare la tua esperienza di
          navigazione, rendere più sicura l'interazione con il nostro sito e, in
          alcuni casi, personalizzare i contenuti.
        </Typography>

        <Typography variant="p-m-sb">Tipologie di cookie utilizzati</Typography>

        <Typography variant="p-m-r">
          Il nostro sito utilizza cookie di diverse categorie, che vengono
          suddivisi in:
        </Typography>

        <Typography variant="p-m-r">
          - <strong>Cookie necessari:</strong> essenziali per il corretto
          funzionamento del sito e per l'accesso a determinate aree riservate.
          <br />- <strong>Cookie di prestazione e analitici:</strong> raccolgono
          informazioni anonime su come gli utenti utilizzano il sito.
          <br />- <strong>Cookie di marketing e profilazione:</strong>{" "}
          utilizzati per raccogliere informazioni su come gli utenti
          interagiscono con il sito per personalizzare la pubblicità e le
          offerte.
        </Typography>

        <Typography variant="p-m-r">
          Nel nostro caso, utilizziamo principalmente{" "}
          <strong>cookie necessari</strong> per garantire il corretto
          funzionamento e la sicurezza del sito, specialmente durante il
          processo di autenticazione e per la gestione delle sessioni utente.
        </Typography>

        <Typography variant="p-m-sb">Cookie utilizzati</Typography>

        <Typography variant="p-m-r">
          <strong>1. `__cf_bm`</strong>
          <br />
          <strong>Scopo:</strong> Utilizzato da <strong>Cloudflare</strong> per
          la protezione del sito contro i bot e per la gestione del traffico
          legittimo.
          <br />
          <strong>Durata:</strong> 30 minuti
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>2. `__client`</strong>
          <br />
          <strong>Scopo:</strong> Mantiene la sessione dell'utente attiva e
          gestisce il login.
          <br />
          <strong>Durata:</strong> Durata della sessione
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>3. `__client_uat`</strong>
          <br />
          <strong>Scopo:</strong> Traccia lo stato dell'autenticazione utente e
          mantiene la sessione attiva.
          <br />
          <strong>Durata:</strong> Durata della sessione
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>4. `__client_uat_9M_6FFzm`</strong>
          <br />
          <strong>Scopo:</strong> Mantiene l'utente autenticato durante la
          sessione.
          <br />
          <strong>Durata:</strong> Durata della sessione
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>5. `__refresh_9M_6FFzm`</strong>
          <br />
          <strong>Scopo:</strong> Aggiorna il token di autenticazione per
          evitare interruzioni della sessione.
          <br />
          <strong>Durata:</strong> Durata della sessione
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>6. `__session`</strong>
          <br />
          <strong>Scopo:</strong> Gestisce e memorizza le informazioni relative
          alla sessione dell’utente.
          <br />
          <strong>Durata:</strong> Durata della sessione
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>7. `__session_9M_6FFzm`</strong>
          <br />
          <strong>Scopo:</strong> Traccia la sessione attiva dell’utente durante
          l’interazione con il sito.
          <br />
          <strong>Durata:</strong> Durata della sessione
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>8. `_cfuvid`</strong>
          <br />
          <strong>Scopo:</strong> Utilizzato da <strong>Cloudflare</strong> per
          migliorare la velocità e la sicurezza del sito.
          <br />
          <strong>Durata:</strong> 1 anno
          <br />
          <strong>Necessità di consenso:</strong> Essenziale, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-r">
          <strong>9. `__vercel_toolbar`</strong>
          <br />
          <strong>Scopo:</strong> Utilizzato da <strong>Vercel</strong> per
          mostrare una toolbar di debug negli ambienti di sviluppo o anteprima.
          Non raccoglie dati personali.
          <br />
          <strong>Durata:</strong> Sessione o finché abilitato
          <br />
          <strong>Necessità di consenso:</strong> Tecnico, non richiede
          consenso.
        </Typography>

        <Typography variant="p-m-sb">Gestione dei cookie</Typography>

        <Typography variant="p-m-r">
          Come indicato nella pagina di login, l'accesso alla piattaforma
          implica l'accettazione automatica dei cookie da parte dell'utente.
          Procedendo con l'accesso, accetti automaticamente l'uso dei cookie
          necessari.
        </Typography>

        <Typography variant="p-m-sb">Come disabilitare i cookie</Typography>

        <Typography variant="p-m-r">
          Puoi gestire i cookie nelle impostazioni del tuo browser. Di seguito
          alcuni link utili:
        </Typography>

        <Typography variant="p-m-r">
          -{" "}
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
          >
            Google Chrome
          </a>
          <br />-{" "}
          <a
            href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie"
            target="_blank"
          >
            Mozilla Firefox
          </a>
          <br />-{" "}
          <a
            href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
            target="_blank"
          >
            Safari
          </a>
          <br />-{" "}
          <a
            href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies"
            target="_blank"
          >
            Microsoft Edge
          </a>
        </Typography>

        <Typography variant="p-m-sb">Aggiornamenti</Typography>

        <Typography variant="p-m-r">
          Ci riserviamo il diritto di modificare questa Cookie Policy. Le
          modifiche saranno pubblicate su questa pagina. Ti invitiamo a
          controllare periodicamente per essere aggiornato.
        </Typography>

        <Typography variant="p-m-sb">Contatti</Typography>

        <Typography variant="p-m-r">
          Per qualsiasi domanda, contattaci a:
          <br />- Email: {BUSINESS_EMAIL}
        </Typography>
      </div>
    </Layout>
  );
};

export default Cookies;
