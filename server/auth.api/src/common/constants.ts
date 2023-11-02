export const AuthResolverPaths = {
  AUTH_RESOLVER: 'Auth',
  AUTH_LOGIN_PATH: 'login',
  AUTH_REFRESH_TOKEN_PATH: 'refreshToken',
};

export const UserResolverPaths = {
  USER_RESOLVER: 'User',
  USER_PATH: 'user',
  USERS_PATH: 'users',
  USER_FORGOTPASSWORD_PATH: 'forgotPassword',
  USER_RESETPASSWORD_PATH: 'resetPassword',
  USER_CREATE_PATH: 'createUser',
  USER_UPDATE_PATH: 'updateUser',
  USER_PERMISSIONS_ADD_PATH: 'addPermissions',
  USER_PERMISSIONS_REMOVE_PATH: 'removePermissions',
};

export const AuthErrorMessages = {
  NO_LOGIN: 'Could not log-in with the provided credentials',
  NO_AUTH_BY_PERMISSIONS:
    'Could not authenticate with token or user does not have permissions',
  NO_AUTH_BY_TOKEN: 'Could not authenticate with token',
  NO_AUTH_BY_CREDENTIALS: 'Could not log-in with the provided credential',
};

export const DbErrorMessages = {
  DB_UNKNOWN: 'Unknown database error',
  DB_CONFIG: 'Database configuration error',
  DB_MISSING: 'Database config is missing',
};
