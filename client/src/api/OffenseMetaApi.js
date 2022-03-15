import axios from "axios";

const OffenseMetaApi = async (defenseKey) => {
  const data = defenseKey.join(",");
  const options = {
    method: 'POST',
    url: 'https://e7gg.herokuapp.com/https://krivpfvxi0.execute-api.us-west-2.amazonaws.com/dev/getDef',
    data: data
  };

  const offenseMetaData = await axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });

  return offenseMetaData;
};

export default OffenseMetaApi;