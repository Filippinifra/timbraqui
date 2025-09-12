import { checkRouteAndRedirect } from "@/auth/checkRouteAndRedirect";
import { Spacer } from "@/components/Dumb/Spacer";
import { Footer } from "@/components/Layout/Footer";
import { useAuthData } from "@/context/AuthDataContext";
import { BUSINESS_NAME } from "@/utils/businessInfo";
import { Routes } from "@/utils/routes";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

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
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Image
                src="/logo-transparent.png"
                alt="TimbraQui"
                width={64}
                height={64}
              />
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
        <Spacer size={32} />
        <Footer /> <Spacer size={32} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = (ctx) =>
  checkRouteAndRedirect(ctx);
