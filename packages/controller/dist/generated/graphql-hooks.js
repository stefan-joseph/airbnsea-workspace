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
exports.useViewMessagesLazyQuery = exports.useViewMessagesQuery = exports.ViewMessagesDocument = exports.useNewMessageSubscriptionSubscription = exports.NewMessageSubscriptionDocument = exports.useCreateMessageMutation = exports.CreateMessageDocument = exports.useViewListingLazyQuery = exports.useViewListingQuery = exports.ViewListingDocument = exports.useFindListingsLazyQuery = exports.useFindListingsQuery = exports.FindListingsDocument = exports.useCreateListingMutation = exports.CreateListingDocument = exports.useResetPasswordMutation = exports.ResetPasswordDocument = exports.useRegisterUserMutation = exports.RegisterUserDocument = exports.useMeLazyQuery = exports.useMeQuery = exports.MeDocument = exports.useLogoutUserMutation = exports.LogoutUserDocument = exports.useLoginUserMutation = exports.LoginUserDocument = exports.useSendForgotPasswordEmailMutation = exports.SendForgotPasswordEmailDocument = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
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
  me
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
exports.CreateListingDocument = (0, client_1.gql) `
    mutation CreateListing($name: String!, $category: String!, $description: String!, $price: Int!, $beds: Int!, $guests: Int!, $latitude: Float!, $longitude: Float!, $amenities: [String!]!, $img: File) {
  createListing(
    input: {name: $name, category: $category, description: $description, price: $price, beds: $beds, guests: $guests, latitude: $latitude, longitude: $longitude, amenities: $amenities, img: $img}
  )
}
    `;
function useCreateListingMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateListingDocument, options);
}
exports.useCreateListingMutation = useCreateListingMutation;
exports.FindListingsDocument = (0, client_1.gql) `
    query findListings {
  findListings {
    id
    name
    imgUrl
    owner {
      email
    }
  }
}
    `;
function useFindListingsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.FindListingsDocument, options);
}
exports.useFindListingsQuery = useFindListingsQuery;
function useFindListingsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.FindListingsDocument, options);
}
exports.useFindListingsLazyQuery = useFindListingsLazyQuery;
exports.ViewListingDocument = (0, client_1.gql) `
    query viewListing($id: String!) {
  viewListing(id: $id) {
    id
    name
    category
    price
    description
    guests
    beds
    imgUrl
    owner {
      email
      name
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
    mutation CreateMessage($message: MessageInput!) {
  createMessage(message: $message)
}
    `;
function useCreateMessageMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateMessageDocument, options);
}
exports.useCreateMessageMutation = useCreateMessageMutation;
exports.NewMessageSubscriptionDocument = (0, client_1.gql) `
    subscription NewMessageSubscription($listingId: String!) {
  newMessage(listingId: $listingId) {
    text
    listingId
    user {
      email
      name
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
    userId
    user {
      email
      name
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