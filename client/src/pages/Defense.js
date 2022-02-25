import React, { useEffect, useState } from 'react';
import DefenseMetaApi from '../api/DefenseMetaApi';
import IdToIcon from '../components/IdToIcon';

function Defense() {
  const [metaData, setMetaData] = useState([]);
  const [heroIcons, setHeroIcons] = useState([]);
  const [error, setError] = useState(null);

  const getHeroIcons = () => {
    const defenseStrs = metaData.slice(0, 20);
    const icons = IdToIcon(defenseStrs)
      .then(icons => {
        // [fix] icons get nothing...
        console.log(icons);
        // setHeroIcons(icons)
      });
    // console.log(icons);
    // setHeroIcons([...heroIcons, icons]);
  }

  useEffect(() => {
    DefenseMetaApi()
      .then(res => {
        setMetaData(res.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  // [fix] getHeroIcons call after useEffect
  getHeroIcons();

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