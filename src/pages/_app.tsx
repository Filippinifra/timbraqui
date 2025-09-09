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

const App = (props: AppProps) => {
  return (
    <>
      <Head>
        <title>{`${BUSINESS_NAME}`}</title>
      </Head>
      <ClerkProvider
        {...props}
        localization={itIT}
        appearance={{
          elements: {
            rootBox: {
              width: "auto",
            },
            cardBox: {
              boxShadow: "unset",
              border: "none",
              borderRadius: 0,
              width: "auto",
              padding: 1,
            },
            card: {
              backgroundColor: "transparent",
              boxSizing: "border-box",
              boxShadow: "unset",
              padding: 0,
              width: "auto",
            },
            footer: { display: "none" },
            header: { display: "none" },
            formButtonPrimary: {
              backgroundColor: colors.primary,
              color: "white",
              "&:hover": {
                backgroundColor: colors.black,
                color: colors.primary,
              },
              "&:after": {
                border: "none",
                outline: "none",
              },
              "&:before": {
                border: "none",
                outline: "none",
              },
            },
          },
        }}
      >
        <AuthDataProvider>
          <Providers {...props} />
        </AuthDataProvider>
      </ClerkProvider>
    </>
  );
};

export default App;

const Providers = ({ Component, pageProps }: AppProps) => {
  const { userAuthId, email, isLoaded } = useAuthData();

  return isLoaded ? (
    <ToastProvider>
      <SWRConfig
        value={{
          fetcher: (url: string | null, config: RequestInit | null) => {
            if (url) {
              return fetch(url, {
                headers: config?.headers,
                ...config,
              }).then((res) => res.json());
            }
          },
          shouldRetryOnError: false,
          revalidateOnFocus: false,
        }}
      >
        <div
          className={`${FONT.className} font-[family-name:var(--font-family-1)]`}
        >
          <UserInfoProvider userAuthId={userAuthId || ""} email={email}>
            {/* <NextNProgress
            color={colors.primaryLight}
            height={5}
            options={{ showSpinner: false }}
          /> */}
            <Component {...pageProps} />
          </UserInfoProvider>
          <ToastContainer />
        </div>
      </SWRConfig>
    </ToastProvider>
  ) : (
    <Placeholder width="100%" height="100vh" />
  );
};
