import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from '../../Context/Authorization';
import { LOGIN_PAGE } from '../../Utils/routes.constant';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuth, authLoading } = useContext(AuthContext);
  if (isAuth && !authLoading) {
    return (
      <Route {...rest}>
        <Component />
      </Route>
    );
  }
  return <Redirect to={LOGIN_PAGE} />;
}
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
