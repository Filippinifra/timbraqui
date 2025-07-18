import { useAuthData } from "@/context/AuthDataContext";
import { toUser, toUserApi } from "@/mappers/toUser";
import { User, UserApi } from "@/types/User";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import useSWR from "swr";

const defaultUser: User = {
  createdAt: "",
  email: "",
  id: "",
  name: "",
  orgId: "",
  surname: "",
};

export const UserInfoContext = createContext<{
  user: User;
  loading: boolean;
  updateUser: (u?: User) => void;
}>({
  user: defaultUser,
  loading: false,
  updateUser: () => {},
});

export const UserInfoProvider: FC<{
  children: ReactNode;
  userAuthId: string | null;
  email: string | null;
}> = ({ children, userAuthId, email }) => {
  const { clerkToken } = useAuthData();

  // use state to prevent rerendering
  const [emailStringed, setEmailStorage] = useState(email || "");

  // !user.id is used because clerkToken has a refresh function in use auth context
  const { isLoading, data, mutate } = useSWR<UserApi[]>(
    email && userAuthId && clerkToken && emailStringed
      ? `/api/users?email=${encodeURIComponent(emailStringed)}`
      : null
  );
  const user = data?.[0];

  return (
    <UserInfoContext.Provider
      value={{
        user: user
          ? toUser({ ...user, email: emailStringed })
          : { ...defaultUser, email: emailStringed },
        loading: isLoading,
        updateUser: (u?: User) => {
          if (u?.email) {
            setEmailStorage(u.email);
          }

          return u ? mutate([toUserApi(u)]) : mutate();
        },
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
