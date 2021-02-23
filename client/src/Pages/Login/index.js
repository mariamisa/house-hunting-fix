import React, { useContext, useState } from 'react';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';

import validationSchema from '../../Utils/validations/login';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { ReactComponent as SearchImg } from '../../Utils/images/house_searching.svg';
import Loading from '../../Components/Loading';

import { AuthContext } from '../../Context/Authorization';
import useStyles from './style';

function Login() {
  const classes = useStyles();
  const { setIsAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const clear = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const userData = {
        email,
        password,
      };

      await validationSchema.validate(userData, {
        abortEarly: false,
      });
      await Axios.post('/api/v1/login', userData);
      clear();
      setIsLoading(false);
      setIsAuth(true);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.errors[0]);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.img}>
        <SearchImg className={classes.logo} width="250" />
      </div>
      <div className={classes.formSection}>
        <Typography color="primary" className={classes.header}>
          Sign In
        </Typography>
        <form className={classes.form}>
          <Input
            className={classes.input}
            variant="outlined"
            onChange={handleEmail}
            value={email}
            type="email"
            label="Email"
            required
          />
          <Input
            type="password"
            className={classes.input}
            variant="outlined"
            onChange={handlePassword}
            value={password}
            label="Password"
            required
          />
          {error && (
            <Alert className={classes.alert} severity="error">
              {error}
            </Alert>
          )}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {isLoading ? <Loading color="secondary" /> : 'LogIn'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
