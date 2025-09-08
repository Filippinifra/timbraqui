import { checkRouteReturnUser } from "@/auth/checkRouteReturnUserTranslations";
import { useAuthData } from "@/context/AuthDataContext";
import { BUSINESS_EMAIL, BUSINESS_NAME } from "@/utils/businessInfo";
import { Routes } from "@/utils/routes";
import { GetServerSideProps } from "next";
import Head from "next/head";

const features = [
  {
    icon: "🕒",
    title: "Timbratura Smart",
    desc: "Timbratura in tempo reale solo se sei in sede.",
  },
  {
    icon: "🔒",
    title: "Sicurezza Garantita",
    desc: "I tuoi dati sono protetti e accessibili solo a chi vuoi tu.",
  },
  {
    icon: "⚡",
    title: "Facile e Veloce",
    desc: "Interfaccia intuitiva, pronta all'uso per scuole e PMI.",
  },
  {
    icon: "📊",
    title: "Reportistica",
    desc: "Scarica report e monitora le presenze in un click.",
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
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ef 100%)",
          padding: "0",
        }}
      >
        {/* HERO SECTION */}
        <section
          style={{
            width: "100%",
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem 1.5rem 2rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                background: "#2563eb10",
                borderRadius: "50%",
                width: 120,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="16"
                  width="48"
                  height="36"
                  rx="8"
                  fill="#2563eb"
                />
                <rect
                  x="16"
                  y="8"
                  width="32"
                  height="12"
                  rx="6"
                  fill="#60a5fa"
                />
                <rect x="24" y="32" width="16" height="8" rx="4" fill="#fff" />
                <circle cx="32" cy="40" r="3" fill="#2563eb" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "2.8rem",
                fontWeight: 800,
                color: "#1e293b",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {BUSINESS_NAME}
            </h1>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "#334155",
                margin: 0,
              }}
            >
              La timbratura online semplice, sicura e smart per scuole e PMI
            </h2>
            <p
              style={{
                maxWidth: 540,
                color: "#475569",
                fontSize: "1.15rem",
                margin: "1.5rem 0 0.5rem 0",
              }}
            >
              Dimentica i vecchi cartellini! Con TimbraQui gestisci le presenze
              in modo digitale, ovunque e in qualsiasi momento.
            </p>
            <a
              href={userAuthId ? Routes.dashboard : Routes.login}
              style={{
                background: "linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)",
                color: "#fff",
                padding: "1.1rem 2.8rem",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "1.2rem",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(37,99,235,0.13)",
                marginTop: 24,
                transition: "background 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #1d4ed8 60%, #3b82f6 100%)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)")
              }
            >
              Entra ora
            </a>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section
          style={{
            width: "100%",
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            padding: "2rem 1.5rem 1rem 1.5rem",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 16px rgba(30,41,59,0.07)",
                padding: "2rem 1.5rem 1.5rem 1.5rem",
                minWidth: 300,
                maxWidth: 300,
                flex: "1 1 220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-6px) scale(1.03)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
            >
              <div style={{ fontSize: 38, marginBottom: 12 }}>{f.icon}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "#2563eb",
                  marginBottom: 6,
                }}
              >
                {f.title}
              </div>
              <div style={{ color: "#475569", fontSize: "1rem" }}>{f.desc}</div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer
          style={{
            width: "100%",
            marginTop: "3rem",
            padding: "2rem 0 1rem 0",
            textAlign: "center",
            color: "#64748b",
            fontSize: "1rem",
          }}
        >
          <div style={{ marginBottom: 8 }}>
            Hai domande?{" "}
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              style={{ color: "#2563eb", textDecoration: "underline" }}
            >
              Contattaci
            </a>
          </div>
          <div>
            © {new Date().getFullYear()} {BUSINESS_NAME}. Tutti i diritti
            riservati.
          </div>
        </footer>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = (ctx) =>
  checkRouteReturnUser(ctx);
