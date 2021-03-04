import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Container, Divider, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { HOUSES } from '../../Utils/routes.constant';
import CardContainer from '../../Components/CardContainer';
import Search from '../../Components/SearchBar';
import Loading from '../../Components/Loading';
import { db } from '../../Utils/firebase/config';

import useStyles from './style';

function Landing() {
  const classes = useStyles();
  const history = useHistory();

  const [houses, setHouses] = useState([]);
  const [newHouses, setNewHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFire, setLoadingFire] = useState(true);
  const [errorMsg, setErrorMsg] = useState({});
  const [housesFirebase, setHousesFirebase] = useState([]);

  const handleSearchBar = () => {
    history.push(HOUSES);
  };
  const fetchingData = async (isCurrent, { url, limit, skip }, cb) => {
    try {
      const { data } = await Axios.get(
        `${url}?limit=${limit || 6}&skip=${skip || 0}`
      );
      if (isCurrent) {
        cb(data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMsg('internal server error');
    }
  };

  const getHousesFromFirebase = async (isCurrent) => {
    try {
      if (isCurrent) {
        const { docs } = await db.collection('houses').get();
        const getAllHouses = await Promise.all(
          docs.map(async (doc) => {
            const dataObj = await doc.data();
            return dataObj;
          })
        );
        setHousesFirebase(getAllHouses);
        setLoadingFire(false);
      }
    } catch (err2) {
      setErrorMsg('firebases error');
    }
  };

  useEffect(() => {
    let isCurrent = true;
    getHousesFromFirebase(isCurrent);
    fetchingData(
      isCurrent,
      { url: '/api/v1/houses', limit: 6, skip: 0 },
      setHouses
    );
    fetchingData(
      isCurrent,
      { url: '/api/v1/newest-houses', limit: 6, skip: 0 },
      setNewHouses
    );
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <>
      <div className={classes.header}>
        <div className={classes.searchBoxH}>
          <Typography variant="h2" className={classes.headerTitle}>
            Find your perfect house
          </Typography>
          <Search onClick={handleSearchBar} />
        </div>
      </div>
      <Container maxWidth="lg" className={classes.root}>
        {errorMsg.message ? (
          <div className={classes.alertContainer}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorMsg.message}
            </Alert>
          </div>
        ) : (
          <>
            <div className={classes.housesSection}>
              <Typography variant="h2" className={classes.sectionTitle}>
                Top-rated
              </Typography>
              {loading ? (
                <div className={classes.spinner}>
                  <Loading />
                </div>
              ) : (
                <CardContainer
                  houses={houses.sort((a, b) => a.rating - b.rating)}
                />
              )}
            </div>
            <Divider className={classes.divider} />
            <div className={classes.housesSection}>
              <Typography variant="h2" className={classes.sectionTitle}>
                Newest
              </Typography>
              {loading ? (
                <div className={classes.spinner}>
                  <Loading />
                </div>
              ) : (
                <CardContainer houses={newHouses} />
              )}
            </div>
            <Divider className={classes.divider} />
            <div className={classes.housesSection}>
              <Typography variant="h2" className={classes.sectionTitle}>
                houses on firebase
              </Typography>
              {loadingFire ? (
                <div className={classes.spinner}>
                  <Loading />
                </div>
              ) : (
                <CardContainer houses={housesFirebase} />
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default Landing;
