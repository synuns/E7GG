import { Box, Container, Tooltip, Typography, Zoom } from '@mui/material';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import DefenseMetaApi from '../api/DefenseMetaApi';
import ErrorBoundary from '../components/ErrorBoundary';
import IdToIcon from '../utils/IdToIcon';
import MetaRecord from '../components/MetaRecord';
import DefenseIcon from '../images/battle_pvp_icon_def.png';
import ErrorAlert from '../components/ErrorAlert';

function Defense() {
  const [metaData, setMetaData] = useState([]);
  const [heroIcons, setHeroIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const type = 'defense';

  const getDefenseMetaData = useCallback(async () => {
    setLoading(true);
    await DefenseMetaApi()
      .then(res => {
        setMetaData(res.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const getHeroIcons = useCallback(async() => {
    const defenseStrs = metaData.slice(0, 20);
    await IdToIcon(type, defenseStrs)
      .then(icons => {
        setHeroIcons(icons);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [metaData]);

  useEffect(() => {
    getDefenseMetaData();
  }, [getDefenseMetaData])

  useEffect(() => {
    getHeroIcons();
    return () => setLoading(false);
  }, [getHeroIcons]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          minWidth: '400px',
          maxWidth: '600px',
        }}
      >
        { error && <ErrorAlert /> }
        <Tooltip
          title={
            <Fragment>
              <Typography>Defense Meta</Typography>
              <span>Top 20 most common defense meta in past 14 days</span>
            </Fragment>
          }
          TransitionComponent={Zoom}
          enterDelay={500} leaveDelay={200}
          followCursor
        >
          <Box id="top" sx={{ mb: 2, display: 'inline-flex', justifyContent: 'flex-start', alignContent: 'baseline', mt: 9 }}>
              <img src={DefenseIcon} alt="offense" height="48"/>
              <Typography variant="h3" sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'block' } }} >
                DEFENSE META
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', display: { sx: 'block', md: 'none' } }} >
                DEFENSE
              </Typography>
          </Box>
        </Tooltip>
        <ErrorBoundary>
          {loading ? 
            <Loading /> :
            heroIcons.map((heroIcon, index) => (
              <MetaRecord
                type={type}
                key={index}
                icons={heroIcon}
                records={metaData[index]}
              />
            ))
          }
        </ErrorBoundary>
      </Box>
    </Container>
  );
}

export default Defense;