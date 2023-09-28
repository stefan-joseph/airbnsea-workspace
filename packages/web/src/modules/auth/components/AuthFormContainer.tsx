import { Button, Divider, Stack, Typography } from "@mui/material";
import { Form } from "formik";

import OauthLink from "../components/OauthLink";
import TransitionAlerts from "../components/TransitionAlerts";
import { useLocation } from "react-router-dom";
import AuthLink from "./AuthLink";

export default function AuthFormContainer({
  children,
  title,
  subtitle,
  type,
  buttonLabel,
  authLink1,
  authLink2,
}: {
  children: JSX.Element | JSX.Element[];
  title: string;
  subtitle?: string;
  type?: string;
  buttonLabel: string;
  authLink1: any;
  authLink2?: any;
}) {
  const { state } = useLocation();
  return (
    <Form>
      <Stack
        sx={{
          maxWidth: "24rem",
        }}
        spacing={3}
      >
        <Typography component="h2" variant="h4" gutterBottom>
          {title}
        </Typography>
        {subtitle && <Typography sx={{ opacity: 0.7 }}>{subtitle}</Typography>}
        {state?.message && (
          <TransitionAlerts severity="error" text={state.message} />
        )}
        {(type === "sign up" || type === "log in") && (
          <>
            <OauthLink
              name={`${
                type.charAt(0).toUpperCase() + type.slice(1)
              } with Github`}
              href="https://github.com/login/oauth/authorize"
            />
            <Divider
              sx={{
                fontSize: 14,
                span: {
                  opacity: 0.4,
                },
              }}
            >
              or
            </Divider>
          </>
        )}
        {children}
        <Stack
          alignItems="flex-start"
          justifyContent="space-between"
          flexDirection="row"
        >
          {[authLink1, authLink2].map((link) => {
            if (!link) return;
            const { href, text } = link;
            return <AuthLink href={href} text={text} />;
          })}
        </Stack>
        <Button variant="contained" type="submit" color="primary">
          {buttonLabel}
        </Button>
      </Stack>
    </Form>
  );
}
