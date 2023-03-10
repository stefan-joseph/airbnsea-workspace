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
exports.ViewMessagesDocument = exports.useNewMessageSubscriptionSubscription = exports.NewMessageSubscriptionDocument = exports.usePopulateConversationWithGuestLazyQuery = exports.usePopulateConversationWithGuestQuery = exports.PopulateConversationWithGuestDocument = exports.usePopulateConversationWithHostLazyQuery = exports.usePopulateConversationWithHostQuery = exports.PopulateConversationWithHostDocument = exports.usePopulateHostInboxLazyQuery = exports.usePopulateHostInboxQuery = exports.PopulateHostInboxDocument = exports.usePopulateGuestInboxLazyQuery = exports.usePopulateGuestInboxQuery = exports.PopulateGuestInboxDocument = exports.useCreateMessageMutation = exports.CreateMessageDocument = exports.useViewListingLazyQuery = exports.useViewListingQuery = exports.ViewListingDocument = exports.useUpdateListingMutation = exports.UpdateListingDocument = exports.useSearchListingsLazyQuery = exports.useSearchListingsQuery = exports.SearchListingsDocument = exports.useCreateListingMutation = exports.CreateListingDocument = exports.useGetListingUnavailabilityLazyQuery = exports.useGetListingUnavailabilityQuery = exports.GetListingUnavailabilityDocument = exports.useCreateBookingMutation = exports.CreateBookingDocument = exports.useGetRandomUserCredentailsLazyQuery = exports.useGetRandomUserCredentailsQuery = exports.GetRandomUserCredentailsDocument = exports.useResetPasswordMutation = exports.ResetPasswordDocument = exports.useRegisterUserMutation = exports.RegisterUserDocument = exports.useMeLazyQuery = exports.useMeQuery = exports.MeDocument = exports.useLogoutUserMutation = exports.LogoutUserDocument = exports.useLoginUserMutation = exports.LoginUserDocument = exports.useSendForgotPasswordEmailMutation = exports.SendForgotPasswordEmailDocument = exports.VesselType = exports.Status = void 0;
exports.useViewMessagesLazyQuery = exports.useViewMessagesQuery = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
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
exports.RegisterUserDocument = (0, client_1.gql) `
    mutation RegisterUser($email: String!, $password: String!) {
  register(email: $email, password: $password) {
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
exports.GetRandomUserCredentailsDocument = (0, client_1.gql) `
    query GetRandomUserCredentails {
  getRandomUserCredentails {
    email
    password
  }
}
    `;
function useGetRandomUserCredentailsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetRandomUserCredentailsDocument, options);
}
exports.useGetRandomUserCredentailsQuery = useGetRandomUserCredentailsQuery;
function useGetRandomUserCredentailsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetRandomUserCredentailsDocument, options);
}
exports.useGetRandomUserCredentailsLazyQuery = useGetRandomUserCredentailsLazyQuery;
exports.CreateBookingDocument = (0, client_1.gql) `
    mutation CreateBooking($listingId: ID!, $input: BookingInput!) {
  createBooking(listingId: $listingId, input: $input)
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
    mutation CreateMessage($listingId: String!, $text: String!) {
  createMessage(listingId: $listingId, text: $text)
}
    `;
function useCreateMessageMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateMessageDocument, options);
}
exports.useCreateMessageMutation = useCreateMessageMutation;
exports.PopulateGuestInboxDocument = (0, client_1.gql) `
    query PopulateGuestInbox {
  populateGuestInbox {
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
function usePopulateGuestInboxQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PopulateGuestInboxDocument, options);
}
exports.usePopulateGuestInboxQuery = usePopulateGuestInboxQuery;
function usePopulateGuestInboxLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PopulateGuestInboxDocument, options);
}
exports.usePopulateGuestInboxLazyQuery = usePopulateGuestInboxLazyQuery;
exports.PopulateHostInboxDocument = (0, client_1.gql) `
    query PopulateHostInbox {
  populateHostInbox {
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
function usePopulateHostInboxQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PopulateHostInboxDocument, options);
}
exports.usePopulateHostInboxQuery = usePopulateHostInboxQuery;
function usePopulateHostInboxLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PopulateHostInboxDocument, options);
}
exports.usePopulateHostInboxLazyQuery = usePopulateHostInboxLazyQuery;
exports.PopulateConversationWithHostDocument = (0, client_1.gql) `
    query PopulateConversationWithHost($conversationId: String!) {
  populateConversationWithHost(conversationId: $conversationId) {
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
function usePopulateConversationWithHostQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PopulateConversationWithHostDocument, options);
}
exports.usePopulateConversationWithHostQuery = usePopulateConversationWithHostQuery;
function usePopulateConversationWithHostLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PopulateConversationWithHostDocument, options);
}
exports.usePopulateConversationWithHostLazyQuery = usePopulateConversationWithHostLazyQuery;
exports.PopulateConversationWithGuestDocument = (0, client_1.gql) `
    query populateConversationWithGuest($conversationId: String!) {
  populateConversationWithGuest(conversationId: $conversationId) {
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
function usePopulateConversationWithGuestQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PopulateConversationWithGuestDocument, options);
}
exports.usePopulateConversationWithGuestQuery = usePopulateConversationWithGuestQuery;
function usePopulateConversationWithGuestLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PopulateConversationWithGuestDocument, options);
}
exports.usePopulateConversationWithGuestLazyQuery = usePopulateConversationWithGuestLazyQuery;
exports.NewMessageSubscriptionDocument = (0, client_1.gql) `
    subscription NewMessageSubscription($listingId: String!) {
  newMessage(listingId: $listingId) {
    text
    listingId
    user {
      avatar
      firstName
      lastName
    }
  }
}
    `;
function useNewMessageSubscriptionSubscription(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(exports.NewMessageSubscriptionDocument, options);
}
exports.useNewMessageSubscriptionSubscription = useNewMessageSubscriptionSubscription;
exports.ViewMessagesDocument = (0, client_1.gql) `
    query ViewMessages($listingId: String!) {
  messages(listingId: $listingId) {
    text
    listingId
    user {
      avatar
      firstName
      lastName
    }
  }
}
    `;
function useViewMessagesQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ViewMessagesDocument, options);
}
exports.useViewMessagesQuery = useViewMessagesQuery;
function useViewMessagesLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ViewMessagesDocument, options);
}
exports.useViewMessagesLazyQuery = useViewMessagesLazyQuery;
//# sourceMappingURL=graphql-hooks.js.map