import { AlertBox } from "@/components/Dumb/AlertBox";
import { Badge } from "@/components/Dumb/Badge";
import { Button } from "@/components/Dumb/Button";
import { Spacer } from "@/components/Dumb/Spacer";
import { Typography } from "@/components/Dumb/Typography";
import { useUserInfo } from "@/context/UserInfoContext";
import { useUserRegistrations } from "@/hooks/api/useRegistrations";
import { usePosition } from "@/hooks/usePosition";
import { useRegistration } from "@/hooks/useRegistration";
import { Organization } from "@/types/Organization";
import dayjs from "dayjs";
import { FC } from "react";

export const UserPanel: FC<{ organization: Organization }> = ({
  organization,
}) => {
  const { user } = useUserInfo();
  const position = usePosition();
  const { refreshRegistrations, registrations } = useUserRegistrations(user.id);
  const { register, loading } = useRegistration((r) => {
    refreshRegistrations(r, "add");
  }, organization);

  return (
    <div>
      <Typography variant="p-m-r">Timbratura</Typography>
      <Spacer size={8} />
      {position === null && (
        <AlertBox variant="warning">
          Abilita la geolocalizzazione per timbrare.
        </AlertBox>
      )}
      {position && (
        <Button
          size="l"
          onClick={() => register(registrations || [])}
          disabled={loading}
        >
          TIMBRA ORA
        </Button>
      )}
      <Spacer size={32} />
      <Typography variant="p-m-r">Ultime timbrature</Typography>
      <Spacer size={8} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {registrations?.reverse().map(({ date, id }) => (
          <Badge key={id}>{dayjs(date).format("DD/MM/YYYY HH:mm")}</Badge>
        ))}
      </div>
      {registrations?.length === 0 && (
        <Typography variant="p-s-r" color="lightgray">
          Nessuna timbratura
        </Typography>
      )}
    </div>
  );
};
