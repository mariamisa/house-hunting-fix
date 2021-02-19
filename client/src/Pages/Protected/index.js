import React from 'react';

import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { ReactComponent as Image } from '../../Utils/images/security.svg';

import { LOGIN_PAGE } from '../../Utils/routes.constant';

import Button from '../../Components/Button';

import useStyles from './style';

function NotFound() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(LOGIN_PAGE);
  };
  return (
    <div className={classes.root}>
      <Typography color="primary" className={classes.num}>
        401
      </Typography>
      <Typography className={classes.text} color="primary">
        Protected Page
      </Typography>
      <Image className={classes.img} />
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        onClick={handleClick}
      >
        BACK TO Login
      </Button>
    </div>
  );
}

export default NotFound;
