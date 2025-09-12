import { checkRouteAndRedirect } from "@/auth/checkRouteAndRedirect";
import { Spacer } from "@/components/Dumb/Spacer";
import { Typography } from "@/components/Dumb/Typography";
import { useAuthData } from "@/context/AuthDataContext";
import { BUSINESS_EMAIL, BUSINESS_NAME } from "@/utils/businessInfo";
import { colors } from "@/utils/colors";
import { Routes } from "@/utils/routes";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

const features = [
  {
    icon: "📍",
    title: "Geolocalizzazione Intelligente",
    desc: "Timbratura possibile solo quando sei fisicamente in sede, con controllo della distanza massima configurabile.",
  },
  {
    icon: "🔒",
    title: "Sicurezza Avanzata",
    desc: "Autenticazione sicura, dati protetti e accessibili solo agli amministratori autorizzati.",
  },
  {
    icon: "⚡",
    title: "Interfaccia Intuitiva",
    desc: "Design moderno e responsive, facile da usare per dipendenti e amministratori di ogni età.",
  },
  {
    icon: "📊",
    title: "Reportistica Completa",
    desc: "Calendario interattivo, visualizzazione timbrature, gestione utenti e monitoraggio presenze in tempo reale.",
  },
  {
    icon: "👥",
    title: "Gestione Multi-Utente",
    desc: "Gli admin possono gestire il team invitando utenti e controllando gli accessi così da monitorare le attività.",
  },
  {
    icon: "📱",
    title: "Mobile First",
    desc: "Ottimizzato per smartphone e tablet, funziona perfettamente su tutti i dispositivi moderni.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Registrazione Organizzazione",
    desc: "Contattaci e creiamo per te l'organizzazione, impostiamo la posizione geografica e i parametri di timbratura.",
    icon: "🏢",
  },
  {
    step: "2",
    title: "Aggiunta Utenti",
    desc: "Gli admin aggiungono i dipendenti tramite interfaccia.",
    icon: "➕",
  },
  {
    step: "3",
    title: "Timbratura Geografica",
    desc: "I dipendenti timbrano solo quando sono fisicamente in sede, con controllo automatico della posizione.",
    icon: "📍",
  },
  {
    step: "4",
    title: "Monitoraggio e Report",
    desc: "Visualizza calendario timbrature, gestisci utenti e scarica report dettagliati per la contabilità.",
    icon: "📈",
  },
];

const benefits = [
  {
    title: "Per le Scuole",
    items: [
      "Controllo presenze docenti e personale ATA",
      "Riduzione errori nella gestione orari",
      "Report automatici per la segreteria",
    ],
  },
  {
    title: "Per le PMI",
    items: [
      "Gestione orari dipendenti semplificata",
      "Controllo presenze in tempo reale",
      "Riduzione costi amministrativi",
    ],
  },
];

