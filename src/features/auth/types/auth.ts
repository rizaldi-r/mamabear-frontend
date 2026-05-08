export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms: boolean;
}

export interface ResetPasswordPayload {
   email: string;
}

export type AuthLayoutProps = {
   children: React.ReactNode
   title: string
   subtitle: string
   backToHref?: string
   backToLabel?: string
   showImage?: boolean
 }