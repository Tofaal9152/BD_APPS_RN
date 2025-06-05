type AuthResponse = {
  success: boolean;
  message: string;
};
export type AuthState = {
  token: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
  isAuthenticated: () => void;
  getToken: () => Promise<string | null>;
};
