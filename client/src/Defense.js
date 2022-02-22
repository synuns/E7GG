import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Defense() {
  const [metaData, setMetaData] = useState([]);
  // const [error, setError] = useState(null);

  const getMetaData = async () => {
    await axios
      .get("/api")
      .then((res) =>
        setMetaData(res.data.test)
      );
  };

  useEffect(() => {
    getMetaData();
  }, []);

  console.log(metaData);

  return (
    <div>
      <div>This is Defense Page</div>
    </div>
  );
}

export default Defense;