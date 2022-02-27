import React, { useCallback, useEffect, useState } from 'react';
import DefenseMetaApi from '../api/DefenseMetaApi';
import IdToIcon from '../components/IdToIcon';

function Defense() {
  const [metaData, setMetaData] = useState([]);
  const [heroIcons, setHeroIcons] = useState([]);
  const [error, setError] = useState(null);

  const getDefenseMetaData = useCallback(async () => {
    await DefenseMetaApi()
      .then(res => {
        setMetaData(res.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const getHeroIcons = useCallback(() => {
    const defenseStrs = metaData.slice(0, 20);
    IdToIcon(defenseStrs)
      .then(icons => {
        setHeroIcons(icons);
      })
      .catch(error => {
        setError(error);
      });
  }, [metaData]);

  useEffect(() => {
    getDefenseMetaData();
    getHeroIcons();
  }, [getDefenseMetaData, getHeroIcons]);

  if (error) return <div>error!</div>;
  else{
    return (
      <div className="defenseMeta">
        {heroIcons.map((heroIcon, index) => (
          <div key={index}>
            {heroIcon.map((icon, index) => (
              <img key={index} src={icon} alt="icon" style={{width:70}} />
            ))}
            <div className="result">
              {/* <div className="win">{metaData[index].w}</div>
              <div className="draw">{metaData[index].d}</div>
              <div className="lose">{metaData[index].lose}</div> */}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Defense;