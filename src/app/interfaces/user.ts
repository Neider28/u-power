export interface UserI {
  googleId: string;
  email: string;
  personalId: string;
  status: string;
  name: string;
  picture: string;
  _id: string;
}

export interface UpdateUserI {
  personalId: string;
}
