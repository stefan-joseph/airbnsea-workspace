import { useContext } from "react";
import { AppContext } from "../context/context";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeLazyQuery } from "@airbnb-clone/controller";

export default function useSetUserAndRedirect() {
  const { dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const { state } = useLocation();

  const [meLazyQuery] = useMeLazyQuery();

  const setUserAndRedirect = async () => {
    const { data } = await meLazyQuery();

    if (data?.me) {
      const { firstName, avatar } = data.me;
      dispatch({
        type: "SET_USER",
        payload: { authenticated: true, firstName, avatar },
      });
    }

    if (state?.redirect) {
      navigate(state.redirect);
    } else navigate("/");
  };

  return setUserAndRedirect;
}