export default function Home() {
  const { userAuthId } = useAuthData();

  return (
    <>
      <Head>
        <title>TimbraQui - Timbratura Online per Scuole e PMI</title>
        <meta
          name="description"
          content="TimbraQui è il nuovo servizio di timbratura online pensato per scuole e PMI. Semplifica la gestione delle presenze con una soluzione digitale, sicura e facile da usare."
        />
      </Head>
      <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
        {/* HERO SECTION */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
            color: "white",
            padding: "4rem 1rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  width: 80,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Image
                  src="/logo-transparent.png"
                  alt="TimbraQui"
                  width={60}
                  height={60}
                />
              </div>
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1.1,
                  background: "linear-gradient(45deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {BUSINESS_NAME}
              </h1>
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  margin: 0,
                  opacity: 0.9,
                  maxWidth: "800px",
                }}
              >
                La timbratura intelligente che rivoluziona la gestione delle
                presenze
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  opacity: 0.8,
                  maxWidth: "600px",
                  margin: "1rem 0 2rem 0",
                }}
              >
                Geolocalizzazione, sicurezza garantita e interfaccia intuitiva.
                Perfetto per scuole, PMI e qualsiasi organizzazione che vuole
                modernizzare la gestione del personale.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <a
                  href={userAuthId ? Routes.dashboard : Routes.login}
                  style={{
                    background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
                    color: "white",
                    padding: "1.2rem 3rem",
                    borderRadius: "50px",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    textDecoration: "none",
                    boxShadow: "0 8px 32px rgba(59,130,246,0.3)",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(59,130,246,0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(59,130,246,0.3)";
                  }}
                >
                  {userAuthId ? "Vai alla Dashboard" : "Accedi o Registrati"}
                </a>
                <a
                  href="#come-funziona"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    padding: "1.2rem 3rem",
                    borderRadius: "50px",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    textDecoration: "none",
                    border: "2px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Scopri Come Funziona
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COME FUNZIONA SECTION */}
        <section
          id="come-funziona"
          style={{ padding: "5rem 1rem", background: "white" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#1e293b",
                  margin: "0 0 1rem 0",
                }}
              >
                Come Funziona TimbraQui
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#64748b",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                In soli 4 semplici passaggi, la tua organizzazione avrà un
                sistema di timbratura moderno e sicuro
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: "2rem",
              }}
            >
              {howItWorks.map((step, index) => (
                <div
                  key={step.step}
                  style={{
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    borderRadius: "20px",
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                    position: "relative",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
                      color: "white",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "1.2rem",
                    }}
                  >
                    {step.step}
                  </div>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    {step.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#1e293b",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section style={{ padding: "5rem 1rem", background: "#f8fafc" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#1e293b",
                  margin: "0 0 1rem 0",
                }}
              >
                Perché Scegliere TimbraQui
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#64748b",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Tecnologia all'avanguardia per una gestione delle presenze
                semplice, sicura ed efficiente
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "2rem",
              }}
            >
              {features.map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "2.5rem",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    border: "1px solid #f1f5f9",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(0,0,0,0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: "#1e293b",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section style={{ padding: "5rem 1rem", background: "white" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#1e293b",
                  margin: "0 0 1rem 0",
                }}
              >
                Ideale per Ogni Tipo di Organizzazione
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#64748b",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Soluzioni personalizzate per scuole e PMI che vogliono
                modernizzare la gestione del personale
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                gap: "3rem",
              }}
            >
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  style={{
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    borderRadius: "20px",
                    padding: "3rem",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "#1e293b",
                      margin: "0 0 2rem 0",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {benefit.items.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "1rem",
                          fontSize: "1.1rem",
                          color: "#475569",
                        }}
                      >
                        <div
                          style={{
                            background:
                              "linear-gradient(45deg, #10b981, #059669)",
                            color: "white",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "1rem",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          style={{
            padding: "5rem 1rem",
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            color: "white",
          }}
        >
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                margin: "0 0 1.5rem 0",
              }}
            >
              Pronto a Rivoluzionare la Gestione delle Presenze?
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                opacity: 0.9,
                margin: "0 0 2.5rem 0",
                lineHeight: "1.6",
              }}
            >
              Unisciti alle organizzazioni che hanno già scelto TimbraQui per
              una gestione moderna, sicura ed efficiente del personale. Inizia
              subito, è completamente gratuito.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href={userAuthId ? Routes.dashboard : Routes.login}
                style={{
                  background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
                  color: "white",
                  padding: "1.3rem 3.5rem",
                  borderRadius: "50px",
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(59,130,246,0.3)",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(59,130,246,0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(59,130,246,0.3)";
                }}
              >
                {userAuthId ? "Vai alla Dashboard" : "Inizia Ora"}
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "1.3rem 3.5rem",
                  borderRadius: "50px",
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  textDecoration: "none",
                  border: "2px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Contattaci
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            background: "#0f172a",
            color: "white",
            padding: "3rem 1rem 2rem 1rem",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src="/logo-transparent.png"
                  alt="TimbraQui"
                  width={50}
                  height={50}
                  style={{ marginBottom: "1rem" }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {BUSINESS_NAME}
              </h3>
              <p style={{ opacity: 0.8, margin: "0 0 2rem 0" }}>
                La timbratura intelligente per il futuro del lavoro
              </p>
            </div>
            <div
              style={{
                borderTop: "1px solid #334155",
                paddingTop: "2rem",
                opacity: 0.8,
              }}
            >
              <p style={{ margin: 0 }}>
                © 2024 {BUSINESS_NAME}. Tutti i diritti riservati. |
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  style={{
                    color: colors.primary,
                    textDecoration: "none",
                    marginLeft: "0.5rem",
                  }}
                >
                  {BUSINESS_EMAIL}
                </a>
              </p>
            </div>
            <Spacer size={8} />
            <Typography variant="p-m-r">
              <Typography
                variant="p-m-r"
                href={Routes.termsConditionsGDPR}
                color={colors.primary}
                component="a"
              >
                Termini e Condizioni
              </Typography>
              {" | "}
              <Typography
                variant="p-m-r"
                href={Routes.cookies}
                color={colors.primary}
                component="a"
              >
                Cookie Policy
              </Typography>
            </Typography>
          </div>
        </footer>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = (ctx) =>
  checkRouteAndRedirect(ctx);
