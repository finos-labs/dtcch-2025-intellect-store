// This file is auto-generated by @hey-api/openapi-ts

export type BearerResponse = {
  access_token: string;
  token_type: string;
};

export type Body_auth_reset_forgot_password = {
  email: string;
};

export type Body_auth_reset_reset_password = {
  token: string;
  password: string;
};

export type Body_auth_verify_request_token = {
  email: string;
};

export type Body_auth_verify_verify = {
  token: string;
};

export type ErrorModel = {
  detail:
    | string
    | {
        [key: string]: string;
      };
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type login = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};

export type RepositoryCreate = {
  name: string;
  link: string;
  last_updated?: string | null;
  description?: string | null;
  pull_request_link?: string | null;
};

export type RepositoryRead = {
  name: string;
  link: string;
  last_updated?: string | null;
  description?: string | null;
  pull_request_link?: string | null;
  id: string;
  user_id: string;
};

export type SourceCreate = {
  name: string;
  link: string;
  last_updated?: string | null;
  description?: string | null;
};

export type SourceRead = {
  name: string;
  link: string;
  last_updated?: string | null;
  description?: string | null;
  id: string;
  user_id: string;
};

export type SourceUpdate = {
  name?: string | null;
  link?: string | null;
  last_updated?: string | null;
  description?: string | null;
};

export type UserCreate = {
  email: string;
  password: string;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
};

export type UserRead = {
  id: string;
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
};

export type UserUpdate = {
  password?: string | null;
  email?: string | null;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type AuthJwtLoginData = {
  body: login;
};

export type AuthJwtLoginResponse = BearerResponse;

export type AuthJwtLoginError = ErrorModel | HTTPValidationError;

export type AuthJwtLogoutResponse = unknown;

export type AuthJwtLogoutError = unknown;

export type RegisterRegisterData = {
  body: UserCreate;
};

export type RegisterRegisterResponse = UserRead;

export type RegisterRegisterError = ErrorModel | HTTPValidationError;

export type ResetForgotPasswordData = {
  body: Body_auth_reset_forgot_password;
};

export type ResetForgotPasswordResponse = unknown;

export type ResetForgotPasswordError = HTTPValidationError;

export type ResetResetPasswordData = {
  body: Body_auth_reset_reset_password;
};

export type ResetResetPasswordResponse = unknown;

export type ResetResetPasswordError = ErrorModel | HTTPValidationError;

export type VerifyRequestTokenData = {
  body: Body_auth_verify_request_token;
};

export type VerifyRequestTokenResponse = unknown;

export type VerifyRequestTokenError = HTTPValidationError;

export type VerifyVerifyData = {
  body: Body_auth_verify_verify;
};

export type VerifyVerifyResponse = UserRead;

export type VerifyVerifyError = ErrorModel | HTTPValidationError;

export type UsersCurrentUserResponse = UserRead;

export type UsersCurrentUserError = unknown;

export type UsersPatchCurrentUserData = {
  body: UserUpdate;
};

export type UsersPatchCurrentUserResponse = UserRead;

export type UsersPatchCurrentUserError =
  | ErrorModel
  | unknown
  | HTTPValidationError;

export type UsersUserData = {
  path: {
    id: string;
  };
};

export type UsersUserResponse = UserRead;

export type UsersUserError = unknown | HTTPValidationError;

export type UsersPatchUserData = {
  body: UserUpdate;
  path: {
    id: string;
  };
};

export type UsersPatchUserResponse = UserRead;

export type UsersPatchUserError = ErrorModel | unknown | HTTPValidationError;

export type UsersDeleteUserData = {
  path: {
    id: string;
  };
};

export type UsersDeleteUserResponse = void;

export type UsersDeleteUserError = unknown | HTTPValidationError;

export type ReadRepositoriesResponse = Array<RepositoryRead>;

export type ReadRepositoriesError = unknown;

export type CreateRepositoryData = {
  body: RepositoryCreate;
};

export type CreateRepositoryResponse = RepositoryRead;

export type CreateRepositoryError = HTTPValidationError;

export type DeleteRepositoryData = {
  path: {
    repository_id: string;
  };
};

export type DeleteRepositoryResponse = unknown;

export type DeleteRepositoryError = HTTPValidationError;

export type ReadRepositoryData = {
  path: {
    repository_id: string;
  };
};

export type ReadRepositoryResponse = RepositoryRead;

export type ReadRepositoryError = HTTPValidationError;

export type ReadSourcesResponse = Array<SourceRead>;

export type ReadSourcesError = unknown;

export type CreateSourceData = {
  body: SourceCreate;
};

export type CreateSourceResponse = SourceRead;

export type CreateSourceError = HTTPValidationError;

export type UpdateSourceData = {
  body: SourceUpdate;
  path: {
    source_id: string;
  };
};

export type UpdateSourceResponse = SourceRead;

export type UpdateSourceError = HTTPValidationError;

export type DeleteSourceData = {
  path: {
    source_id: string;
  };
};

export type DeleteSourceResponse = {
  [key: string]: unknown;
};

export type DeleteSourceError = HTTPValidationError;
