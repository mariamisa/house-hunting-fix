import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HOME_PAGE } from '../../Utils/routes.constant';

import AuthContext from '../../Context/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuth, authLoading } = useContext(AuthContext);
  return (
    <Route {...rest}>
      {isAuth ? !authLoading && <Component /> : <Redirect to={HOME_PAGE} />}
    </Route>
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
