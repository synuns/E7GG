import axios from "axios";

const HeroDataApi = async () => {
  const options = {
    method: 'GET',
    url: 'https://e7gg.herokuapp.com/https://e7-optimizer-game-data.s3-accelerate.amazonaws.com/herodata.json?',
  };

  const heroData = await axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
    
  return heroData;
};

export default HeroDataApi;