// pages/_app.tsx
import { Placeholder } from "@/components/Dumb/Placeholder";
import { ToastContainer } from "@/components/Dumb/ToastWrapper";
import { AuthDataProvider, useAuthData } from "@/context/AuthDataContext";
import { ToastProvider } from "@/context/ToastContext";
import { UserInfoProvider } from "@/context/UserInfoContext";
import { BUSINESS_NAME } from "@/utils/businessInfo";
import { colors } from "@/utils/colors";
import "@/utils/global.css";
import { FONT } from "@/utils/text";
import { itIT } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

const clerkAppearance = {
  elements: {
    card: "shadow-lg p-6 rounded-lg",
    formButtonPrimary: {
      backgroundColor: colors.primary,
      color: "white",
      "&:hover": {
        backgroundColor: colors.darkerHue,
        color: colors.primary,
      },
    },
  },
} as const;

const fetcher = (url?: string, init?: RequestInit) =>
  url
    ? fetch(url, init).then((r) => {
        return r.json();
      })
    : null;

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>{BUSINESS_NAME}</title>
      </Head>

      <ClerkProvider localization={itIT} appearance={clerkAppearance}>
        <AuthDataProvider>
          <Providers>
            <Component {...pageProps} />
          </Providers>
        </AuthDataProvider>
      </ClerkProvider>
    </>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const { userAuthId, email, isLoaded } = useAuthData();

  if (!isLoaded) {
    return <Placeholder width="100%" height="100vh" />;
  }

  return (
    <ToastProvider>
      <SWRConfig
        value={{
          fetcher,
          shouldRetryOnError: false,
          revalidateOnFocus: false,
        }}
      >
        <div
          className={`${FONT.className} font-[family-name:var(--font-family-1)]`}
        >
          <UserInfoProvider userAuthId={userAuthId || ""} email={email}>
            {children}
          </UserInfoProvider>
          <ToastContainer />
        </div>
      </SWRConfig>
    </ToastProvider>
  );
}
