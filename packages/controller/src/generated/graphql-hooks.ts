import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  File: any;
  Image: any;
};

export type Address = {
  apt?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  zipcode: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  end: Scalars['String'];
  listingId: Scalars['ID'];
  start: Scalars['String'];
};

export type BookingInput = {
  end: Scalars['String'];
  guests: Scalars['Int'];
  start: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  conversationId: Scalars['ID'];
  dates?: Maybe<Scalars['String']>;
  interlocutor?: Maybe<User>;
  interlocutorId?: Maybe<Scalars['ID']>;
  listing?: Maybe<ListingInfo>;
  listingId: Scalars['ID'];
  messages: Array<ConversationMessage>;
};

export type ConversationMessage = {
  __typename?: 'ConversationMessage';
  createdDate: Scalars['Date'];
  fromHost: Scalars['Boolean'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type Draft = {
  __typename?: 'Draft';
  amenities?: Maybe<Array<Scalars['String']>>;
  apt?: Maybe<Scalars['String']>;
  beds?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  guests?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  photos: Array<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  vesselType?: Maybe<VesselType>;
  zipcode?: Maybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Listing = {
  __typename?: 'Listing';
  amenities?: Maybe<Array<Scalars['String']>>;
  apt?: Maybe<Scalars['String']>;
  beds: Scalars['Int'];
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  guests: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  owner?: Maybe<Owner>;
  photos: Array<Scalars['String']>;
  price: Scalars['Int'];
  rating: Scalars['Float'];
  state?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  vesselType: VesselType;
  zipcode: Scalars['String'];
};

export type ListingInfo = {
  __typename?: 'ListingInfo';
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<Error>>;
  sessionId?: Maybe<Scalars['String']>;
};

export type Me = {
  __typename?: 'Me';
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  listingId: Scalars['ID'];
  text: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
};

export type MessageTut = {
  __typename?: 'MessageTut';
  body?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
};

export type MessageWithGuest = {
  __typename?: 'MessageWithGuest';
  conversationId: Scalars['ID'];
  createdDate: Scalars['Date'];
  fromHost: Scalars['Boolean'];
  id: Scalars['ID'];
  interlocutor?: Maybe<User>;
  listingId: Scalars['ID'];
  text: Scalars['String'];
  userIdOfGuest?: Maybe<Scalars['ID']>;
};

export type MessageWithHost = {
  __typename?: 'MessageWithHost';
  conversationId: Scalars['ID'];
  createdDate: Scalars['Date'];
  fromHost: Scalars['Boolean'];
  id: Scalars['ID'];
  interlocutor?: Maybe<User>;
  listingId: Scalars['ID'];
  text: Scalars['String'];
  userIdOfHost?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFruit: Scalars['Boolean'];
  confirmEmail: Scalars['Boolean'];
  createBooking: Scalars['ID'];
  createListing: Scalars['ID'];
  createMessage: Scalars['Boolean'];
  deleteListing: Scalars['Boolean'];
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<Array<Error>>;
  resetPassword?: Maybe<Array<Error>>;
  send: MessageTut;
  sendForgotPasswordEmail?: Maybe<Scalars['Boolean']>;
  updateListing?: Maybe<Scalars['ID']>;
};


export type MutationAddFruitArgs = {
  fruit: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  id: Scalars['String'];
};


export type MutationCreateBookingArgs = {
  input: BookingInput;
  listingId: Scalars['ID'];
};


export type MutationCreateListingArgs = {
  input: VesselTypeInput;
};


export type MutationCreateMessageArgs = {
  listingId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationDeleteListingArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  key: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationSendArgs = {
  input: SendMessageInput;
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateListingArgs = {
  fields: UpdateListingFields;
  listingId: Scalars['String'];
};

export type Owner = {
  __typename?: 'Owner';
  avatar: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type PhotoUpdate = {
  photoToAdd?: InputMaybe<Scalars['Image']>;
  photoToDelete?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  getFruit: Scalars['String'];
  getListingUnavailability: Array<Scalars['String']>;
  getRandomUserCredentails?: Maybe<RandomUser>;
  me?: Maybe<Me>;
  messages?: Maybe<Array<Message>>;
  populateConversationWithGuest: Conversation;
  populateConversationWithHost: Conversation;
  populateForm: Draft;
  populateGuestInbox: Array<MessageWithHost>;
  populateHostInbox: Array<MessageWithGuest>;
  room: Array<MessageTut>;
  searchListings: SearchListingsResponse;
  viewListing: Listing;
  viewUserBookings: Array<Booking>;
};


export type QueryGetListingUnavailabilityArgs = {
  listingId: Scalars['ID'];
};


export type QueryMessagesArgs = {
  listingId: Scalars['String'];
};


export type QueryPopulateConversationWithGuestArgs = {
  conversationId: Scalars['String'];
};


export type QueryPopulateConversationWithHostArgs = {
  conversationId: Scalars['String'];
};


export type QueryPopulateFormArgs = {
  fields: Array<Scalars['String']>;
  listingId: Scalars['ID'];
};


export type QueryRoomArgs = {
  id: Scalars['ID'];
};


export type QuerySearchListingsArgs = {
  input?: InputMaybe<SearchListingsInput>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryViewListingArgs = {
  listingId: Scalars['ID'];
};

export type RandomUser = {
  __typename?: 'RandomUser';
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SearchListingResult = {
  __typename?: 'SearchListingResult';
  beds: Scalars['Int'];
  city: Scalars['String'];
  country: Scalars['String'];
  distance?: Maybe<Scalars['Float']>;
  guests: Scalars['Int'];
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  photos: Array<Scalars['String']>;
  price: Scalars['Int'];
  rating: Scalars['Float'];
  state?: Maybe<Scalars['String']>;
  vesselType: VesselType;
};

export type SearchListingsInput = {
  beds?: InputMaybe<Scalars['Int']>;
  end?: InputMaybe<Scalars['String']>;
  guests?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['String']>;
};

export type SearchListingsResponse = {
  __typename?: 'SearchListingsResponse';
  count: Scalars['Int'];
  results: Array<SearchListingResult>;
  searchLocation?: Maybe<SearchLocation>;
};

export type SearchLocation = {
  __typename?: 'SearchLocation';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type SendMessageInput = {
  body: Scalars['String'];
  from: Scalars['String'];
  roomId: Scalars['ID'];
};

export enum Status {
  Active = 'active',
  Inactive = 'inactive'
}

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
  newMessageTut: MessageTut;
};


export type SubscriptionNewMessageArgs = {
  listingId: Scalars['String'];
};


export type SubscriptionNewMessageTutArgs = {
  roomId: Scalars['ID'];
};

export type UpdateListingFields = {
  address?: InputMaybe<Address>;
  name?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<PhotoUpdate>;
  vesselType?: InputMaybe<VesselType>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export enum VesselType {
  Catamaran = 'catamaran',
  Sailboat = 'sailboat'
}

export type VesselTypeInput = {
  vesselType: VesselType;
};

export type SendForgotPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendForgotPasswordEmailMutation = { __typename?: 'Mutation', sendForgotPasswordEmail?: boolean | null };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', sessionId?: string | null, errors?: Array<{ __typename?: 'Error', path: string, message: string }> | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', firstName?: string | null, avatar?: string | null } | null };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register?: Array<{ __typename?: 'Error', path: string, message: string }> | null };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  key: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: Array<{ __typename?: 'Error', path: string, message: string }> | null };

export type GetRandomUserCredentailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRandomUserCredentailsQuery = { __typename?: 'Query', getRandomUserCredentails?: { __typename?: 'RandomUser', email: string, password: string } | null };

export type CreateBookingMutationVariables = Exact<{
  listingId: Scalars['ID'];
  input: BookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: string };

export type GetListingUnavailabilityQueryVariables = Exact<{
  listingId: Scalars['ID'];
}>;


export type GetListingUnavailabilityQuery = { __typename?: 'Query', getListingUnavailability: Array<string> };

export type CreateListingMutationVariables = Exact<{
  vesselType: VesselType;
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing: string };

export type SearchListingsQueryVariables = Exact<{
  input?: InputMaybe<SearchListingsInput>;
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type SearchListingsQuery = { __typename?: 'Query', searchListings: { __typename?: 'SearchListingsResponse', count: number, results: Array<{ __typename?: 'SearchListingResult', id: string, vesselType: VesselType, photos: Array<string>, price: number, beds: number, guests: number, rating: number, city: string, state?: string | null, country: string, longitude: number, latitude: number, distance?: number | null }>, searchLocation?: { __typename?: 'SearchLocation', lat: number, lng: number } | null } };

export type UpdateListingMutationVariables = Exact<{
  listingId: Scalars['String'];
  fields: UpdateListingFields;
}>;


export type UpdateListingMutation = { __typename?: 'Mutation', updateListing?: string | null };

export type ViewListingQueryVariables = Exact<{
  listingId: Scalars['ID'];
}>;


export type ViewListingQuery = { __typename?: 'Query', viewListing: { __typename?: 'Listing', id?: string | null, name: string, vesselType: VesselType, price: number, description: string, guests: number, beds: number, rating: number, amenities?: Array<string> | null, street: string, apt?: string | null, city: string, state?: string | null, country: string, zipcode: string, longitude: number, latitude: number, photos: Array<string>, owner?: { __typename?: 'Owner', firstName: string, lastName: string, avatar: string } | null } };

export type CreateMessageMutationVariables = Exact<{
  listingId: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: boolean };

export type PopulateGuestInboxQueryVariables = Exact<{ [key: string]: never; }>;


export type PopulateGuestInboxQuery = { __typename?: 'Query', populateGuestInbox: Array<{ __typename?: 'MessageWithHost', id: string, text: string, fromHost: boolean, createdDate: any, listingId: string, conversationId: string, interlocutor?: { __typename?: 'User', avatar?: string | null, firstName?: string | null, lastName?: string | null } | null }> };

export type PopulateHostInboxQueryVariables = Exact<{ [key: string]: never; }>;


export type PopulateHostInboxQuery = { __typename?: 'Query', populateHostInbox: Array<{ __typename?: 'MessageWithGuest', id: string, text: string, fromHost: boolean, createdDate: any, listingId: string, conversationId: string, interlocutor?: { __typename?: 'User', avatar?: string | null, firstName?: string | null, lastName?: string | null } | null }> };

export type PopulateConversationWithHostQueryVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type PopulateConversationWithHostQuery = { __typename?: 'Query', populateConversationWithHost: { __typename?: 'Conversation', interlocutorId?: string | null, listingId: string, conversationId: string, interlocutor?: { __typename?: 'User', avatar?: string | null, firstName?: string | null, lastName?: string | null } | null, listing?: { __typename?: 'ListingInfo', name?: string | null, img?: string | null } | null, messages: Array<{ __typename?: 'ConversationMessage', id: string, text: string, fromHost: boolean, createdDate: any }> } };

export type PopulateConversationWithGuestQueryVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type PopulateConversationWithGuestQuery = { __typename?: 'Query', populateConversationWithGuest: { __typename?: 'Conversation', interlocutorId?: string | null, listingId: string, conversationId: string, interlocutor?: { __typename?: 'User', avatar?: string | null, firstName?: string | null, lastName?: string | null } | null, listing?: { __typename?: 'ListingInfo', name?: string | null, img?: string | null } | null, messages: Array<{ __typename?: 'ConversationMessage', id: string, text: string, fromHost: boolean, createdDate: any }> } };

export type NewMessageSubscriptionSubscriptionVariables = Exact<{
  listingId: Scalars['String'];
}>;


export type NewMessageSubscriptionSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', text: string, listingId: string, user?: { __typename?: 'User', avatar?: string | null, firstName?: string | null, lastName?: string | null } | null } };

export type ViewMessagesQueryVariables = Exact<{
  listingId: Scalars['String'];
}>;


export type ViewMessagesQuery = { __typename?: 'Query', messages?: Array<{ __typename?: 'Message', text: string, listingId: string, user?: { __typename?: 'User', avatar?: string | null, firstName?: string | null, lastName?: string | null } | null }> | null };


export const SendForgotPasswordEmailDocument = gql`
    mutation SendForgotPasswordEmail($email: String!) {
  sendForgotPasswordEmail(email: $email)
}
    `;
export type SendForgotPasswordEmailMutationFn = Apollo.MutationFunction<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;

/**
 * __useSendForgotPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendForgotPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendForgotPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendForgotPasswordEmailMutation, { data, loading, error }] = useSendForgotPasswordEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendForgotPasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>(SendForgotPasswordEmailDocument, options);
      }
export type SendForgotPasswordEmailMutationHookResult = ReturnType<typeof useSendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationResult = Apollo.MutationResult<SendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationOptions = Apollo.BaseMutationOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;
export const LoginUserDocument = gql`
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
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logout
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    firstName
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    path
    message
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $key: String!) {
  resetPassword(newPassword: $newPassword, key: $key) {
    path
    message
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const GetRandomUserCredentailsDocument = gql`
    query GetRandomUserCredentails {
  getRandomUserCredentails {
    email
    password
  }
}
    `;

/**
 * __useGetRandomUserCredentailsQuery__
 *
 * To run a query within a React component, call `useGetRandomUserCredentailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRandomUserCredentailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRandomUserCredentailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRandomUserCredentailsQuery(baseOptions?: Apollo.QueryHookOptions<GetRandomUserCredentailsQuery, GetRandomUserCredentailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRandomUserCredentailsQuery, GetRandomUserCredentailsQueryVariables>(GetRandomUserCredentailsDocument, options);
      }
export function useGetRandomUserCredentailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRandomUserCredentailsQuery, GetRandomUserCredentailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRandomUserCredentailsQuery, GetRandomUserCredentailsQueryVariables>(GetRandomUserCredentailsDocument, options);
        }
export type GetRandomUserCredentailsQueryHookResult = ReturnType<typeof useGetRandomUserCredentailsQuery>;
export type GetRandomUserCredentailsLazyQueryHookResult = ReturnType<typeof useGetRandomUserCredentailsLazyQuery>;
export type GetRandomUserCredentailsQueryResult = Apollo.QueryResult<GetRandomUserCredentailsQuery, GetRandomUserCredentailsQueryVariables>;
export const CreateBookingDocument = gql`
    mutation CreateBooking($listingId: ID!, $input: BookingInput!) {
  createBooking(listingId: $listingId, input: $input)
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const GetListingUnavailabilityDocument = gql`
    query GetListingUnavailability($listingId: ID!) {
  getListingUnavailability(listingId: $listingId)
}
    `;

/**
 * __useGetListingUnavailabilityQuery__
 *
 * To run a query within a React component, call `useGetListingUnavailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingUnavailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingUnavailabilityQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useGetListingUnavailabilityQuery(baseOptions: Apollo.QueryHookOptions<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>(GetListingUnavailabilityDocument, options);
      }
export function useGetListingUnavailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>(GetListingUnavailabilityDocument, options);
        }
export type GetListingUnavailabilityQueryHookResult = ReturnType<typeof useGetListingUnavailabilityQuery>;
export type GetListingUnavailabilityLazyQueryHookResult = ReturnType<typeof useGetListingUnavailabilityLazyQuery>;
export type GetListingUnavailabilityQueryResult = Apollo.QueryResult<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>;
export const CreateListingDocument = gql`
    mutation CreateListing($vesselType: VesselType!) {
  createListing(input: {vesselType: $vesselType})
}
    `;
export type CreateListingMutationFn = Apollo.MutationFunction<CreateListingMutation, CreateListingMutationVariables>;

/**
 * __useCreateListingMutation__
 *
 * To run a mutation, you first call `useCreateListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListingMutation, { data, loading, error }] = useCreateListingMutation({
 *   variables: {
 *      vesselType: // value for 'vesselType'
 *   },
 * });
 */
export function useCreateListingMutation(baseOptions?: Apollo.MutationHookOptions<CreateListingMutation, CreateListingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListingMutation, CreateListingMutationVariables>(CreateListingDocument, options);
      }
export type CreateListingMutationHookResult = ReturnType<typeof useCreateListingMutation>;
export type CreateListingMutationResult = Apollo.MutationResult<CreateListingMutation>;
export type CreateListingMutationOptions = Apollo.BaseMutationOptions<CreateListingMutation, CreateListingMutationVariables>;
export const SearchListingsDocument = gql`
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

/**
 * __useSearchListingsQuery__
 *
 * To run a query within a React component, call `useSearchListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchListingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchListingsQuery(baseOptions: Apollo.QueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchListingsQuery, SearchListingsQueryVariables>(SearchListingsDocument, options);
      }
export function useSearchListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchListingsQuery, SearchListingsQueryVariables>(SearchListingsDocument, options);
        }
export type SearchListingsQueryHookResult = ReturnType<typeof useSearchListingsQuery>;
export type SearchListingsLazyQueryHookResult = ReturnType<typeof useSearchListingsLazyQuery>;
export type SearchListingsQueryResult = Apollo.QueryResult<SearchListingsQuery, SearchListingsQueryVariables>;
export const UpdateListingDocument = gql`
    mutation UpdateListing($listingId: String!, $fields: UpdateListingFields!) {
  updateListing(listingId: $listingId, fields: $fields)
}
    `;
export type UpdateListingMutationFn = Apollo.MutationFunction<UpdateListingMutation, UpdateListingMutationVariables>;

/**
 * __useUpdateListingMutation__
 *
 * To run a mutation, you first call `useUpdateListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListingMutation, { data, loading, error }] = useUpdateListingMutation({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useUpdateListingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListingMutation, UpdateListingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListingMutation, UpdateListingMutationVariables>(UpdateListingDocument, options);
      }
export type UpdateListingMutationHookResult = ReturnType<typeof useUpdateListingMutation>;
export type UpdateListingMutationResult = Apollo.MutationResult<UpdateListingMutation>;
export type UpdateListingMutationOptions = Apollo.BaseMutationOptions<UpdateListingMutation, UpdateListingMutationVariables>;
export const ViewListingDocument = gql`
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

/**
 * __useViewListingQuery__
 *
 * To run a query within a React component, call `useViewListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewListingQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useViewListingQuery(baseOptions: Apollo.QueryHookOptions<ViewListingQuery, ViewListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewListingQuery, ViewListingQueryVariables>(ViewListingDocument, options);
      }
export function useViewListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewListingQuery, ViewListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewListingQuery, ViewListingQueryVariables>(ViewListingDocument, options);
        }
export type ViewListingQueryHookResult = ReturnType<typeof useViewListingQuery>;
export type ViewListingLazyQueryHookResult = ReturnType<typeof useViewListingLazyQuery>;
export type ViewListingQueryResult = Apollo.QueryResult<ViewListingQuery, ViewListingQueryVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($listingId: String!, $text: String!) {
  createMessage(listingId: $listingId, text: $text)
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const PopulateGuestInboxDocument = gql`
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

/**
 * __usePopulateGuestInboxQuery__
 *
 * To run a query within a React component, call `usePopulateGuestInboxQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopulateGuestInboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopulateGuestInboxQuery({
 *   variables: {
 *   },
 * });
 */
export function usePopulateGuestInboxQuery(baseOptions?: Apollo.QueryHookOptions<PopulateGuestInboxQuery, PopulateGuestInboxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopulateGuestInboxQuery, PopulateGuestInboxQueryVariables>(PopulateGuestInboxDocument, options);
      }
export function usePopulateGuestInboxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopulateGuestInboxQuery, PopulateGuestInboxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopulateGuestInboxQuery, PopulateGuestInboxQueryVariables>(PopulateGuestInboxDocument, options);
        }
export type PopulateGuestInboxQueryHookResult = ReturnType<typeof usePopulateGuestInboxQuery>;
export type PopulateGuestInboxLazyQueryHookResult = ReturnType<typeof usePopulateGuestInboxLazyQuery>;
export type PopulateGuestInboxQueryResult = Apollo.QueryResult<PopulateGuestInboxQuery, PopulateGuestInboxQueryVariables>;
export const PopulateHostInboxDocument = gql`
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

/**
 * __usePopulateHostInboxQuery__
 *
 * To run a query within a React component, call `usePopulateHostInboxQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopulateHostInboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopulateHostInboxQuery({
 *   variables: {
 *   },
 * });
 */
export function usePopulateHostInboxQuery(baseOptions?: Apollo.QueryHookOptions<PopulateHostInboxQuery, PopulateHostInboxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopulateHostInboxQuery, PopulateHostInboxQueryVariables>(PopulateHostInboxDocument, options);
      }
export function usePopulateHostInboxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopulateHostInboxQuery, PopulateHostInboxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopulateHostInboxQuery, PopulateHostInboxQueryVariables>(PopulateHostInboxDocument, options);
        }
export type PopulateHostInboxQueryHookResult = ReturnType<typeof usePopulateHostInboxQuery>;
export type PopulateHostInboxLazyQueryHookResult = ReturnType<typeof usePopulateHostInboxLazyQuery>;
export type PopulateHostInboxQueryResult = Apollo.QueryResult<PopulateHostInboxQuery, PopulateHostInboxQueryVariables>;
export const PopulateConversationWithHostDocument = gql`
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

/**
 * __usePopulateConversationWithHostQuery__
 *
 * To run a query within a React component, call `usePopulateConversationWithHostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopulateConversationWithHostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopulateConversationWithHostQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function usePopulateConversationWithHostQuery(baseOptions: Apollo.QueryHookOptions<PopulateConversationWithHostQuery, PopulateConversationWithHostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopulateConversationWithHostQuery, PopulateConversationWithHostQueryVariables>(PopulateConversationWithHostDocument, options);
      }
export function usePopulateConversationWithHostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopulateConversationWithHostQuery, PopulateConversationWithHostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopulateConversationWithHostQuery, PopulateConversationWithHostQueryVariables>(PopulateConversationWithHostDocument, options);
        }
export type PopulateConversationWithHostQueryHookResult = ReturnType<typeof usePopulateConversationWithHostQuery>;
export type PopulateConversationWithHostLazyQueryHookResult = ReturnType<typeof usePopulateConversationWithHostLazyQuery>;
export type PopulateConversationWithHostQueryResult = Apollo.QueryResult<PopulateConversationWithHostQuery, PopulateConversationWithHostQueryVariables>;
export const PopulateConversationWithGuestDocument = gql`
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

/**
 * __usePopulateConversationWithGuestQuery__
 *
 * To run a query within a React component, call `usePopulateConversationWithGuestQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopulateConversationWithGuestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopulateConversationWithGuestQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function usePopulateConversationWithGuestQuery(baseOptions: Apollo.QueryHookOptions<PopulateConversationWithGuestQuery, PopulateConversationWithGuestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopulateConversationWithGuestQuery, PopulateConversationWithGuestQueryVariables>(PopulateConversationWithGuestDocument, options);
      }
export function usePopulateConversationWithGuestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopulateConversationWithGuestQuery, PopulateConversationWithGuestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopulateConversationWithGuestQuery, PopulateConversationWithGuestQueryVariables>(PopulateConversationWithGuestDocument, options);
        }
export type PopulateConversationWithGuestQueryHookResult = ReturnType<typeof usePopulateConversationWithGuestQuery>;
export type PopulateConversationWithGuestLazyQueryHookResult = ReturnType<typeof usePopulateConversationWithGuestLazyQuery>;
export type PopulateConversationWithGuestQueryResult = Apollo.QueryResult<PopulateConversationWithGuestQuery, PopulateConversationWithGuestQueryVariables>;
export const NewMessageSubscriptionDocument = gql`
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

/**
 * __useNewMessageSubscriptionSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscriptionSubscription({
 *   variables: {
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useNewMessageSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>(NewMessageSubscriptionDocument, options);
      }
export type NewMessageSubscriptionSubscriptionHookResult = ReturnType<typeof useNewMessageSubscriptionSubscription>;
export type NewMessageSubscriptionSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscriptionSubscription>;
export const ViewMessagesDocument = gql`
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

/**
 * __useViewMessagesQuery__
 *
 * To run a query within a React component, call `useViewMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewMessagesQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useViewMessagesQuery(baseOptions: Apollo.QueryHookOptions<ViewMessagesQuery, ViewMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewMessagesQuery, ViewMessagesQueryVariables>(ViewMessagesDocument, options);
      }
export function useViewMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewMessagesQuery, ViewMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewMessagesQuery, ViewMessagesQueryVariables>(ViewMessagesDocument, options);
        }
export type ViewMessagesQueryHookResult = ReturnType<typeof useViewMessagesQuery>;
export type ViewMessagesLazyQueryHookResult = ReturnType<typeof useViewMessagesLazyQuery>;
export type ViewMessagesQueryResult = Apollo.QueryResult<ViewMessagesQuery, ViewMessagesQueryVariables>;