import { AlertBox } from "@/components/Dumb/AlertBox";
import { Button } from "@/components/Dumb/Button";
import { Spacer } from "@/components/Dumb/Spacer";
import { Typography } from "@/components/Dumb/Typography";
import { useUserInfo } from "@/context/UserInfoContext";
import { useUserRegistrations } from "@/hooks/api/useRegistrations";
import { usePosition } from "@/hooks/usePosition";
import { useRegistration } from "@/hooks/useRegistration";
import { Organization } from "@/types/Organization";
import "dayjs/locale/it";
import { FC } from "react";
import { Calendar } from "./Calendar";

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
      <Typography variant="h3">Timbratura</Typography>
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
      <Typography variant="h3">Le mie timbrature</Typography>
      <Spacer size={8} />
      <Calendar registrations={registrations} />
    </div>
  );
};
