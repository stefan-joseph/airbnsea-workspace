import { ReactNode, useContext, useEffect } from "react";
import { AppContext } from "../context/context";
import { useMeQuery } from "@airbnb-clone/controller";

export const UserIdentifier = ({ children }: { children: ReactNode }) => {
  const { dispatch } = useContext(AppContext);
  const { data } = useMeQuery();

  useEffect(() => {
    if (!data?.me) return;

    dispatch({
      type: "SET_USER",
      payload: {
        authenticated: true,
        firstName: data.me.firstName,
        avatar: data.me.avatar,
      },
    });
  }, [data]);

  return <>{children}</>;
};
