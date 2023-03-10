import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import { ForgotPasswordConnector } from "../modules/auth/forgotPassword/ForgotPasswordConnector";
import { LoginConnector } from "../modules/auth/login/LoginConnector";
import { RegisterConnector } from "../modules/auth/register/RegisterController";
import { ResetPasswordConnector } from "../modules/auth/resetPassword/ResetPasswordConnector";
import { TextPage } from "../modules/textPage/TextPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Logout } from "../modules/auth/logout/logout";
import { Listing } from "../modules/listing/Listing";
import { CreateListing } from "../modules/user/create-listing/CreateListing";
import { Search } from "../modules/search/Search";
import { Message } from "../modules/message/Message";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterConnector />,
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
    path: "/listing/:listingId/view",
    element: <Listing />,
  },
  {
    path: "/message/*",
    element: <TextPage />,
  },
  {
    path: "/create-listing",
    element: (
      <ProtectedRoute redirect="/login">
        <CreateListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-listing/:listingId/:step",
    element: (
      <ProtectedRoute redirect="/login">
        <CreateListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inbox/",
    element: (
      <ProtectedRoute redirect="/login">
        <Message />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inbox/:conversationId",
    element: (
      <ProtectedRoute redirect="/login">
        <Message />
      </ProtectedRoute>
    ),
  },
]);
