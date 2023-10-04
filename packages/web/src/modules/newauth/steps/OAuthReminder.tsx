import { Avatar, Button, Icon, Stack, Typography } from "@mui/material";
import { IoMailOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AuthorizationServer } from "@airbnb-clone/controller";

import OauthLink from "../components/OauthLink";
import AuthFormContainer from "../components/AuthFormContainer";
import { Steps, User } from "../Auth";

export default function OAuthReminder({
  user,
  setAuthStep,
}: {
  user: User;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const { email, firstName, avatar, authorizationServer } = user;

  const AuthServerConfigs: Record<AuthorizationServer, JSX.Element> = {
    [AuthorizationServer.Linkedin]: (
      <OauthLink
        href="https://google.com"
        text="Continue with LinkedIn"
        Icon={<FcGoogle />}
        handleClick={() => {}}
      />
    ),
    [AuthorizationServer.Github]: (
      <OauthLink
        href="https://github.com/login/oauth/authorize"
        text="Continue with Github"
        Icon={<FaGithub />}
        handleClick={() => {}}
      />
    ),
  };
  return (
    <AuthFormContainer
      header={`Welcome back, ${firstName}`}
      setAuthStep={setAuthStep}
    >
      <Stack alignItems="center" width="100%" mt={2}>
        <Avatar
          src={avatar}
          alt={firstName}
          sx={{ width: 120, height: 120, fontSize: 40 }}
        />
        <Stack flexDirection="row" mt={2} mb={4}>
          <Icon>
            <IoMailOutline size={16} />
          </Icon>
          <Typography fontWeight={100} ml={0.2}>
            {email}
          </Typography>
        </Stack>
        {AuthServerConfigs[authorizationServer]}
        <Typography alignSelf="flex-start" mt={1}>
          Not you?{" "}
          <Button onClick={() => setAuthStep(Steps.DEFAULT)}>
            Use another account
          </Button>
        </Typography>
      </Stack>
    </AuthFormContainer>
  );
}
