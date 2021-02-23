import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HOME_PAGE } from '../../Utils/routes.constant';

import { AuthContext } from '../../Context/Authorization';

function LoggedOutRoutes({ component: Component, restricted, ...rest }) {
  const { isAuth, authLoading } = useContext(AuthContext);
  if (!isAuth && restricted && !authLoading) {
    return (
      <Route {...rest}>
        <Component />
      </Route>
    );
  }
  return <Redirect to={HOME_PAGE} />;
}
LoggedOutRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  restricted: PropTypes.bool.isRequired,
};

export default LoggedOutRoutes;
