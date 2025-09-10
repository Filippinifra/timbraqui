import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";

export interface AuthData {
  userAuthId: string | null;
  clerkToken: string | null;
  email: string | null;
  isLoaded: boolean;
}

const DEFAULT: AuthData = {
  userAuthId: null,
  clerkToken: null,
  email: null,
  isLoaded: false,
};

const AuthDataContext = createContext<AuthData>(DEFAULT);

type Jwt = { exp?: number };

function scheduleRefresh(token: string, refresh: () => void) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as Jwt;
    const expMs = (payload.exp ?? 0) * 1000;

    const delay = Math.max(0, expMs - Date.now() - 30_000);
    const id = window.setTimeout(refresh, delay);
    return () => window.clearTimeout(id);
  } catch {
    return () => {};
  }
}

export const AuthDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn, userId, getToken, sessionId } = useAuth();
  const { user } = useUser();

  const [clerkToken, setClerkToken] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);
  const cleanupRefreshRef = useRef<() => void>(() => {});
  const claimingRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !sessionId) {
      setClaimed(false);
      return;
    }

    const key = `claimed:${sessionId}`;
    if (sessionStorage.getItem(key) === "1") {
      setClaimed(true);
      return;
    }

    if (claimingRef.current) return;
    claimingRef.current = true;

    (async () => {
      try {
        await axios.post("/api/claim-invite", {});
        sessionStorage.setItem(key, "1");
        setClaimed(true);
      } catch (e) {
        sessionStorage.setItem(key, "1");
        setClaimed(true);
      } finally {
        claimingRef.current = false;
      }
    })();
  }, [isLoaded, isSignedIn, sessionId]);

  const fetchToken = async () => {
    try {
      const t = await getToken({ template: "supabase" });
      setClerkToken(t ?? null);

      cleanupRefreshRef.current?.();
      if (t) cleanupRefreshRef.current = scheduleRefresh(t, fetchToken);
    } catch {
      setClerkToken(null);
    }
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setClerkToken(null);
      cleanupRefreshRef.current?.();
      return;
    }
    if (!claimed) return;
    fetchToken();
  }, [isLoaded, isSignedIn, claimed, sessionId]);

  useEffect(() => {
    if (!isSignedIn || !claimed) return;

    const onFocus = () => fetchToken();
    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchToken();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isSignedIn, claimed]);

  const value: AuthData = {
    userAuthId: userId ?? null,
    clerkToken,
    email: user?.primaryEmailAddress?.emailAddress ?? null,
    isLoaded: isLoaded && (!isSignedIn || (claimed && Boolean(clerkToken))),
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
};

export const useAuthData = () => useContext(AuthDataContext);
