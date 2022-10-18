import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import { ForgotPasswordConnector } from "../modules/auth/forgotPassword/ForgotPasswordConnector";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
import { LoginConnector } from "../modules/auth/login/LoginConnector";
import { RegisterConnector } from "../modules/auth/register/RegisterController";
import { ResetPasswordConnector } from "../modules/auth/resetPassword/ResetPasswordConnector";
import { TextPage } from "../modules/textPage/TextPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { FindListingsConnector } from "../modules/listing/find/findListingsConnector";
import { Logout } from "../modules/auth/logout/logout";
import { ViewListingConnector } from "../modules/listing/view/ViewListingConnector";
import { MessageConnector } from "../modules/message/MessageConnector";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterConnector />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginConnector />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordConnector />,
  },
  {
    path: "/reset-password/:key",
    element: <ResetPasswordConnector />,
  },
  {
    path: "/message/*",
    element: <TextPage />,
  },
  {
    path: "/create-listing",
    element: (
      <ProtectedRoute redirect="/login">
        <CreateListingConnector />
      </ProtectedRoute>
    ),
  },
  {
    path: "/listings",
    element: <FindListingsConnector />,
  },
  {
    path: "/listing/:listingId",
    element: <ViewListingConnector />,
  },
  {
    path: "/listing/:listingId/chat",
    element: <MessageConnector />,
  },
]);
