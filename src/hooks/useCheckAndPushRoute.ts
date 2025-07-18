import { StaticRoutes } from "@/utils/routes";
import { useRouter } from "next/router";

export const useCheckAndPushRoute = () => {
  const { route, push } = useRouter();

  const checkAndPushRoute = (r: StaticRoutes) => {
    if (route !== r) {
      push(r);
    }
  };

  return { checkAndPushRoute };
};
