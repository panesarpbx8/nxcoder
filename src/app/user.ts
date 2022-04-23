export interface User extends UserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface UserData {
  saved: string[];
  isPro: boolean;
}

export interface SignUpData extends LoginData {
  displayName: string;
}

export interface LoginData {
  email: string;
  password: string;
}
