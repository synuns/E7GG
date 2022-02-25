import axios from "axios";

const DefenseMetaApi = async () => {
  const defenseMetaData = await axios.post("/api/defense");
  return defenseMetaData.data;
};

export default DefenseMetaApi;