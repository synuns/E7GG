import axios from "axios";

const HeroDataApi = async () => {
  const heroData = await axios.get("/api/hero");
  return heroData.data;
};

export default HeroDataApi;