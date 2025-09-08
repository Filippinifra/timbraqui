import { useToast } from "@/context/ToastContext";
import { useUserInfo } from "@/context/UserInfoContext";
import { useAxios } from "@/hooks/useAxios";
import { usePosition } from "@/hooks/usePosition";
import { Organization } from "@/types/Organization";
import { Registration, RegistrationApi } from "@/types/Registration";
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
      const registrationToRegister: RegistrationApi & {
        userLat?: number;
        userLng?: number;
      } = {
        created_at: dayjs().toISOString(),
        date: dayjs().toISOString(),
        id: v4(),
        user_id: id,
        userLat: pos?.lat,
        userLng: pos?.lng,
      };

      await axios<RegistrationApi>(
        "/api/registrations",
        "POST",
        registrationToRegister
      );

      showToast("success", "Timbratura registrata");
      onRegister(registrationToRegister);
    } catch (error: any) {
      if (error.response?.data?.error) {
        showToast("error", error.response.data.error);
      } else {
        showToast("error");
      }
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

    const minutesForNewRegistration = 30;

    const isLatestRegBefore1Min =
      latestRegistation &&
      dayjs().diff(dayjs(latestRegistation.date), "minutes") <
        minutesForNewRegistration;

    if (isLatestRegBefore1Min) {
      showToast(
        "error",
        `Ultima timbratura meno di ${minutesForNewRegistration} minuti fa, devi aspettare almeno ${minutesForNewRegistration} minuti prima di timbrare di nuovo.`
      );
    } else if (!pos) {
      showToast("error", "Posizione non attiva, cambia browser e riprova.");
    } else {
      await confirmRegistration();
    }

    setLoading(false);
  };

  return { register, loading };
};
