import { getAuth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  onlyAuthRoutes,
  onlyNotAuthRoutes,
  Routes,
  StaticRoutes,
} from "../utils/routes";

export const checkRouteReturnUser = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  console.log("entro");
  const { req } = context;
  const { getToken } = getAuth(req);
  const currentPath = context.resolvedUrl as StaticRoutes;

  const token = await getToken({ template: "supabase" });
  const email = token ? jwtDecode<{ email: string }>(token).email : null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  const isOnlyAuthRoutes = onlyAuthRoutes.includes(currentPath);
  const isOnlyNotAuthRoute = onlyNotAuthRoutes.includes(currentPath);

  console.log(!token, isOnlyAuthRoutes);

  if (user && isOnlyNotAuthRoute) {
    return { redirect: { destination: Routes.dashboard, permanent: false } };
  }

  if (!token && isOnlyAuthRoutes) {
    return { redirect: { destination: Routes.login, permanent: false } };
  }

  return {
    props: {
      user,
    },
  };
};
