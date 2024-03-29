import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type AuthenticateUserWithOauthPayload = SuccessResponse | UserAlreadyExists | UserExistsWithOAuth | UserMustRegister;

export enum AuthorizationServer {
  Github = 'GITHUB',
  Linkedin = 'LINKEDIN'
}

export type Booking = {
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

export type BookingInput = {
  end: Scalars['String'];
  guests: Scalars['Int'];
  start: Scalars['String'];
};

export type CheckEmailPayload = NoUserWithThisEmail | UserExistsWithOAuth | UserExistsWithPassword | UserNotConfirmed | ValidationError;

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

export type ConversationSuccess = {
  __typename?: 'ConversationSuccess';
  conversationId: Scalars['ID'];
  recipient?: Maybe<User>;
  userIdOfRecipient?: Maybe<Scalars['ID']>;
};

export type CreateConversationResponse = ConversationSuccess | Redirect;

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

export type ForgotPasswordEmailSuccessResponse = {
  __typename?: 'ForgotPasswordEmailSuccessResponse';
  email: Scalars['String'];
};

export type InboxMessage = {
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

export enum InboxType {
  Guest = 'GUEST',
  Host = 'HOST'
}

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
  rating?: Maybe<Scalars['Float']>;
  vesselType?: Maybe<VesselType>;
};

export type LoginPayload = SuccessResponse | ValidationError;

export type Me = {
  __typename?: 'Me';
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFruit: Scalars['Boolean'];
  authenticateUserWithOauth: AuthenticateUserWithOauthPayload;
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
  registerUserWithOauth: RegisterUserIwthOauthPayload;
  resetPassword: ResetPasswordPayload;
  sendForgotPasswordEmail: SendForgotPasswordEmailPayload;
  updateListing?: Maybe<Scalars['ID']>;
};


export type MutationAddFruitArgs = {
  fruit: Scalars['String'];
};


export type MutationAuthenticateUserWithOauthArgs = {
  authServer: AuthorizationServer;
  code: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  id: Scalars['String'];
};


export type MutationCreateBookingArgs = {
  input: BookingInput;
  listingId: Scalars['String'];
};


export type MutationCreateConversationArgs = {
  listingId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreateListingArgs = {
  input: VesselTypeInput;
};


export type MutationCreateMessageArgs = {
  conversationId: Scalars['String'];
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
  firstName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterUserWithOauthArgs = {
  firstName: Scalars['String'];
  key: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  key: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateListingArgs = {
  fields: UpdateListingFields;
  listingId: Scalars['String'];
};

export type NoUserWithThisEmail = {
  __typename?: 'NoUserWithThisEmail';
  email: Scalars['String'];
  userExists: Scalars['Boolean'];
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


export type QueryCheckEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetListingUnavailabilityArgs = {
  listingId: Scalars['ID'];
};


export type QueryPopulateConversationArgs = {
  conversationId: Scalars['String'];
};


export type QueryPopulateFormArgs = {
  fields: Array<Scalars['String']>;
  listingId: Scalars['ID'];
};


export type QueryPopulateInboxArgs = {
  inboxType: InboxType;
};


export type QuerySearchListingsArgs = {
  input?: InputMaybe<SearchListingsInput>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryViewListingArgs = {
  listingId: Scalars['ID'];
};

export type Redirect = {
  __typename?: 'Redirect';
  redirect: Scalars['String'];
};

export type RegisterPayload = SuccessResponse | UserExistsWithIncorrectPassword | UserExistsWithOAuth | UserLogin | ValidationError;

export type RegisterUserIwthOauthPayload = SuccessResponse | ValidationError;

export type ResetPasswordPayload = SuccessResponse | ValidationError;

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

export type SendForgotPasswordEmailPayload = ForgotPasswordEmailSuccessResponse | ValidationError;

export enum Status {
  Active = 'active',
  Inactive = 'inactive'
}

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: ConversationMessage;
  updateInbox: InboxMessage;
};


export type SubscriptionNewMessageArgs = {
  conversationId: Scalars['String'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  success: Scalars['Boolean'];
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

export type UserAlreadyExists = {
  __typename?: 'UserAlreadyExists';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
};

export type UserExistsWithIncorrectPassword = {
  __typename?: 'UserExistsWithIncorrectPassword';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
};

export type UserExistsWithOAuth = {
  __typename?: 'UserExistsWithOAuth';
  authorizationServer: AuthorizationServer;
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
};

export type UserExistsWithPassword = {
  __typename?: 'UserExistsWithPassword';
  email: Scalars['String'];
  userExists: Scalars['Boolean'];
};

export type UserLogin = {
  __typename?: 'UserLogin';
  success: Scalars['Boolean'];
};

export type UserMustRegister = {
  __typename?: 'UserMustRegister';
  email: Scalars['String'];
  key: Scalars['String'];
  suggestedFirstName?: Maybe<Scalars['String']>;
};

export type UserNotConfirmed = {
  __typename?: 'UserNotConfirmed';
  email: Scalars['String'];
  userExists: Scalars['Boolean'];
};

export type ValidationError = {
  __typename?: 'ValidationError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export enum VesselType {
  Catamaran = 'catamaran',
  Sailboat = 'sailboat'
}

export type VesselTypeInput = {
  vesselType: VesselType;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: Address;
  AuthenticateUserWithOauthPayload: ResolversTypes['SuccessResponse'] | ResolversTypes['UserAlreadyExists'] | ResolversTypes['UserExistsWithOAuth'] | ResolversTypes['UserMustRegister'];
  AuthorizationServer: AuthorizationServer;
  Booking: ResolverTypeWrapper<Booking>;
  BookingInput: BookingInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CheckEmailPayload: ResolversTypes['NoUserWithThisEmail'] | ResolversTypes['UserExistsWithOAuth'] | ResolversTypes['UserExistsWithPassword'] | ResolversTypes['UserNotConfirmed'] | ResolversTypes['ValidationError'];
  Conversation: ResolverTypeWrapper<Conversation>;
  ConversationMessage: ResolverTypeWrapper<ConversationMessage>;
  ConversationSuccess: ResolverTypeWrapper<ConversationSuccess>;
  CreateConversationResponse: ResolversTypes['ConversationSuccess'] | ResolversTypes['Redirect'];
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Draft: ResolverTypeWrapper<Draft>;
  Error: ResolverTypeWrapper<Error>;
  File: ResolverTypeWrapper<Scalars['File']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ForgotPasswordEmailSuccessResponse: ResolverTypeWrapper<ForgotPasswordEmailSuccessResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Scalars['Image']>;
  InboxMessage: ResolverTypeWrapper<InboxMessage>;
  InboxType: InboxType;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Listing: ResolverTypeWrapper<Listing>;
  ListingInfo: ResolverTypeWrapper<ListingInfo>;
  LoginPayload: ResolversTypes['SuccessResponse'] | ResolversTypes['ValidationError'];
  Me: ResolverTypeWrapper<Me>;
  Mutation: ResolverTypeWrapper<{}>;
  NoUserWithThisEmail: ResolverTypeWrapper<NoUserWithThisEmail>;
  Owner: ResolverTypeWrapper<Owner>;
  PhotoUpdate: PhotoUpdate;
  Query: ResolverTypeWrapper<{}>;
  Redirect: ResolverTypeWrapper<Redirect>;
  RegisterPayload: ResolversTypes['SuccessResponse'] | ResolversTypes['UserExistsWithIncorrectPassword'] | ResolversTypes['UserExistsWithOAuth'] | ResolversTypes['UserLogin'] | ResolversTypes['ValidationError'];
  RegisterUserIwthOauthPayload: ResolversTypes['SuccessResponse'] | ResolversTypes['ValidationError'];
  ResetPasswordPayload: ResolversTypes['SuccessResponse'] | ResolversTypes['ValidationError'];
  SearchListingResult: ResolverTypeWrapper<SearchListingResult>;
  SearchListingsInput: SearchListingsInput;
  SearchListingsResponse: ResolverTypeWrapper<SearchListingsResponse>;
  SearchLocation: ResolverTypeWrapper<SearchLocation>;
  SendForgotPasswordEmailPayload: ResolversTypes['ForgotPasswordEmailSuccessResponse'] | ResolversTypes['ValidationError'];
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  SuccessResponse: ResolverTypeWrapper<SuccessResponse>;
  UpdateListingFields: UpdateListingFields;
  User: ResolverTypeWrapper<User>;
  UserAlreadyExists: ResolverTypeWrapper<UserAlreadyExists>;
  UserExistsWithIncorrectPassword: ResolverTypeWrapper<UserExistsWithIncorrectPassword>;
  UserExistsWithOAuth: ResolverTypeWrapper<UserExistsWithOAuth>;
  UserExistsWithPassword: ResolverTypeWrapper<UserExistsWithPassword>;
  UserLogin: ResolverTypeWrapper<UserLogin>;
  UserMustRegister: ResolverTypeWrapper<UserMustRegister>;
  UserNotConfirmed: ResolverTypeWrapper<UserNotConfirmed>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  VesselType: VesselType;
  VesselTypeInput: VesselTypeInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AuthenticateUserWithOauthPayload: ResolversParentTypes['SuccessResponse'] | ResolversParentTypes['UserAlreadyExists'] | ResolversParentTypes['UserExistsWithOAuth'] | ResolversParentTypes['UserMustRegister'];
  Booking: Booking;
  BookingInput: BookingInput;
  Boolean: Scalars['Boolean'];
  CheckEmailPayload: ResolversParentTypes['NoUserWithThisEmail'] | ResolversParentTypes['UserExistsWithOAuth'] | ResolversParentTypes['UserExistsWithPassword'] | ResolversParentTypes['UserNotConfirmed'] | ResolversParentTypes['ValidationError'];
  Conversation: Conversation;
  ConversationMessage: ConversationMessage;
  ConversationSuccess: ConversationSuccess;
  CreateConversationResponse: ResolversParentTypes['ConversationSuccess'] | ResolversParentTypes['Redirect'];
  Date: Scalars['Date'];
  Draft: Draft;
  Error: Error;
  File: Scalars['File'];
  Float: Scalars['Float'];
  ForgotPasswordEmailSuccessResponse: ForgotPasswordEmailSuccessResponse;
  ID: Scalars['ID'];
  Image: Scalars['Image'];
  InboxMessage: InboxMessage;
  Int: Scalars['Int'];
  Listing: Listing;
  ListingInfo: ListingInfo;
  LoginPayload: ResolversParentTypes['SuccessResponse'] | ResolversParentTypes['ValidationError'];
  Me: Me;
  Mutation: {};
  NoUserWithThisEmail: NoUserWithThisEmail;
  Owner: Owner;
  PhotoUpdate: PhotoUpdate;
  Query: {};
  Redirect: Redirect;
  RegisterPayload: ResolversParentTypes['SuccessResponse'] | ResolversParentTypes['UserExistsWithIncorrectPassword'] | ResolversParentTypes['UserExistsWithOAuth'] | ResolversParentTypes['UserLogin'] | ResolversParentTypes['ValidationError'];
  RegisterUserIwthOauthPayload: ResolversParentTypes['SuccessResponse'] | ResolversParentTypes['ValidationError'];
  ResetPasswordPayload: ResolversParentTypes['SuccessResponse'] | ResolversParentTypes['ValidationError'];
  SearchListingResult: SearchListingResult;
  SearchListingsInput: SearchListingsInput;
  SearchListingsResponse: SearchListingsResponse;
  SearchLocation: SearchLocation;
  SendForgotPasswordEmailPayload: ResolversParentTypes['ForgotPasswordEmailSuccessResponse'] | ResolversParentTypes['ValidationError'];
  String: Scalars['String'];
  Subscription: {};
  SuccessResponse: SuccessResponse;
  UpdateListingFields: UpdateListingFields;
  User: User;
  UserAlreadyExists: UserAlreadyExists;
  UserExistsWithIncorrectPassword: UserExistsWithIncorrectPassword;
  UserExistsWithOAuth: UserExistsWithOAuth;
  UserExistsWithPassword: UserExistsWithPassword;
  UserLogin: UserLogin;
  UserMustRegister: UserMustRegister;
  UserNotConfirmed: UserNotConfirmed;
  ValidationError: ValidationError;
  VesselTypeInput: VesselTypeInput;
};

export type AuthenticateUserWithOauthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticateUserWithOauthPayload'] = ResolversParentTypes['AuthenticateUserWithOauthPayload']> = {
  __resolveType: TypeResolveFn<'SuccessResponse' | 'UserAlreadyExists' | 'UserExistsWithOAuth' | 'UserMustRegister', ParentType, ContextType>;
};

export type BookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  end?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  guests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listing?: Resolver<Maybe<ResolversTypes['ListingInfo']>, ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pricePerNight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  serviceFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckEmailPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckEmailPayload'] = ResolversParentTypes['CheckEmailPayload']> = {
  __resolveType: TypeResolveFn<'NoUserWithThisEmail' | 'UserExistsWithOAuth' | 'UserExistsWithPassword' | 'UserNotConfirmed' | 'ValidationError', ParentType, ContextType>;
};

export type ConversationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  conversationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dates?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interlocutor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  interlocutorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  listing?: Resolver<Maybe<ResolversTypes['ListingInfo']>, ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['ConversationMessage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConversationMessage'] = ResolversParentTypes['ConversationMessage']> = {
  createdDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fromHost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConversationSuccess'] = ResolversParentTypes['ConversationSuccess']> = {
  conversationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userIdOfRecipient?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateConversationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateConversationResponse'] = ResolversParentTypes['CreateConversationResponse']> = {
  __resolveType: TypeResolveFn<'ConversationSuccess' | 'Redirect', ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DraftResolvers<ContextType = any, ParentType extends ResolversParentTypes['Draft'] = ResolversParentTypes['Draft']> = {
  amenities?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  apt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  beds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guests?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photos?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vesselType?: Resolver<Maybe<ResolversTypes['VesselType']>, ParentType, ContextType>;
  zipcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type ForgotPasswordEmailSuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForgotPasswordEmailSuccessResponse'] = ResolversParentTypes['ForgotPasswordEmailSuccessResponse']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ImageScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Image'], any> {
  name: 'Image';
}

export type InboxMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['InboxMessage'] = ResolversParentTypes['InboxMessage']> = {
  conversationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fromHost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interlocutor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  interlocutorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Listing'] = ResolversParentTypes['Listing']> = {
  amenities?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  apt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  beds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  guests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>;
  photos?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vesselType?: Resolver<ResolversTypes['VesselType'], ParentType, ContextType>;
  zipcode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListingInfo'] = ResolversParentTypes['ListingInfo']> = {
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vesselType?: Resolver<Maybe<ResolversTypes['VesselType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  __resolveType: TypeResolveFn<'SuccessResponse' | 'ValidationError', ParentType, ContextType>;
};

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFruit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddFruitArgs, 'fruit'>>;
  authenticateUserWithOauth?: Resolver<ResolversTypes['AuthenticateUserWithOauthPayload'], ParentType, ContextType, RequireFields<MutationAuthenticateUserWithOauthArgs, 'authServer' | 'code'>>;
  confirmEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationConfirmEmailArgs, 'id'>>;
  createBooking?: Resolver<ResolversTypes['Booking'], ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'input' | 'listingId'>>;
  createConversation?: Resolver<ResolversTypes['CreateConversationResponse'], ParentType, ContextType, RequireFields<MutationCreateConversationArgs, 'listingId' | 'text'>>;
  createListing?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateListingArgs, 'input'>>;
  createMessage?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'conversationId' | 'text'>>;
  deleteListing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteListingArgs, 'id'>>;
  login?: Resolver<ResolversTypes['LoginPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  loginAsRandomUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  register?: Resolver<ResolversTypes['RegisterPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'firstName' | 'password'>>;
  registerUserWithOauth?: Resolver<ResolversTypes['RegisterUserIwthOauthPayload'], ParentType, ContextType, RequireFields<MutationRegisterUserWithOauthArgs, 'firstName' | 'key'>>;
  resetPassword?: Resolver<ResolversTypes['ResetPasswordPayload'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'key' | 'newPassword'>>;
  sendForgotPasswordEmail?: Resolver<ResolversTypes['SendForgotPasswordEmailPayload'], ParentType, ContextType, RequireFields<MutationSendForgotPasswordEmailArgs, 'email'>>;
  updateListing?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationUpdateListingArgs, 'fields' | 'listingId'>>;
};

export type NoUserWithThisEmailResolvers<ContextType = any, ParentType extends ResolversParentTypes['NoUserWithThisEmail'] = ResolversParentTypes['NoUserWithThisEmail']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checkEmail?: Resolver<ResolversTypes['CheckEmailPayload'], ParentType, ContextType, RequireFields<QueryCheckEmailArgs, 'email'>>;
  getFruit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getListingUnavailability?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetListingUnavailabilityArgs, 'listingId'>>;
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  populateConversation?: Resolver<ResolversTypes['Conversation'], ParentType, ContextType, RequireFields<QueryPopulateConversationArgs, 'conversationId'>>;
  populateForm?: Resolver<ResolversTypes['Draft'], ParentType, ContextType, RequireFields<QueryPopulateFormArgs, 'fields' | 'listingId'>>;
  populateInbox?: Resolver<Array<ResolversTypes['InboxMessage']>, ParentType, ContextType, RequireFields<QueryPopulateInboxArgs, 'inboxType'>>;
  searchListings?: Resolver<ResolversTypes['SearchListingsResponse'], ParentType, ContextType, RequireFields<QuerySearchListingsArgs, 'limit' | 'offset'>>;
  viewListing?: Resolver<ResolversTypes['Listing'], ParentType, ContextType, RequireFields<QueryViewListingArgs, 'listingId'>>;
  viewUserBookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
};

export type RedirectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redirect'] = ResolversParentTypes['Redirect']> = {
  redirect?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterPayload'] = ResolversParentTypes['RegisterPayload']> = {
  __resolveType: TypeResolveFn<'SuccessResponse' | 'UserExistsWithIncorrectPassword' | 'UserExistsWithOAuth' | 'UserLogin' | 'ValidationError', ParentType, ContextType>;
};

export type RegisterUserIwthOauthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUserIwthOauthPayload'] = ResolversParentTypes['RegisterUserIwthOauthPayload']> = {
  __resolveType: TypeResolveFn<'SuccessResponse' | 'ValidationError', ParentType, ContextType>;
};

export type ResetPasswordPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPasswordPayload'] = ResolversParentTypes['ResetPasswordPayload']> = {
  __resolveType: TypeResolveFn<'SuccessResponse' | 'ValidationError', ParentType, ContextType>;
};

export type SearchListingResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchListingResult'] = ResolversParentTypes['SearchListingResult']> = {
  beds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  guests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  photos?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vesselType?: Resolver<ResolversTypes['VesselType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchListingsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchListingsResponse'] = ResolversParentTypes['SearchListingsResponse']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['SearchListingResult']>, ParentType, ContextType>;
  searchLocation?: Resolver<Maybe<ResolversTypes['SearchLocation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchLocation'] = ResolversParentTypes['SearchLocation']> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendForgotPasswordEmailPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendForgotPasswordEmailPayload'] = ResolversParentTypes['SendForgotPasswordEmailPayload']> = {
  __resolveType: TypeResolveFn<'ForgotPasswordEmailSuccessResponse' | 'ValidationError', ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newMessage?: SubscriptionResolver<ResolversTypes['ConversationMessage'], "newMessage", ParentType, ContextType, RequireFields<SubscriptionNewMessageArgs, 'conversationId'>>;
  updateInbox?: SubscriptionResolver<ResolversTypes['InboxMessage'], "updateInbox", ParentType, ContextType>;
};

export type SuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessResponse'] = ResolversParentTypes['SuccessResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAlreadyExistsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAlreadyExists'] = ResolversParentTypes['UserAlreadyExists']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserExistsWithIncorrectPasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserExistsWithIncorrectPassword'] = ResolversParentTypes['UserExistsWithIncorrectPassword']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserExistsWithOAuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserExistsWithOAuth'] = ResolversParentTypes['UserExistsWithOAuth']> = {
  authorizationServer?: Resolver<ResolversTypes['AuthorizationServer'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserExistsWithPasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserExistsWithPassword'] = ResolversParentTypes['UserExistsWithPassword']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLoginResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLogin'] = ResolversParentTypes['UserLogin']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMustRegisterResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMustRegister'] = ResolversParentTypes['UserMustRegister']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestedFirstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNotConfirmedResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNotConfirmed'] = ResolversParentTypes['UserNotConfirmed']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthenticateUserWithOauthPayload?: AuthenticateUserWithOauthPayloadResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  CheckEmailPayload?: CheckEmailPayloadResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  ConversationMessage?: ConversationMessageResolvers<ContextType>;
  ConversationSuccess?: ConversationSuccessResolvers<ContextType>;
  CreateConversationResponse?: CreateConversationResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Draft?: DraftResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  File?: GraphQLScalarType;
  ForgotPasswordEmailSuccessResponse?: ForgotPasswordEmailSuccessResponseResolvers<ContextType>;
  Image?: GraphQLScalarType;
  InboxMessage?: InboxMessageResolvers<ContextType>;
  Listing?: ListingResolvers<ContextType>;
  ListingInfo?: ListingInfoResolvers<ContextType>;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NoUserWithThisEmail?: NoUserWithThisEmailResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redirect?: RedirectResolvers<ContextType>;
  RegisterPayload?: RegisterPayloadResolvers<ContextType>;
  RegisterUserIwthOauthPayload?: RegisterUserIwthOauthPayloadResolvers<ContextType>;
  ResetPasswordPayload?: ResetPasswordPayloadResolvers<ContextType>;
  SearchListingResult?: SearchListingResultResolvers<ContextType>;
  SearchListingsResponse?: SearchListingsResponseResolvers<ContextType>;
  SearchLocation?: SearchLocationResolvers<ContextType>;
  SendForgotPasswordEmailPayload?: SendForgotPasswordEmailPayloadResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SuccessResponse?: SuccessResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAlreadyExists?: UserAlreadyExistsResolvers<ContextType>;
  UserExistsWithIncorrectPassword?: UserExistsWithIncorrectPasswordResolvers<ContextType>;
  UserExistsWithOAuth?: UserExistsWithOAuthResolvers<ContextType>;
  UserExistsWithPassword?: UserExistsWithPasswordResolvers<ContextType>;
  UserLogin?: UserLoginResolvers<ContextType>;
  UserMustRegister?: UserMustRegisterResolvers<ContextType>;
  UserNotConfirmed?: UserNotConfirmedResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
};

