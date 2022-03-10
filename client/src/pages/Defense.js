import React, { useCallback, useEffect, useState } from 'react';
import DefenseMetaApi from '../api/DefenseMetaApi';
import ErrorBoundary from '../components/ErrorBoundary';
import IdToIcon from '../components/IdToIcon';
import MetaRecord from '../components/MetaRecord';

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

  if (error !== null) return <div>error!</div>;
  return (
    <div className="defenseMeta">
      <ErrorBoundary>
        {loading ? 
          <span>Loading...</span> :
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
    </div>
  );
}

export default Defense;