import axios from "axios";

const DefenseMetaApi = async () => {
  const options = {
    url: 'https://e7gg.herokuapp.com/https://krivpfvxi0.execute-api.us-west-2.amazonaws.com/dev/getMeta',
    dataType: "text",
    method: 'POST',
  };

  const defenseMetaData = await axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });

  return defenseMetaData;
};

export default DefenseMetaApi;