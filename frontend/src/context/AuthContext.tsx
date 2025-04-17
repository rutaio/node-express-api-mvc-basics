// Auth Context - bus atsakingas uz zmogaus autentifikacija, laikys funkcijas bei state

import { createContext, useState, useEffect } from 'react';
import { API_URL } from '../constants/global';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  token: null,
  error: null,
  login: async () => {},
  register: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // REGISTER
  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      setToken(response.data.access_token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Klaida registruojant vartotoja');
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      setToken(response.data.access_token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Klaida jungiant vartotoja');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`${API_URL}/auth/user`, config);
          setIsAuthenticated(true);
          setUser(response.data);
        } catch (error) {
          console.log(error);
          localStorage.removeItem('access_token');
          setToken(null);
          setIsAuthenticated(false);
          setError('Klaida gaunant vartotojo informacija');
        }
      }
    };

    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        token,
        error,
        user,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
