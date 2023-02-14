import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { desktopMinWidth } from "../../../constants/constants";

export const NavigateToFirstConversation = ({
  children,
  conversationId,
  isLoading,
}: {
  children: JSX.Element[];
  conversationId: string;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const matches = useMediaQuery(desktopMinWidth);

  useEffect(() => {
    if (isLoading || !conversationId || !matches) return;
    navigate(`/inbox/${conversationId}${tab ? `?tab=${tab}` : ""}`);
  }, [matches, conversationId, isLoading]);
  return <>{children}</>;
};
