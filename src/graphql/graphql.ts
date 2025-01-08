export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AllNotes = {
  __typename?: 'AllNotes';
  data: Array<Note>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type LoginData = {
  __typename?: 'LoginData';
  token: Scalars['String']['output'];
  user: User;
};

export type LoginUserModel = {
  __typename?: 'LoginUserModel';
  data?: Maybe<LoginData>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AddNote: Response;
  deleteNote: Response;
  registerUser: LoginUserModel;
  switchIsImportant: Response;
  uploadImage: UploadImage;
};


export type MutationAddNoteArgs = {
  notes: Array<NoteInput>;
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSwitchIsImportantArgs = {
  noteId: Scalars['String']['input'];
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isImportant: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type NoteInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  isImportant?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllNotes: AllNotes;
  loginUser: LoginUserModel;
};


export type QueryGetAllNotesArgs = {
  getImportant?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLoginUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type UploadImage = {
  __typename?: 'uploadImage';
  data: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AddNoteMutationVariables = Exact<{
  notes: Array<NoteInput> | NoteInput;
}>;


export type AddNoteMutation = { __typename?: 'Mutation', AddNote: { __typename?: 'Response', message: string, success: boolean } };

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['String']['input'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: { __typename?: 'Response', message: string, success: boolean } };

export type SwitchIsImportantMutationVariables = Exact<{
  noteId: Scalars['String']['input'];
}>;


export type SwitchIsImportantMutation = { __typename?: 'Mutation', switchIsImportant: { __typename?: 'Response', message: string, success: boolean } };

export type GetAllNotesQueryVariables = Exact<{
  getImportant?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllNotesQuery = { __typename?: 'Query', getAllNotes: { __typename?: 'AllNotes', message: string, success: boolean, data: Array<{ __typename?: 'Note', id: string, title: string, description: string, isImportant: boolean, userId: string, createdAt: any, updatedAt: any }> } };

export type RegisterUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'LoginUserModel', message: string, success: boolean, data?: { __typename?: 'LoginData', token: string, user: { __typename?: 'User', id: string, name: string, imageUrl?: string | null } } | null } };

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'uploadImage', message: string, success: boolean, data: string } };

export type LoginUserQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'LoginUserModel', message: string, success: boolean, data?: { __typename?: 'LoginData', token: string, user: { __typename?: 'User', id: string, name: string, imageUrl?: string | null } } | null } };
