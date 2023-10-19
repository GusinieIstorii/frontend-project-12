import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState();

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    if (!userId) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [userId]);

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;
export { AuthProvider, AuthContext };
