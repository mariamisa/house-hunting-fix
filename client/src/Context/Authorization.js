import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    (async () => {
      try {
        setError(null);
        await Axios('/api/v1/is-auth');
        if (isCurrent) {
          setIsAuth(true);
          setAuthLoading(false);
        }
      } catch (err) {
        setAuthLoading(false);
        if (err.response.status === 401) {
          setIsAuth(false);
        } else {
          setError(
            err.response ? err.response.data.message : 'internal server error'
          );
        }
      }
    })();
    return () => {
      isCurrent = false;
    };
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ setIsAuth, isAuth, authLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
export default AuthProvider;
