import { AlertBox } from "@/components/Dumb/AlertBox";
import { Button } from "@/components/Dumb/Button";
import { InfoCard } from "@/components/Dumb/InfoCard";
import { Typography } from "@/components/Dumb/Typography";
import { useUserInfo } from "@/context/UserInfoContext";
import { useUserRegistrations } from "@/hooks/api/useRegistrations";
import { usePosition } from "@/hooks/usePosition";
import { useRegistration } from "@/hooks/useRegistration";
import "dayjs/locale/it";
import { Calendar } from "./Calendar";
import {
  calendarCard,
  calendarHeader,
  statisticsGrid,
  timbraturaCard,
  timbraturaHeader,
  timbraturaIcon,
} from "./styles.css";

export const UserPanel = () => {
  const { user } = useUserInfo();
  const position = usePosition();
  const { refreshRegistrations, registrations } = useUserRegistrations(user.id);
  const { register, loading } = useRegistration((r) => {
    refreshRegistrations(r, "add");
  });

  const todayRegistrations =
    registrations?.filter((r) => {
      const today = new Date().toDateString();
      const regDate = new Date(r.date).toDateString();
      return today === regDate;
    }) || [];

  const hasCheckedInToday = todayRegistrations.length > 0;
  const isCurrentlyIn = todayRegistrations.length % 2 === 1;
  const hasCompletedToday =
    todayRegistrations.length > 0 && todayRegistrations.length % 2 === 0;

  return (
    <div>
      <div className={timbraturaCard}>
        <div className={timbraturaHeader}>
          <div
            className={timbraturaIcon}
            style={{
              background: !hasCheckedInToday
                ? "linear-gradient(45deg, #3b82f6, #1d4ed8)"
                : isCurrentlyIn
                ? "linear-gradient(45deg, #f59e0b, #d97706)"
                : "linear-gradient(45deg, #3b82f6, #1d4ed8)",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>
              {!hasCheckedInToday ? "🕒" : isCurrentlyIn ? "⏰" : "🔄"}
            </span>
          </div>
          <div>
            <Typography variant="h3" style={{ color: "#1e293b", margin: 0 }}>
              Timbratura
            </Typography>
            <Typography variant="p-s-r" color="#64748b" style={{ margin: 0 }}>
              {!hasCheckedInToday
                ? "Timbra il tuo ingresso"
                : isCurrentlyIn
                ? "Sei in ufficio - timbra l'uscita"
                : "Timbra la prossima entrata"}
            </Typography>
          </div>
        </div>

        {position === null && (
          <div style={{ marginBottom: "1.5rem" }}>
            <AlertBox variant="warning">
              📍 Abilita la geolocalizzazione per timbrare
            </AlertBox>
          </div>
        )}

        {position && (
          <div style={{ textAlign: "center" }}>
            <Button
              size="xl"
              variant={
                !hasCheckedInToday
                  ? "primary"
                  : isCurrentlyIn
                  ? "warning"
                  : "primary"
              }
              special="rounded"
              onClick={() => register(registrations || [])}
              disabled={loading}
            >
              {loading
                ? "⏳ Timbrando..."
                : !hasCheckedInToday
                ? "🚪 TIMBRA INGRESSO"
                : isCurrentlyIn
                ? "🚪 TIMBRA USCITA"
                : "🚪 TIMBRA INGRESSO"}
            </Button>
            {hasCheckedInToday && (
              <div style={{ marginTop: "1rem" }}>
                <Typography variant="p-s-r" color="#64748b">
                  Ultima timbratura:{" "}
                  {new Date(
                    todayRegistrations[todayRegistrations.length - 1]?.date
                  ).toLocaleTimeString()}
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>

      {/* STATISTICHE RAPIDE */}
      <div className={statisticsGrid}>
        <InfoCard
          icon="📅"
          title={`${registrations?.length || 0}`}
          description="Timbrature Totali"
          variant="centered"
          iconSize="small"
          iconGradient="linear-gradient(45deg, #10b981, #059669)"
        />

        <InfoCard
          icon="📊"
          title={`${Math.floor((registrations?.length || 0) / 2)}`}
          description="Giorni Lavorati"
          variant="centered"
          iconSize="small"
          iconGradient="linear-gradient(45deg, #3b82f6, #1d4ed8)"
        />

        <InfoCard
          icon="⏰"
          title={`${todayRegistrations.length}`}
          description="Timbrature Oggi"
          variant="centered"
          iconSize="small"
          iconGradient="linear-gradient(45deg, #f59e0b, #d97706)"
        />
      </div>

      {/* CALENDARIO TIMBRATURE */}
      <div className={calendarCard}>
        <div className={calendarHeader}>
          <div
            style={{
              background: "linear-gradient(45deg, #8b5cf6, #7c3aed)",
              borderRadius: "12px",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>📅</span>
          </div>
          <div>
            <Typography variant="h3" style={{ color: "#1e293b", margin: 0 }}>
              Le Mie Timbrature
            </Typography>
            <Typography variant="p-s-r" color="#64748b" style={{ margin: 0 }}>
              Visualizza il calendario delle tue presenze
            </Typography>
          </div>
        </div>
        <Calendar registrations={registrations} />
      </div>
    </div>
  );
};
