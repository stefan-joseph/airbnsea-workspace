import { useLocation } from "react-router-dom";

export const TextPage = () => {
  const {
    state: { message },
  } = useLocation();

  return <h2>{message}</h2>;
};
