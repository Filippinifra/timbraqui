import { useToast } from "@/context/ToastContext";
import { useUserInfo } from "@/context/UserInfoContext";
import { useAxios } from "@/hooks/useAxios";
import { usePosition } from "@/hooks/usePosition";
import { Organization } from "@/types/Organization";
import { Registration, RegistrationApi } from "@/types/Registration";
import { calculateDistance } from "@/utils/geolocation";
import dayjs from "dayjs";
import { useState } from "react";
import { v4 } from "uuid";

export const useRegistration = (
  onRegister: (r: RegistrationApi) => void,
  organization: Organization
) => {
  const [loading, setLoading] = useState(false);

  const {
    user: { id },
  } = useUserInfo();
  const axios = useAxios();
  const pos = usePosition();
  const { showToast } = useToast();

  const confirmRegistration = async () => {
    try {
      const registrationToRegister: RegistrationApi = {
        created_at: dayjs().toISOString(),
        date: dayjs().toISOString(),
        id: v4(),
        user_id: id,
      };

      await axios<RegistrationApi>(
        "/api/registrations",
        "POST",
        registrationToRegister
      );

      showToast("success", "Timbratura registrata");
      onRegister(registrationToRegister);
    } catch {
      showToast("error");
    }
  };

  const register = async (registrations: Registration[]) => {
    setLoading(true);

    const latestRegistation = registrations?.reduce((r, registration) => {
      if (!r) {
        return registration;
      } else {
        if (dayjs(registration.date).isBefore(dayjs(r.date))) {
          return r;
        } else {
          return registration;
        }
      }
    }, undefined as undefined | Registration);

    const isLatestRegBefore1Min =
      latestRegistation &&
      dayjs().diff(dayjs(latestRegistation.date), "minutes") < 1;

    if (isLatestRegBefore1Min) {
      showToast(
        "error",
        "Ultima timbratura meno di 1 minuto fa, devi aspettare almeno 1 minuto prima di timbrare di nuovo."
      );
    } else if (!pos) {
      showToast("error", "Posizione non attiva, cambia browser e riprova.");
    } else if (organization.place) {
      const distance = calculateDistance(
        organization.place.lat,
        organization.place.lng,
        pos.lat,
        pos.lng
      );

      const isNear = distance <= 100;

      if (isNear) {
        await confirmRegistration();
      } else {
        showToast("error", "Sei lontano dalla posizione di timbratura");
      }
    } else {
      showToast(
        "error",
        "Nessuna posizione di timbratura registrata per la tua organizzazione."
      );
    }

    setLoading(false);
  };

  return { register, loading };
};
