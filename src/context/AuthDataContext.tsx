import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthDataInterface {
  userAuthId: string | null;
  clerkToken: string | null;
  isLoaded: boolean;
  email: string | null;
}

const dataDefualt = {
  userAuthId: null,
  clerkToken: null,
  email: null,
};

export const AuthDataContext = createContext<AuthDataInterface>({
  ...dataDefualt,
  isLoaded: false,
});

export const AuthDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] =
    useState<Omit<AuthDataInterface, "isLoaded">>(dataDefualt);

  const getSetData = async () => {
    setData({
      clerkToken: token,
      userAuthId: auth.sessionId ? auth.userId : null,
      email: token ? jwtDecode<{ email: string }>(token).email : null,
    });
  };

  useEffect(() => {
    if (token) {
      getSetData();
    }
  }, [token]);

  useEffect(() => {
    if (auth.isLoaded) {
      const fetchToken = async () => {
        const newToken = await auth.getToken({ template: "supabase" });
        setToken(newToken);

        if (newToken === null) {
          getSetData();
        }
      };

      fetchToken();
      const intervalId = setInterval(fetchToken, 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [auth.getToken, auth.isLoaded]);

  useEffect(() => {
    const claimInvite = async () => {
      await axios.post("/api/claim-invite", {});
    };

    if (auth.isSignedIn && token) {
      claimInvite();
    }
  }, [auth.isSignedIn, token]);

  // handle reset state when client logout
  useEffect(() => {
    if (!data.userAuthId || !auth.isSignedIn) {
      setToken(null);
      setData(dataDefualt);
    }
  }, [data.userAuthId, auth.isSignedIn]);

  return (
    <AuthDataContext.Provider
      value={{
        ...data,
        isLoaded:
          auth.isLoaded && auth.sessionId
            ? Boolean(token) && Boolean(data.email)
            : auth.isLoaded,
      }}
    >
      {children}
    </AuthDataContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthDataContext);
