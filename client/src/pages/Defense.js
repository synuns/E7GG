import React, { useEffect, useState } from 'react';
import DefenseMetaApi from '../api/DefenseMetaApi';
import IdToIcon from '../components/IdToIcon';

function Defense() {
  const [metaData, setMetaData] = useState([]);
  const [heroIcons, setHeroIcons] = useState([]);
  const [error, setError] = useState(null);

  const getDefenseMetaData = async () => {
    await DefenseMetaApi()
      .then(res => {
        setMetaData(res.data);
      })
      .catch(error => {
        setError(error);
      });
  };

  const getHeroIcons = () => {
    const defenseStrs = metaData.slice(0, 20);
    IdToIcon(defenseStrs)
      .then(icons => {
        setHeroIcons(icons);
      })
      .catch(error => {
        setError(error);
      });
  };

  useEffect(() => {
    getDefenseMetaData();
    getHeroIcons();
  }, []);

  if (error) return <div>error!</div>;
  else{
    return (
      <div>
        <div>This is Defense Page</div>
      </div>
    );
  }
}

export default Defense;