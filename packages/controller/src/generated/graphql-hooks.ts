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
  File: any;
};

export type CreateListingInput = {
  amenities: Array<Scalars['String']>;
  beds: Scalars['Int'];
  category: Scalars['String'];
  description: Scalars['String'];
  guests: Scalars['Int'];
  img?: InputMaybe<Scalars['File']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Int'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Listing = {
  __typename?: 'Listing';
  amenities: Array<Scalars['String']>;
  beds: Scalars['Int'];
  category: Scalars['String'];
  description: Scalars['String'];
  guests: Scalars['Int'];
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  owner?: Maybe<Owner>;
  price: Scalars['Int'];
  userId?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<Error>>;
  sessionId?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  listingId: Scalars['String'];
  text: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  listingId: Scalars['String'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['Boolean'];
  createListing: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  deleteListing: Scalars['Boolean'];
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<Array<Error>>;
  resetPassword?: Maybe<Array<Error>>;
  sendForgotPasswordEmail?: Maybe<Scalars['Boolean']>;
};


export type MutationConfirmEmailArgs = {
  id: Scalars['String'];
};


export type MutationCreateListingArgs = {
  input: CreateListingInput;
};


export type MutationCreateMessageArgs = {
  message: MessageInput;
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


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String'];
};

export type Owner = {
  __typename?: 'Owner';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findListings?: Maybe<Array<Listing>>;
  me: Scalars['Boolean'];
  messages?: Maybe<Array<Message>>;
  viewListing?: Maybe<Listing>;
};


export type QueryMessagesArgs = {
  listingId: Scalars['String'];
};


export type QueryViewListingArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  listingId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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


export type MeQuery = { __typename?: 'Query', me: boolean };

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

export type CreateListingMutationVariables = Exact<{
  name: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Int'];
  beds: Scalars['Int'];
  guests: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']> | Scalars['String'];
  img?: InputMaybe<Scalars['File']>;
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing: boolean };

export type FindListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindListingsQuery = { __typename?: 'Query', findListings?: Array<{ __typename?: 'Listing', id: string, name: string, imgUrl: string, owner?: { __typename?: 'Owner', email?: string | null } | null }> | null };

export type ViewListingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ViewListingQuery = { __typename?: 'Query', viewListing?: { __typename?: 'Listing', id: string, name: string, category: string, price: number, description: string, guests: number, beds: number, imgUrl: string, owner?: { __typename?: 'Owner', email?: string | null, name?: string | null } | null } | null };

export type CreateMessageMutationVariables = Exact<{
  message: MessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: boolean };

export type NewMessageSubscriptionSubscriptionVariables = Exact<{
  listingId: Scalars['String'];
}>;


export type NewMessageSubscriptionSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', text: string, listingId: string, user?: { __typename?: 'User', email?: string | null, name?: string | null } | null } };

export type ViewMessagesQueryVariables = Exact<{
  listingId: Scalars['String'];
}>;


export type ViewMessagesQuery = { __typename?: 'Query', messages?: Array<{ __typename?: 'Message', text: string, listingId: string, userId?: string | null, user?: { __typename?: 'User', email?: string | null, name?: string | null } | null }> | null };


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
  me
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
export const CreateListingDocument = gql`
    mutation CreateListing($name: String!, $category: String!, $description: String!, $price: Int!, $beds: Int!, $guests: Int!, $latitude: Float!, $longitude: Float!, $amenities: [String!]!, $img: File) {
  createListing(
    input: {name: $name, category: $category, description: $description, price: $price, beds: $beds, guests: $guests, latitude: $latitude, longitude: $longitude, amenities: $amenities, img: $img}
  )
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
 *      name: // value for 'name'
 *      category: // value for 'category'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      beds: // value for 'beds'
 *      guests: // value for 'guests'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      amenities: // value for 'amenities'
 *      img: // value for 'img'
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
export const FindListingsDocument = gql`
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

/**
 * __useFindListingsQuery__
 *
 * To run a query within a React component, call `useFindListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindListingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindListingsQuery(baseOptions?: Apollo.QueryHookOptions<FindListingsQuery, FindListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindListingsQuery, FindListingsQueryVariables>(FindListingsDocument, options);
      }
export function useFindListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindListingsQuery, FindListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindListingsQuery, FindListingsQueryVariables>(FindListingsDocument, options);
        }
export type FindListingsQueryHookResult = ReturnType<typeof useFindListingsQuery>;
export type FindListingsLazyQueryHookResult = ReturnType<typeof useFindListingsLazyQuery>;
export type FindListingsQueryResult = Apollo.QueryResult<FindListingsQuery, FindListingsQueryVariables>;
export const ViewListingDocument = gql`
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
 *      id: // value for 'id'
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
    mutation CreateMessage($message: MessageInput!) {
  createMessage(message: $message)
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
 *      message: // value for 'message'
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
export const NewMessageSubscriptionDocument = gql`
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
    userId
    user {
      email
      name
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