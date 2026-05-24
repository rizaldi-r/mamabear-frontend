export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string
}

export type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backToHref?: string;
  backToLabel?: string;
  showImage?: boolean;
};
