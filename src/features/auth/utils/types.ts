import { type Models } from "appwrite";

interface User extends Models.User<Models.Preferences> {}

interface ILoginData {
  email: string;
  password: string;
  username?: string; // Optional, in case you want to include username for login
}

interface IRegisterData {
  username?: string;
  email: string;
  password: string;
}

interface IResetPasswordData {
  email: string;
}

type IAppwriteError = {
  message: string;
  code: number;
  type: string;
  version: string;
};

// interface user {
//     $id: string;
//     $createdAt: string;
//     $updatedAt: string;
//     userId: string;
//     expire: string;
//     provider: string;
//     providerUid: string;
//     providerAccessToken: string;
//     providerAccessTokenExpiry: string;
//     providerRefreshToken: string;
//     ip: string;
//     osCode: string;
//     osName: string;
//     osVersion: string;
//     clientType: string;
//     clientCode: string;
//     clientName: string;
//     clientVersion: string;
//     clientEngine: string;
//     clientEngineVersion: string;
//     deviceName: string;
//     deviceBrand: string;
//     deviceModel: string;
//     countryCode: string;
//     countryName: string;
//     current: boolean;
//     factors: string[];
//     secret: string;
//     mfaUpdatedAt: string;
// }

interface VerifyEmailData {
  userId: string;
  secret: string;
}

export type {
  ILoginData as LoginData,
  IRegisterData as RegisterData,
  IResetPasswordData as ResetPasswordData,
  User,
  VerifyEmailData,
  IAppwriteError as AppwriteError,
};
