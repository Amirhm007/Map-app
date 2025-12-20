import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initiaState = {
  user: null,
  isAuthenticated: false,
};
function Reducer(state, action) {
    switch(action.type){
        
    }
}
function Authprovider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    initiaState,
    reducer
  );

  function login(email, password) {}
  function logout() {}
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
}
