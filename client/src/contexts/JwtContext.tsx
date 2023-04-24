import { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { authApi } from 'src/api/auth';
import type { Admin, AdminBody } from 'src/types/admin';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: Admin | null;
}

export interface AuthContextValue extends State {
  platform: 'JWT';
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (user: AdminBody) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: Admin | null;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    user: Admin;
  };
};

type LogoutAction = {
  type: ActionType.LOGOUT;
};

type RegisterAction = {
  type: ActionType.REGISTER;
  payload: {
    user: Admin;
  };
};

type Action =
  | InitializeAction
  | LoginAction
  | LogoutAction
  | RegisterAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
};

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const accessToken = globalThis.localStorage.getItem('accessToken');

        if (accessToken) {
          const { organization, ...user } = await authApi.me();

          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            }
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          }
        });
      }
    };

    initialize();
  }, []);

  const loginUser = async (email: string, password: string): Promise<void> => {
    const { token, ...user } = await authApi.login(email, password);

    localStorage.setItem('accessToken', token);

    dispatch({
      type: ActionType.LOGIN,
      payload: {
        user,
      }
    });
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('accessToken');
    dispatch({ type: ActionType.LOGOUT });
  };

  const registerUser = async (
    userData: AdminBody
  ): Promise<void> => {
    const { token, ...user } = await authApi.register(userData);
    localStorage.setItem('accessToken', token);

    if (user) {
      dispatch({
        type: ActionType.REGISTER,
        payload: {
          user,
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        logout,
        login: loginUser,
        register: registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
