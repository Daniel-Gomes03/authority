export interface IUser {
  id: string
  name: string
}

export interface ISignUp {
  name: string
  email: string
  password: string
}

export interface ISignIn {
  email: string
  password: string
}
