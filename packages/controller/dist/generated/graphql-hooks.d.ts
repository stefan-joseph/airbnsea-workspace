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
    Date: any;
    File: any;
    Image: any;
};
export declare type Address = {
    apt?: InputMaybe<Scalars['String']>;
    city: Scalars['String'];
    country: Scalars['String'];
    state: Scalars['String'];
    street: Scalars['String'];
    zipcode: Scalars['String'];
};
export declare enum AuthorizationServer {
    Github = "GITHUB",
    Google = "GOOGLE"
}
export declare type Booking = {
    __typename?: 'Booking';
    end: Scalars['String'];
    guests: Scalars['Int'];
    listing?: Maybe<ListingInfo>;
    listingId: Scalars['ID'];
    pricePerNight: Scalars['Int'];
    serviceFee: Scalars['Int'];
    start: Scalars['String'];
    taxes: Scalars['Int'];
    total: Scalars['Int'];
};
export declare type BookingInput = {
    end: Scalars['String'];
    guests: Scalars['Int'];
    start: Scalars['String'];
};
export declare type CheckEmailPayload = EmailExistsWithOAuth | EmailExistsWithPassword | NoUserWithThisEmail | ValidationError;
export declare type Conversation = {
    __typename?: 'Conversation';
    conversationId: Scalars['ID'];
    dates?: Maybe<Scalars['String']>;
    interlocutor?: Maybe<User>;
    interlocutorId?: Maybe<Scalars['ID']>;
    listing?: Maybe<ListingInfo>;
    listingId: Scalars['ID'];
    messages: Array<ConversationMessage>;
};
export declare type ConversationMessage = {
    __typename?: 'ConversationMessage';
    createdDate: Scalars['Date'];
    fromHost: Scalars['Boolean'];
    id: Scalars['ID'];
    text: Scalars['String'];
};
export declare type ConversationSuccess = {
    __typename?: 'ConversationSuccess';
    conversationId: Scalars['ID'];
    recipient?: Maybe<User>;
    userIdOfRecipient?: Maybe<Scalars['ID']>;
};
export declare type CreateConversationResponse = ConversationSuccess | Redirect;
export declare type Draft = {
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
export declare type EmailExistsWithOAuth = {
    __typename?: 'EmailExistsWithOAuth';
    authorizationServer: AuthorizationServer;
    avatar?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    firstName: Scalars['String'];
};
export declare type EmailExistsWithPassword = {
    __typename?: 'EmailExistsWithPassword';
    email: Scalars['String'];
    userExists: Scalars['Boolean'];
};
export declare type Error = {
    __typename?: 'Error';
    message: Scalars['String'];
    path: Scalars['String'];
};
export declare type InboxMessage = {
    __typename?: 'InboxMessage';
    conversationId: Scalars['ID'];
    createdDate: Scalars['Date'];
    fromHost: Scalars['Boolean'];
    id: Scalars['ID'];
    interlocutor?: Maybe<User>;
    interlocutorId?: Maybe<Scalars['ID']>;
    listingId: Scalars['ID'];
    text: Scalars['String'];
};
export declare enum InboxType {
    Guest = "GUEST",
    Host = "HOST"
}
export declare type Listing = {
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
export declare type ListingInfo = {
    __typename?: 'ListingInfo';
    img?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    rating?: Maybe<Scalars['Float']>;
    vesselType?: Maybe<VesselType>;
};
export declare type LoginPayload = SuccessResponse | ValidationError;
export declare type Me = {
    __typename?: 'Me';
    avatar?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    addFruit: Scalars['Boolean'];
    authenticateUserWithOauth: Scalars['Boolean'];
    confirmEmail: Scalars['Boolean'];
    createBooking: Booking;
    createConversation: CreateConversationResponse;
    createListing: Scalars['ID'];
    createMessage: Scalars['ID'];
    deleteListing: Scalars['Boolean'];
    login: LoginPayload;
    loginAsRandomUser: Scalars['Boolean'];
    logout?: Maybe<Scalars['Boolean']>;
    register: RegisterPayload;
    resetPassword?: Maybe<Array<Error>>;
    sendForgotPasswordEmail?: Maybe<Scalars['Boolean']>;
    updateListing?: Maybe<Scalars['ID']>;
};
export declare type MutationAddFruitArgs = {
    fruit: Scalars['String'];
};
export declare type MutationAuthenticateUserWithOauthArgs = {
    code: Scalars['String'];
};
export declare type MutationConfirmEmailArgs = {
    id: Scalars['String'];
};
export declare type MutationCreateBookingArgs = {
    input: BookingInput;
    listingId: Scalars['String'];
};
export declare type MutationCreateConversationArgs = {
    listingId: Scalars['String'];
    text: Scalars['String'];
};
export declare type MutationCreateListingArgs = {
    input: VesselTypeInput;
};
export declare type MutationCreateMessageArgs = {
    conversationId: Scalars['String'];
    text: Scalars['String'];
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
    firstName: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationResetPasswordArgs = {
    key: Scalars['String'];
    newPassword: Scalars['String'];
};
export declare type MutationSendForgotPasswordEmailArgs = {
    email: Scalars['String'];
};
export declare type MutationUpdateListingArgs = {
    fields: UpdateListingFields;
    listingId: Scalars['String'];
};
export declare type NoUserWithThisEmail = {
    __typename?: 'NoUserWithThisEmail';
    email: Scalars['String'];
    userExists: Scalars['Boolean'];
};
export declare type Owner = {
    __typename?: 'Owner';
    avatar: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
};
export declare type PhotoUpdate = {
    photoToAdd?: InputMaybe<Scalars['Image']>;
    photoToDelete?: InputMaybe<Scalars['String']>;
    photos?: InputMaybe<Array<Scalars['String']>>;
};
export declare type Query = {
    __typename?: 'Query';
    checkEmail: CheckEmailPayload;
    getFruit: Scalars['String'];
    getListingUnavailability: Array<Scalars['String']>;
    me?: Maybe<Me>;
    populateConversation: Conversation;
    populateForm: Draft;
    populateInbox: Array<InboxMessage>;
    searchListings: SearchListingsResponse;
    viewListing: Listing;
    viewUserBookings: Array<Booking>;
};
export declare type QueryCheckEmailArgs = {
    email: Scalars['String'];
};
export declare type QueryGetListingUnavailabilityArgs = {
    listingId: Scalars['ID'];
};
export declare type QueryPopulateConversationArgs = {
    conversationId: Scalars['String'];
};
export declare type QueryPopulateFormArgs = {
    fields: Array<Scalars['String']>;
    listingId: Scalars['ID'];
};
export declare type QueryPopulateInboxArgs = {
    inboxType: InboxType;
};
export declare type QuerySearchListingsArgs = {
    input?: InputMaybe<SearchListingsInput>;
    limit: Scalars['Int'];
    offset: Scalars['Int'];
};
export declare type QueryViewListingArgs = {
    listingId: Scalars['ID'];
};
export declare type Redirect = {
    __typename?: 'Redirect';
    redirect: Scalars['String'];
};
export declare type RegisterPayload = SuccessResponse | ValidationError;
export declare type SearchListingResult = {
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
export declare type SearchListingsInput = {
    beds?: InputMaybe<Scalars['Int']>;
    end?: InputMaybe<Scalars['String']>;
    guests?: InputMaybe<Scalars['Int']>;
    start?: InputMaybe<Scalars['String']>;
    where?: InputMaybe<Scalars['String']>;
};
export declare type SearchListingsResponse = {
    __typename?: 'SearchListingsResponse';
    count: Scalars['Int'];
    results: Array<SearchListingResult>;
    searchLocation?: Maybe<SearchLocation>;
};
export declare type SearchLocation = {
    __typename?: 'SearchLocation';
    lat: Scalars['Float'];
    lng: Scalars['Float'];
};
export declare enum Status {
    Active = "active",
    Inactive = "inactive"
}
export declare type Subscription = {
    __typename?: 'Subscription';
    newMessage: ConversationMessage;
    updateInbox: InboxMessage;
};
export declare type SubscriptionNewMessageArgs = {
    conversationId: Scalars['String'];
};
export declare type SuccessResponse = {
    __typename?: 'SuccessResponse';
    success: Scalars['Boolean'];
};
export declare type UpdateListingFields = {
    address?: InputMaybe<Address>;
    name?: InputMaybe<Scalars['String']>;
    photos?: InputMaybe<PhotoUpdate>;
    vesselType?: InputMaybe<VesselType>;
};
export declare type User = {
    __typename?: 'User';
    avatar?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
};
export declare type ValidationError = {
    __typename?: 'ValidationError';
    field: Scalars['String'];
    message: Scalars['String'];
};
export declare enum VesselType {
    Catamaran = "catamaran",
    Sailboat = "sailboat"
}
export declare type VesselTypeInput = {
    vesselType: VesselType;
};
export declare type CheckEmailQueryVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type CheckEmailQuery = {
    __typename?: 'Query';
    checkEmail: {
        __typename?: 'EmailExistsWithOAuth';
        authorizationServer: AuthorizationServer;
        email: string;
        firstName: string;
        avatar?: string | null;
    } | {
        __typename?: 'EmailExistsWithPassword';
        email: string;
        userExists: boolean;
    } | {
        __typename?: 'NoUserWithThisEmail';
        email: string;
        userExists: boolean;
    } | {
        __typename?: 'ValidationError';
        field: string;
        message: string;
    };
};
export declare type ConfirmEmailMutationVariables = Exact<{
    id: Scalars['String'];
}>;
export declare type ConfirmEmailMutation = {
    __typename?: 'Mutation';
    confirmEmail: boolean;
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
        __typename?: 'SuccessResponse';
        success: boolean;
    } | {
        __typename?: 'ValidationError';
        field: string;
        message: string;
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
    me?: {
        __typename?: 'Me';
        firstName?: string | null;
        avatar?: string | null;
    } | null;
};
export declare type AuthenticateUserWithOauthMutationVariables = Exact<{
    code: Scalars['String'];
}>;
export declare type AuthenticateUserWithOauthMutation = {
    __typename?: 'Mutation';
    authenticateUserWithOauth: boolean;
};
export declare type RegisterUserMutationVariables = Exact<{
    email: Scalars['String'];
    password: Scalars['String'];
    firstName: Scalars['String'];
}>;
export declare type RegisterUserMutation = {
    __typename?: 'Mutation';
    register: {
        __typename?: 'SuccessResponse';
        success: boolean;
    } | {
        __typename?: 'ValidationError';
        field: string;
        message: string;
    };
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
export declare type LoginAsRandomUserMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type LoginAsRandomUserMutation = {
    __typename?: 'Mutation';
    loginAsRandomUser: boolean;
};
export declare type CreateBookingMutationVariables = Exact<{
    listingId: Scalars['String'];
    input: BookingInput;
}>;
export declare type CreateBookingMutation = {
    __typename?: 'Mutation';
    createBooking: {
        __typename?: 'Booking';
        start: string;
        end: string;
        guests: number;
        pricePerNight: number;
        serviceFee: number;
        taxes: number;
        total: number;
        listing?: {
            __typename?: 'ListingInfo';
            vesselType?: VesselType | null;
            name?: string | null;
            img?: string | null;
            rating?: number | null;
        } | null;
    };
};
export declare type GetListingUnavailabilityQueryVariables = Exact<{
    listingId: Scalars['ID'];
}>;
export declare type GetListingUnavailabilityQuery = {
    __typename?: 'Query';
    getListingUnavailability: Array<string>;
};
export declare type CreateListingMutationVariables = Exact<{
    vesselType: VesselType;
}>;
export declare type CreateListingMutation = {
    __typename?: 'Mutation';
    createListing: string;
};
export declare type SearchListingsQueryVariables = Exact<{
    input?: InputMaybe<SearchListingsInput>;
    offset: Scalars['Int'];
    limit: Scalars['Int'];
}>;
export declare type SearchListingsQuery = {
    __typename?: 'Query';
    searchListings: {
        __typename?: 'SearchListingsResponse';
        count: number;
        results: Array<{
            __typename?: 'SearchListingResult';
            id: string;
            vesselType: VesselType;
            photos: Array<string>;
            price: number;
            beds: number;
            guests: number;
            rating: number;
            city: string;
            state?: string | null;
            country: string;
            longitude: number;
            latitude: number;
            distance?: number | null;
        }>;
        searchLocation?: {
            __typename?: 'SearchLocation';
            lat: number;
            lng: number;
        } | null;
    };
};
export declare type UpdateListingMutationVariables = Exact<{
    listingId: Scalars['String'];
    fields: UpdateListingFields;
}>;
export declare type UpdateListingMutation = {
    __typename?: 'Mutation';
    updateListing?: string | null;
};
export declare type ViewListingQueryVariables = Exact<{
    listingId: Scalars['ID'];
}>;
export declare type ViewListingQuery = {
    __typename?: 'Query';
    viewListing: {
        __typename?: 'Listing';
        id?: string | null;
        name: string;
        vesselType: VesselType;
        price: number;
        description: string;
        guests: number;
        beds: number;
        rating: number;
        amenities?: Array<string> | null;
        street: string;
        apt?: string | null;
        city: string;
        state?: string | null;
        country: string;
        zipcode: string;
        longitude: number;
        latitude: number;
        photos: Array<string>;
        owner?: {
            __typename?: 'Owner';
            firstName: string;
            lastName: string;
            avatar: string;
        } | null;
    };
};
export declare type CreateMessageMutationVariables = Exact<{
    conversationId: Scalars['String'];
    text: Scalars['String'];
}>;
export declare type CreateMessageMutation = {
    __typename?: 'Mutation';
    createMessage: string;
};
export declare type CreateConversationMutationVariables = Exact<{
    listingId: Scalars['String'];
    text: Scalars['String'];
}>;
export declare type CreateConversationMutation = {
    __typename?: 'Mutation';
    createConversation: {
        __typename?: 'ConversationSuccess';
        conversationId: string;
        userIdOfRecipient?: string | null;
        recipient?: {
            __typename?: 'User';
            firstName?: string | null;
            avatar?: string | null;
        } | null;
    } | {
        __typename?: 'Redirect';
        redirect: string;
    };
};
export declare type PopulateInboxQueryVariables = Exact<{
    inboxType: InboxType;
}>;
export declare type PopulateInboxQuery = {
    __typename?: 'Query';
    populateInbox: Array<{
        __typename?: 'InboxMessage';
        id: string;
        text: string;
        fromHost: boolean;
        createdDate: any;
        listingId: string;
        conversationId: string;
        interlocutor?: {
            __typename?: 'User';
            avatar?: string | null;
            firstName?: string | null;
            lastName?: string | null;
        } | null;
    }>;
};
export declare type PopulateConversationQueryVariables = Exact<{
    conversationId: Scalars['String'];
}>;
export declare type PopulateConversationQuery = {
    __typename?: 'Query';
    populateConversation: {
        __typename?: 'Conversation';
        interlocutorId?: string | null;
        listingId: string;
        conversationId: string;
        interlocutor?: {
            __typename?: 'User';
            avatar?: string | null;
            firstName?: string | null;
            lastName?: string | null;
        } | null;
        listing?: {
            __typename?: 'ListingInfo';
            name?: string | null;
            img?: string | null;
        } | null;
        messages: Array<{
            __typename?: 'ConversationMessage';
            id: string;
            text: string;
            fromHost: boolean;
            createdDate: any;
        }>;
    };
};
export declare type NewMessageSubscriptionSubscriptionVariables = Exact<{
    conversationId: Scalars['String'];
}>;
export declare type NewMessageSubscriptionSubscription = {
    __typename?: 'Subscription';
    newMessage: {
        __typename?: 'ConversationMessage';
        id: string;
        text: string;
        fromHost: boolean;
        createdDate: any;
    };
};
export declare type UpdateInboxSubscriptionSubscriptionVariables = Exact<{
    [key: string]: never;
}>;
export declare type UpdateInboxSubscriptionSubscription = {
    __typename?: 'Subscription';
    updateInbox: {
        __typename?: 'InboxMessage';
        id: string;
        text: string;
        conversationId: string;
        fromHost: boolean;
        createdDate: any;
        listingId: string;
    };
};
export declare const CheckEmailDocument: Apollo.DocumentNode;
export declare function useCheckEmailQuery(baseOptions: Apollo.QueryHookOptions<CheckEmailQuery, CheckEmailQueryVariables>): Apollo.QueryResult<CheckEmailQuery, Exact<{
    email: string;
}>>;
export declare function useCheckEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckEmailQuery, CheckEmailQueryVariables>): Apollo.LazyQueryResultTuple<CheckEmailQuery, Exact<{
    email: string;
}>>;
export declare type CheckEmailQueryHookResult = ReturnType<typeof useCheckEmailQuery>;
export declare type CheckEmailLazyQueryHookResult = ReturnType<typeof useCheckEmailLazyQuery>;
export declare type CheckEmailQueryResult = Apollo.QueryResult<CheckEmailQuery, CheckEmailQueryVariables>;
export declare const ConfirmEmailDocument: Apollo.DocumentNode;
export declare type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export declare function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>): Apollo.MutationTuple<ConfirmEmailMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export declare type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export declare type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
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
export declare const AuthenticateUserWithOauthDocument: Apollo.DocumentNode;
export declare type AuthenticateUserWithOauthMutationFn = Apollo.MutationFunction<AuthenticateUserWithOauthMutation, AuthenticateUserWithOauthMutationVariables>;
export declare function useAuthenticateUserWithOauthMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateUserWithOauthMutation, AuthenticateUserWithOauthMutationVariables>): Apollo.MutationTuple<AuthenticateUserWithOauthMutation, Exact<{
    code: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AuthenticateUserWithOauthMutationHookResult = ReturnType<typeof useAuthenticateUserWithOauthMutation>;
export declare type AuthenticateUserWithOauthMutationResult = Apollo.MutationResult<AuthenticateUserWithOauthMutation>;
export declare type AuthenticateUserWithOauthMutationOptions = Apollo.BaseMutationOptions<AuthenticateUserWithOauthMutation, AuthenticateUserWithOauthMutationVariables>;
export declare const RegisterUserDocument: Apollo.DocumentNode;
export declare type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;
export declare function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>): Apollo.MutationTuple<RegisterUserMutation, Exact<{
    email: string;
    password: string;
    firstName: string;
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
export declare const LoginAsRandomUserDocument: Apollo.DocumentNode;
export declare type LoginAsRandomUserMutationFn = Apollo.MutationFunction<LoginAsRandomUserMutation, LoginAsRandomUserMutationVariables>;
export declare function useLoginAsRandomUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginAsRandomUserMutation, LoginAsRandomUserMutationVariables>): Apollo.MutationTuple<LoginAsRandomUserMutation, Exact<{
    [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LoginAsRandomUserMutationHookResult = ReturnType<typeof useLoginAsRandomUserMutation>;
export declare type LoginAsRandomUserMutationResult = Apollo.MutationResult<LoginAsRandomUserMutation>;
export declare type LoginAsRandomUserMutationOptions = Apollo.BaseMutationOptions<LoginAsRandomUserMutation, LoginAsRandomUserMutationVariables>;
export declare const CreateBookingDocument: Apollo.DocumentNode;
export declare type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;
export declare function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>): Apollo.MutationTuple<CreateBookingMutation, Exact<{
    listingId: string;
    input: BookingInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export declare type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export declare type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export declare const GetListingUnavailabilityDocument: Apollo.DocumentNode;
export declare function useGetListingUnavailabilityQuery(baseOptions: Apollo.QueryHookOptions<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>): Apollo.QueryResult<GetListingUnavailabilityQuery, Exact<{
    listingId: string;
}>>;
export declare function useGetListingUnavailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>): Apollo.LazyQueryResultTuple<GetListingUnavailabilityQuery, Exact<{
    listingId: string;
}>>;
export declare type GetListingUnavailabilityQueryHookResult = ReturnType<typeof useGetListingUnavailabilityQuery>;
export declare type GetListingUnavailabilityLazyQueryHookResult = ReturnType<typeof useGetListingUnavailabilityLazyQuery>;
export declare type GetListingUnavailabilityQueryResult = Apollo.QueryResult<GetListingUnavailabilityQuery, GetListingUnavailabilityQueryVariables>;
export declare const CreateListingDocument: Apollo.DocumentNode;
export declare type CreateListingMutationFn = Apollo.MutationFunction<CreateListingMutation, CreateListingMutationVariables>;
export declare function useCreateListingMutation(baseOptions?: Apollo.MutationHookOptions<CreateListingMutation, CreateListingMutationVariables>): Apollo.MutationTuple<CreateListingMutation, Exact<{
    vesselType: VesselType;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateListingMutationHookResult = ReturnType<typeof useCreateListingMutation>;
export declare type CreateListingMutationResult = Apollo.MutationResult<CreateListingMutation>;
export declare type CreateListingMutationOptions = Apollo.BaseMutationOptions<CreateListingMutation, CreateListingMutationVariables>;
export declare const SearchListingsDocument: Apollo.DocumentNode;
export declare function useSearchListingsQuery(baseOptions: Apollo.QueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>): Apollo.QueryResult<SearchListingsQuery, Exact<{
    input?: InputMaybe<SearchListingsInput> | undefined;
    offset: number;
    limit: number;
}>>;
export declare function useSearchListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>): Apollo.LazyQueryResultTuple<SearchListingsQuery, Exact<{
    input?: InputMaybe<SearchListingsInput> | undefined;
    offset: number;
    limit: number;
}>>;
export declare type SearchListingsQueryHookResult = ReturnType<typeof useSearchListingsQuery>;
export declare type SearchListingsLazyQueryHookResult = ReturnType<typeof useSearchListingsLazyQuery>;
export declare type SearchListingsQueryResult = Apollo.QueryResult<SearchListingsQuery, SearchListingsQueryVariables>;
export declare const UpdateListingDocument: Apollo.DocumentNode;
export declare type UpdateListingMutationFn = Apollo.MutationFunction<UpdateListingMutation, UpdateListingMutationVariables>;
export declare function useUpdateListingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListingMutation, UpdateListingMutationVariables>): Apollo.MutationTuple<UpdateListingMutation, Exact<{
    listingId: string;
    fields: UpdateListingFields;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateListingMutationHookResult = ReturnType<typeof useUpdateListingMutation>;
export declare type UpdateListingMutationResult = Apollo.MutationResult<UpdateListingMutation>;
export declare type UpdateListingMutationOptions = Apollo.BaseMutationOptions<UpdateListingMutation, UpdateListingMutationVariables>;
export declare const ViewListingDocument: Apollo.DocumentNode;
export declare function useViewListingQuery(baseOptions: Apollo.QueryHookOptions<ViewListingQuery, ViewListingQueryVariables>): Apollo.QueryResult<ViewListingQuery, Exact<{
    listingId: string;
}>>;
export declare function useViewListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewListingQuery, ViewListingQueryVariables>): Apollo.LazyQueryResultTuple<ViewListingQuery, Exact<{
    listingId: string;
}>>;
export declare type ViewListingQueryHookResult = ReturnType<typeof useViewListingQuery>;
export declare type ViewListingLazyQueryHookResult = ReturnType<typeof useViewListingLazyQuery>;
export declare type ViewListingQueryResult = Apollo.QueryResult<ViewListingQuery, ViewListingQueryVariables>;
export declare const CreateMessageDocument: Apollo.DocumentNode;
export declare type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;
export declare function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>): Apollo.MutationTuple<CreateMessageMutation, Exact<{
    conversationId: string;
    text: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export declare type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export declare type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export declare const CreateConversationDocument: Apollo.DocumentNode;
export declare type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;
export declare function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>): Apollo.MutationTuple<CreateConversationMutation, Exact<{
    listingId: string;
    text: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export declare type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export declare type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export declare const PopulateInboxDocument: Apollo.DocumentNode;
export declare function usePopulateInboxQuery(baseOptions: Apollo.QueryHookOptions<PopulateInboxQuery, PopulateInboxQueryVariables>): Apollo.QueryResult<PopulateInboxQuery, Exact<{
    inboxType: InboxType;
}>>;
export declare function usePopulateInboxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopulateInboxQuery, PopulateInboxQueryVariables>): Apollo.LazyQueryResultTuple<PopulateInboxQuery, Exact<{
    inboxType: InboxType;
}>>;
export declare type PopulateInboxQueryHookResult = ReturnType<typeof usePopulateInboxQuery>;
export declare type PopulateInboxLazyQueryHookResult = ReturnType<typeof usePopulateInboxLazyQuery>;
export declare type PopulateInboxQueryResult = Apollo.QueryResult<PopulateInboxQuery, PopulateInboxQueryVariables>;
export declare const PopulateConversationDocument: Apollo.DocumentNode;
export declare function usePopulateConversationQuery(baseOptions: Apollo.QueryHookOptions<PopulateConversationQuery, PopulateConversationQueryVariables>): Apollo.QueryResult<PopulateConversationQuery, Exact<{
    conversationId: string;
}>>;
export declare function usePopulateConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopulateConversationQuery, PopulateConversationQueryVariables>): Apollo.LazyQueryResultTuple<PopulateConversationQuery, Exact<{
    conversationId: string;
}>>;
export declare type PopulateConversationQueryHookResult = ReturnType<typeof usePopulateConversationQuery>;
export declare type PopulateConversationLazyQueryHookResult = ReturnType<typeof usePopulateConversationLazyQuery>;
export declare type PopulateConversationQueryResult = Apollo.QueryResult<PopulateConversationQuery, PopulateConversationQueryVariables>;
export declare const NewMessageSubscriptionDocument: Apollo.DocumentNode;
export declare function useNewMessageSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>): Apollo.SubscriptionResult<NewMessageSubscriptionSubscription, any>;
export declare type NewMessageSubscriptionSubscriptionHookResult = ReturnType<typeof useNewMessageSubscriptionSubscription>;
export declare type NewMessageSubscriptionSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscriptionSubscription>;
export declare const UpdateInboxSubscriptionDocument: Apollo.DocumentNode;
export declare function useUpdateInboxSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdateInboxSubscriptionSubscription, UpdateInboxSubscriptionSubscriptionVariables>): Apollo.SubscriptionResult<UpdateInboxSubscriptionSubscription, any>;
export declare type UpdateInboxSubscriptionSubscriptionHookResult = ReturnType<typeof useUpdateInboxSubscriptionSubscription>;
export declare type UpdateInboxSubscriptionSubscriptionResult = Apollo.SubscriptionResult<UpdateInboxSubscriptionSubscription>;
