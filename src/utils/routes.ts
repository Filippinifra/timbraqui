export type StaticRoutes = {
  [K in keyof typeof Routes]: (typeof Routes)[K] extends string
    ? (typeof Routes)[K]
    : never;
}[keyof typeof Routes];

export const Routes = {
  home: "/",

  login: "/login",
  register: "/register",

  dashboard: "/dashboard",

  termsConditionsGDPR: "/terms-conditions-gdpr",
  cookies: "/cookies",
} as const;

export const onlyAuthRoutes: StaticRoutes[] = [Routes.dashboard];

export const onlyNotAuthRoutes: StaticRoutes[] = [
  Routes.login,
  Routes.register,
];
