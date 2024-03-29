import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Listing } from "../modules/listing/Listing";
import { CreateListing } from "../modules/user/create-listing/CreateListing";
import { Search } from "../modules/search/Search";
import { Message } from "../modules/message/Message";
import { BookingConfirmationPage } from "../modules/booking/components/ComfirmationPage";
import Auth from "../modules/auth/Auth";
import OauthCallback from "../modules/auth/components/OauthCallback";
import EmailConfirmed from "../modules/auth/components/EmailConfirmed";
import ConfirmEmailPath from "../modules/auth/components/ConfirmEmailPath";
import ForgotPasswordForm from "../modules/auth/components/ForgotPasswordForm";
import ResetPasswordForm from "../modules/auth/components/ResetPasswordForm";
import Logout from "../modules/auth/components/Logout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/confirm-email/:key",
    element: <ConfirmEmailPath />,
  },
  {
    path: "/email-confirmed",
    element: <EmailConfirmed />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/reset-password/:key",
    element: <ResetPasswordForm />,
  },
  {
    path: "auth/:authServer",
    element: <OauthCallback />,
  },
  {
    path: "/listing/:listingId/view",
    element: <Listing />,
  },
  {
    path: "/book/:listingId",
    element: (
      <ProtectedRoute redirect="/login">
        <BookingConfirmationPage />
      </ProtectedRoute>
    ),
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
