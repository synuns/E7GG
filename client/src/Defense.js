import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Defense() {
  const [metaData, setMetaData] = useState([]);
  const [size, setSize] = useState(0);
  // const [error, setError] = useState(null);

  const getMetaData = async () => {
    await axios.post("/api/defense")
      .then((res) => {
        setMetaData(res.data);
        setSize(res.totalSize);
      });
  };

  useEffect(() => {
    getMetaData();
  }, []);

  // console.log(metaData);

  return (
    <div>
      <div>This is Defense Page</div>
    </div>
  );
}

export default Defense;