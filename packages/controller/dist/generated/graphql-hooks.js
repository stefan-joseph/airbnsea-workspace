"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopulateConversationQuery = exports.PopulateConversationDocument = exports.usePopulateInboxLazyQuery = exports.usePopulateInboxQuery = exports.PopulateInboxDocument = exports.useCreateConversationMutation = exports.CreateConversationDocument = exports.useCreateMessageMutation = exports.CreateMessageDocument = exports.useViewListingLazyQuery = exports.useViewListingQuery = exports.ViewListingDocument = exports.useUpdateListingMutation = exports.UpdateListingDocument = exports.useSearchListingsLazyQuery = exports.useSearchListingsQuery = exports.SearchListingsDocument = exports.useCreateListingMutation = exports.CreateListingDocument = exports.useGetListingUnavailabilityLazyQuery = exports.useGetListingUnavailabilityQuery = exports.GetListingUnavailabilityDocument = exports.useCreateBookingMutation = exports.CreateBookingDocument = exports.useLoginAsRandomUserMutation = exports.LoginAsRandomUserDocument = exports.useResetPasswordMutation = exports.ResetPasswordDocument = exports.useRegisterUserMutation = exports.RegisterUserDocument = exports.useAuthenticateUserWithOauthMutation = exports.AuthenticateUserWithOauthDocument = exports.useMeLazyQuery = exports.useMeQuery = exports.MeDocument = exports.useLogoutUserMutation = exports.LogoutUserDocument = exports.useLoginUserMutation = exports.LoginUserDocument = exports.useSendForgotPasswordEmailMutation = exports.SendForgotPasswordEmailDocument = exports.useConfirmEmailMutation = exports.ConfirmEmailDocument = exports.useCheckEmailLazyQuery = exports.useCheckEmailQuery = exports.CheckEmailDocument = exports.VesselType = exports.Status = exports.InboxType = exports.AuthorizationServer = void 0;
exports.useUpdateInboxSubscriptionSubscription = exports.UpdateInboxSubscriptionDocument = exports.useNewMessageSubscriptionSubscription = exports.NewMessageSubscriptionDocument = exports.usePopulateConversationLazyQuery = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
var AuthorizationServer;
(function (AuthorizationServer) {
    AuthorizationServer["Github"] = "GITHUB";
    AuthorizationServer["Google"] = "GOOGLE";
})(AuthorizationServer = exports.AuthorizationServer || (exports.AuthorizationServer = {}));
var InboxType;
(function (InboxType) {
    InboxType["Guest"] = "GUEST";
    InboxType["Host"] = "HOST";
})(InboxType = exports.InboxType || (exports.InboxType = {}));
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["Inactive"] = "inactive";
})(Status = exports.Status || (exports.Status = {}));
var VesselType;
(function (VesselType) {
    VesselType["Catamaran"] = "catamaran";
    VesselType["Sailboat"] = "sailboat";
})(VesselType = exports.VesselType || (exports.VesselType = {}));
exports.CheckEmailDocument = (0, client_1.gql) `
    query CheckEmail($email: String!) {
  checkEmail(email: $email) {
    ... on CheckEmailResponse {
      userExists
      oAuth {
        authorizationServer
        emailReminder
        firstName
        avatar
      }
    }
    ... on BadCredentialsError {
      field
      message
    }
  }
}
    `;
function useCheckEmailQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CheckEmailDocument, options);
}
exports.useCheckEmailQuery = useCheckEmailQuery;
function useCheckEmailLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CheckEmailDocument, options);
}
exports.useCheckEmailLazyQuery = useCheckEmailLazyQuery;
exports.ConfirmEmailDocument = (0, client_1.gql) `
    mutation ConfirmEmail($id: String!) {
  confirmEmail(id: $id)
}
    `;
function useConfirmEmailMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.ConfirmEmailDocument, options);
}
exports.useConfirmEmailMutation = useConfirmEmailMutation;
exports.SendForgotPasswordEmailDocument = (0, client_1.gql) `
    mutation SendForgotPasswordEmail($email: String!) {
  sendForgotPasswordEmail(email: $email)
}
    `;
function useSendForgotPasswordEmailMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.SendForgotPasswordEmailDocument, options);
}
exports.useSendForgotPasswordEmailMutation = useSendForgotPasswordEmailMutation;
exports.LoginUserDocument = (0, client_1.gql) `
    mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      path
      message
    }
    sessionId
  }
}
    `;
function useLoginUserMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LoginUserDocument, options);
}
exports.useLoginUserMutation = useLoginUserMutation;
exports.LogoutUserDocument = (0, client_1.gql) `
    mutation LogoutUser {
  logout
}
    `;
function useLogoutUserMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LogoutUserDocument, options);
}
exports.useLogoutUserMutation = useLogoutUserMutation;
exports.MeDocument = (0, client_1.gql) `
    query Me {
  me {
    firstName
    avatar
  }
}
    `;
function useMeQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.MeDocument, options);
}
exports.useMeQuery = useMeQuery;
function useMeLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.MeDocument, options);
}
exports.useMeLazyQuery = useMeLazyQuery;
exports.AuthenticateUserWithOauthDocument = (0, client_1.gql) `
    mutation AuthenticateUserWithOauth($code: String!) {
  authenticateUserWithOauth(code: $code)
}
    `;
function useAuthenticateUserWithOauthMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AuthenticateUserWithOauthDocument, options);
}
exports.useAuthenticateUserWithOauthMutation = useAuthenticateUserWithOauthMutation;
exports.RegisterUserDocument = (0, client_1.gql) `
    mutation RegisterUser($email: String!, $password: String!, $firstName: String!) {
  register(email: $email, password: $password, firstName: $firstName) {
    path
    message
  }
}
    `;
function useRegisterUserMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.RegisterUserDocument, options);
}
exports.useRegisterUserMutation = useRegisterUserMutation;
exports.ResetPasswordDocument = (0, client_1.gql) `
    mutation ResetPassword($newPassword: String!, $key: String!) {
  resetPassword(newPassword: $newPassword, key: $key) {
    path
    message
  }
}
    `;
function useResetPasswordMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.ResetPasswordDocument, options);
}
exports.useResetPasswordMutation = useResetPasswordMutation;
exports.LoginAsRandomUserDocument = (0, client_1.gql) `
    mutation LoginAsRandomUser {
  loginAsRandomUser {
    errors {
      path
      message
    }
    sessionId
  }
}
    `;
function useLoginAsRandomUserMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LoginAsRandomUserDocument, options);
}
exports.useLoginAsRandomUserMutation = useLoginAsRandomUserMutation;
exports.CreateBookingDocument = (0, client_1.gql) `
    mutation CreateBooking($listingId: String!, $input: BookingInput!) {
  createBooking(listingId: $listingId, input: $input) {
    start
    end
    guests
    pricePerNight
    serviceFee
    taxes
    total
    listing {
      vesselType
      name
      img
      rating
    }
  }
}
    `;
function useCreateBookingMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateBookingDocument, options);
}
exports.useCreateBookingMutation = useCreateBookingMutation;
exports.GetListingUnavailabilityDocument = (0, client_1.gql) `
    query GetListingUnavailability($listingId: ID!) {
  getListingUnavailability(listingId: $listingId)
}
    `;
function useGetListingUnavailabilityQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetListingUnavailabilityDocument, options);
}
exports.useGetListingUnavailabilityQuery = useGetListingUnavailabilityQuery;
function useGetListingUnavailabilityLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetListingUnavailabilityDocument, options);
}
exports.useGetListingUnavailabilityLazyQuery = useGetListingUnavailabilityLazyQuery;
exports.CreateListingDocument = (0, client_1.gql) `
    mutation CreateListing($vesselType: VesselType!) {
  createListing(input: {vesselType: $vesselType})
}
    `;
function useCreateListingMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateListingDocument, options);
}
exports.useCreateListingMutation = useCreateListingMutation;
exports.SearchListingsDocument = (0, client_1.gql) `
    query SearchListings($input: SearchListingsInput, $offset: Int!, $limit: Int!) {
  searchListings(input: $input, offset: $offset, limit: $limit) {
    results {
      id
      vesselType
      photos
      price
      beds
      guests
      rating
      city
      state
      country
      longitude
      latitude
      distance
    }
    searchLocation {
      lat
      lng
    }
    count
  }
}
    `;
function useSearchListingsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SearchListingsDocument, options);
}
exports.useSearchListingsQuery = useSearchListingsQuery;
function useSearchListingsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SearchListingsDocument, options);
}
exports.useSearchListingsLazyQuery = useSearchListingsLazyQuery;
exports.UpdateListingDocument = (0, client_1.gql) `
    mutation UpdateListing($listingId: String!, $fields: UpdateListingFields!) {
  updateListing(listingId: $listingId, fields: $fields)
}
    `;
function useUpdateListingMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.UpdateListingDocument, options);
}
exports.useUpdateListingMutation = useUpdateListingMutation;
exports.ViewListingDocument = (0, client_1.gql) `
    query ViewListing($listingId: ID!) {
  viewListing(listingId: $listingId) {
    id
    name
    vesselType
    price
    description
    guests
    beds
    rating
    amenities
    street
    apt
    city
    state
    country
    zipcode
    longitude
    latitude
    photos
    owner {
      firstName
      lastName
      avatar
    }
  }
}
    `;
function useViewListingQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ViewListingDocument, options);
}
exports.useViewListingQuery = useViewListingQuery;
function useViewListingLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ViewListingDocument, options);
}
exports.useViewListingLazyQuery = useViewListingLazyQuery;
exports.CreateMessageDocument = (0, client_1.gql) `
    mutation CreateMessage($conversationId: String!, $text: String!) {
  createMessage(conversationId: $conversationId, text: $text)
}
    `;
function useCreateMessageMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateMessageDocument, options);
}
exports.useCreateMessageMutation = useCreateMessageMutation;
exports.CreateConversationDocument = (0, client_1.gql) `
    mutation CreateConversation($listingId: String!, $text: String!) {
  createConversation(listingId: $listingId, text: $text) {
    ... on ConversationSuccess {
      conversationId
      userIdOfRecipient
      recipient {
        firstName
        avatar
      }
    }
    ... on Redirect {
      redirect
    }
  }
}
    `;
function useCreateConversationMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateConversationDocument, options);
}
exports.useCreateConversationMutation = useCreateConversationMutation;
exports.PopulateInboxDocument = (0, client_1.gql) `
    query PopulateInbox($inboxType: InboxType!) {
  populateInbox(inboxType: $inboxType) {
    id
    text
    fromHost
    createdDate
    listingId
    conversationId
    interlocutor {
      avatar
      firstName
      lastName
    }
  }
}
    `;
function usePopulateInboxQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PopulateInboxDocument, options);
}
exports.usePopulateInboxQuery = usePopulateInboxQuery;
function usePopulateInboxLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PopulateInboxDocument, options);
}
exports.usePopulateInboxLazyQuery = usePopulateInboxLazyQuery;
exports.PopulateConversationDocument = (0, client_1.gql) `
    query PopulateConversation($conversationId: String!) {
  populateConversation(conversationId: $conversationId) {
    interlocutorId
    interlocutor {
      avatar
      firstName
      lastName
    }
    listingId
    listing {
      name
      img
    }
    conversationId
    messages {
      id
      text
      fromHost
      createdDate
    }
  }
}
    `;
function usePopulateConversationQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PopulateConversationDocument, options);
}
exports.usePopulateConversationQuery = usePopulateConversationQuery;
function usePopulateConversationLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PopulateConversationDocument, options);
}
exports.usePopulateConversationLazyQuery = usePopulateConversationLazyQuery;
exports.NewMessageSubscriptionDocument = (0, client_1.gql) `
    subscription NewMessageSubscription($conversationId: String!) {
  newMessage(conversationId: $conversationId) {
    id
    text
    fromHost
    createdDate
  }
}
    `;
function useNewMessageSubscriptionSubscription(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(exports.NewMessageSubscriptionDocument, options);
}
exports.useNewMessageSubscriptionSubscription = useNewMessageSubscriptionSubscription;
exports.UpdateInboxSubscriptionDocument = (0, client_1.gql) `
    subscription UpdateInboxSubscription {
  updateInbox {
    id
    text
    conversationId
    fromHost
    createdDate
    listingId
  }
}
    `;
function useUpdateInboxSubscriptionSubscription(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(exports.UpdateInboxSubscriptionDocument, options);
}
exports.useUpdateInboxSubscriptionSubscription = useUpdateInboxSubscriptionSubscription;
//# sourceMappingURL=graphql-hooks.js.map