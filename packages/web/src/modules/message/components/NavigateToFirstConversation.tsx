import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import { desktopMinWidth } from "../../../constants/constants";
import { spreadParamsToURL } from "../../../utils/spreadParamsToURL";

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

  const matches = useMediaQuery(desktopMinWidth);

  useEffect(() => {
    if (isLoading || !conversationId || !matches) return;
    navigate(`/inbox/${conversationId}${spreadParamsToURL(searchParams)}`);
  }, [matches, conversationId, isLoading]);
  return <>{children}</>;
};
