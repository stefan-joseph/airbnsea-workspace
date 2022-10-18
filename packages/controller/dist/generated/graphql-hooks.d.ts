import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    File: any;
};
export declare type CreateListingInput = {
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
export declare type Error = {
    __typename?: 'Error';
    message: Scalars['String'];
    path: Scalars['String'];
};
export declare type Listing = {
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
export declare type LoginResponse = {
    __typename?: 'LoginResponse';
    errors?: Maybe<Array<Error>>;
    sessionId?: Maybe<Scalars['String']>;
};
export declare type Message = {
    __typename?: 'Message';
    listingId: Scalars['String'];
    text: Scalars['String'];
    user?: Maybe<User>;
    userId?: Maybe<Scalars['String']>;
};
export declare type MessageInput = {
    listingId: Scalars['String'];
    text: Scalars['String'];
};
export declare type Mutation = {
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
export declare type MutationConfirmEmailArgs = {
    id: Scalars['String'];
};
export declare type MutationCreateListingArgs = {
    input: CreateListingInput;
};
export declare type MutationCreateMessageArgs = {
    message: MessageInput;
};
export declare type MutationDeleteListingArgs = {
    id: Scalars['String'];
};
export declare type MutationLoginArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationRegisterArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationResetPasswordArgs = {
    key: Scalars['String'];
    newPassword: Scalars['String'];
};
export declare type MutationSendForgotPasswordEmailArgs = {
    email: Scalars['String'];
};
export declare type Owner = {
    __typename?: 'Owner';
    email?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type Query = {
    __typename?: 'Query';
    findListings?: Maybe<Array<Listing>>;
    me: Scalars['Boolean'];
    messages?: Maybe<Array<Message>>;
    viewListing?: Maybe<Listing>;
};
export declare type QueryMessagesArgs = {
    listingId: Scalars['String'];
};
export declare type QueryViewListingArgs = {
    id: Scalars['String'];
};
export declare type Subscription = {
    __typename?: 'Subscription';
    newMessage: Message;
};
export declare type SubscriptionNewMessageArgs = {
    listingId: Scalars['String'];
};
export declare type User = {
    __typename?: 'User';
    email?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type SendForgotPasswordEmailMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type SendForgotPasswordEmailMutation = {
    __typename?: 'Mutation';
    sendForgotPasswordEmail?: boolean | null;
};
export declare type LoginUserMutationVariables = Exact<{
    email: Scalars['String'];
    password: Scalars['String'];
}>;
export declare type LoginUserMutation = {
    __typename?: 'Mutation';
    login: {
        __typename?: 'LoginResponse';
        sessionId?: string | null;
        errors?: Array<{
            __typename?: 'Error';
            path: string;
            message: string;
        }> | null;
    };
};
export declare type LogoutUserMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type LogoutUserMutation = {
    __typename?: 'Mutation';
    logout?: boolean | null;
};
export declare type MeQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MeQuery = {
    __typename?: 'Query';
    me: boolean;
};
export declare type RegisterUserMutationVariables = Exact<{
    email: Scalars['String'];
    password: Scalars['String'];
}>;
export declare type RegisterUserMutation = {
    __typename?: 'Mutation';
    register?: Array<{
        __typename?: 'Error';
        path: string;
        message: string;
    }> | null;
};
export declare type ResetPasswordMutationVariables = Exact<{
    newPassword: Scalars['String'];
    key: Scalars['String'];
}>;
export declare type ResetPasswordMutation = {
    __typename?: 'Mutation';
    resetPassword?: Array<{
        __typename?: 'Error';
        path: string;
        message: string;
    }> | null;
};
export declare type CreateListingMutationVariables = Exact<{
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
export declare type CreateListingMutation = {
    __typename?: 'Mutation';
    createListing: boolean;
};
export declare type FindListingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type FindListingsQuery = {
    __typename?: 'Query';
    findListings?: Array<{
        __typename?: 'Listing';
        id: string;
        name: string;
        imgUrl: string;
        owner?: {
            __typename?: 'Owner';
            email?: string | null;
        } | null;
    }> | null;
};
export declare type ViewListingQueryVariables = Exact<{
    id: Scalars['String'];
}>;
export declare type ViewListingQuery = {
    __typename?: 'Query';
    viewListing?: {
        __typename?: 'Listing';
        id: string;
        name: string;
        category: string;
        price: number;
        description: string;
        guests: number;
        beds: number;
        imgUrl: string;
        owner?: {
            __typename?: 'Owner';
            email?: string | null;
            name?: string | null;
        } | null;
    } | null;
};
export declare type CreateMessageMutationVariables = Exact<{
    message: MessageInput;
}>;
export declare type CreateMessageMutation = {
    __typename?: 'Mutation';
    createMessage: boolean;
};
export declare type NewMessageSubscriptionSubscriptionVariables = Exact<{
    listingId: Scalars['String'];
}>;
export declare type NewMessageSubscriptionSubscription = {
    __typename?: 'Subscription';
    newMessage: {
        __typename?: 'Message';
        text: string;
        listingId: string;
        user?: {
            __typename?: 'User';
            email?: string | null;
            name?: string | null;
        } | null;
    };
};
export declare type ViewMessagesQueryVariables = Exact<{
    listingId: Scalars['String'];
}>;
export declare type ViewMessagesQuery = {
    __typename?: 'Query';
    messages?: Array<{
        __typename?: 'Message';
        text: string;
        listingId: string;
        userId?: string | null;
        user?: {
            __typename?: 'User';
            email?: string | null;
            name?: string | null;
        } | null;
    }> | null;
};
export declare const SendForgotPasswordEmailDocument: Apollo.DocumentNode;
export declare type SendForgotPasswordEmailMutationFn = Apollo.MutationFunction<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;
export declare function useSendForgotPasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>): Apollo.MutationTuple<SendForgotPasswordEmailMutation, Exact<{
    email: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type SendForgotPasswordEmailMutationHookResult = ReturnType<typeof useSendForgotPasswordEmailMutation>;
export declare type SendForgotPasswordEmailMutationResult = Apollo.MutationResult<SendForgotPasswordEmailMutation>;
export declare type SendForgotPasswordEmailMutationOptions = Apollo.BaseMutationOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;
export declare const LoginUserDocument: Apollo.DocumentNode;
export declare type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;
export declare function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>): Apollo.MutationTuple<LoginUserMutation, Exact<{
    email: string;
    password: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export declare type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export declare type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export declare const LogoutUserDocument: Apollo.DocumentNode;
export declare type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;
export declare function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>): Apollo.MutationTuple<LogoutUserMutation, Exact<{
    [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export declare type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export declare type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export declare const MeDocument: Apollo.DocumentNode;
export declare function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>): Apollo.QueryResult<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.LazyQueryResultTuple<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export declare type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export declare type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export declare const RegisterUserDocument: Apollo.DocumentNode;
export declare type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;
export declare function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>): Apollo.MutationTuple<RegisterUserMutation, Exact<{
    email: string;
    password: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export declare type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export declare type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export declare const ResetPasswordDocument: Apollo.DocumentNode;
export declare type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;
export declare function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>): Apollo.MutationTuple<ResetPasswordMutation, Exact<{
    newPassword: string;
    key: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export declare type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export declare type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export declare const CreateListingDocument: Apollo.DocumentNode;
export declare type CreateListingMutationFn = Apollo.MutationFunction<CreateListingMutation, CreateListingMutationVariables>;
export declare function useCreateListingMutation(baseOptions?: Apollo.MutationHookOptions<CreateListingMutation, CreateListingMutationVariables>): Apollo.MutationTuple<CreateListingMutation, Exact<{
    name: string;
    category: string;
    description: string;
    price: number;
    beds: number;
    guests: number;
    latitude: number;
    longitude: number;
    amenities: string | string[];
    img?: any;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateListingMutationHookResult = ReturnType<typeof useCreateListingMutation>;
export declare type CreateListingMutationResult = Apollo.MutationResult<CreateListingMutation>;
export declare type CreateListingMutationOptions = Apollo.BaseMutationOptions<CreateListingMutation, CreateListingMutationVariables>;
export declare const FindListingsDocument: Apollo.DocumentNode;
export declare function useFindListingsQuery(baseOptions?: Apollo.QueryHookOptions<FindListingsQuery, FindListingsQueryVariables>): Apollo.QueryResult<FindListingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useFindListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindListingsQuery, FindListingsQueryVariables>): Apollo.LazyQueryResultTuple<FindListingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type FindListingsQueryHookResult = ReturnType<typeof useFindListingsQuery>;
export declare type FindListingsLazyQueryHookResult = ReturnType<typeof useFindListingsLazyQuery>;
export declare type FindListingsQueryResult = Apollo.QueryResult<FindListingsQuery, FindListingsQueryVariables>;
export declare const ViewListingDocument: Apollo.DocumentNode;
export declare function useViewListingQuery(baseOptions: Apollo.QueryHookOptions<ViewListingQuery, ViewListingQueryVariables>): Apollo.QueryResult<ViewListingQuery, Exact<{
    id: string;
}>>;
export declare function useViewListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewListingQuery, ViewListingQueryVariables>): Apollo.LazyQueryResultTuple<ViewListingQuery, Exact<{
    id: string;
}>>;
export declare type ViewListingQueryHookResult = ReturnType<typeof useViewListingQuery>;
export declare type ViewListingLazyQueryHookResult = ReturnType<typeof useViewListingLazyQuery>;
export declare type ViewListingQueryResult = Apollo.QueryResult<ViewListingQuery, ViewListingQueryVariables>;
export declare const CreateMessageDocument: Apollo.DocumentNode;
export declare type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;
export declare function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>): Apollo.MutationTuple<CreateMessageMutation, Exact<{
    message: MessageInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export declare type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export declare type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export declare const NewMessageSubscriptionDocument: Apollo.DocumentNode;
export declare function useNewMessageSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>): Apollo.SubscriptionResult<NewMessageSubscriptionSubscription, any>;
export declare type NewMessageSubscriptionSubscriptionHookResult = ReturnType<typeof useNewMessageSubscriptionSubscription>;
export declare type NewMessageSubscriptionSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscriptionSubscription>;
export declare const ViewMessagesDocument: Apollo.DocumentNode;
export declare function useViewMessagesQuery(baseOptions: Apollo.QueryHookOptions<ViewMessagesQuery, ViewMessagesQueryVariables>): Apollo.QueryResult<ViewMessagesQuery, Exact<{
    listingId: string;
}>>;
export declare function useViewMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewMessagesQuery, ViewMessagesQueryVariables>): Apollo.LazyQueryResultTuple<ViewMessagesQuery, Exact<{
    listingId: string;
}>>;
export declare type ViewMessagesQueryHookResult = ReturnType<typeof useViewMessagesQuery>;
export declare type ViewMessagesLazyQueryHookResult = ReturnType<typeof useViewMessagesLazyQuery>;
export declare type ViewMessagesQueryResult = Apollo.QueryResult<ViewMessagesQuery, ViewMessagesQueryVariables>;
