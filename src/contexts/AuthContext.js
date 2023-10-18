import { createContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import apiService from "../app/apiService";

//initialize the state
const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

//declare the context and set initial values
const AuthContext = createContext({ ...initialState });

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const RECOVER_SUCCESS = "AUTH.RECOVER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

//function reducer
const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case UPDATE_PROFILE:
      const { name } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          name,
        },
      };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatedProfile = useSelector((state) => state.user.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        /*
        console.log("local storage " + localStorage.getItem("accessToken"));

        console.log("isValidToken " + isValidToken(accessToken));

        console.log("user" + state.user);
        */

        if (accessToken) {
          //if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/auth/me");
          const user = response.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          setSession(null);

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        setSession(null);

        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (updatedProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
  }, [updatedProfile]);

  const login = async ({ email, password }, callback) => {
    console.log("running login AuthContext ");
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    console.log("local storage " + localStorage.getItem("accessToken"));

    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    callback();
  };

  const register = async ({ username, email, password }, callback) => {
    const response = await apiService.post("/auth/register", {
      username,
      email,
      password,
    });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({ type: REGISTER_SUCCESS, payload: { user } });
    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
