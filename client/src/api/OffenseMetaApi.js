import axios from "axios";

const OffenseMetaApi = async (defenseKey) => {
  const data = defenseKey.join(",");
  const offenseMetaData = await axios.post("/api/offense", { data });
  return offenseMetaData.data;
};

export default OffenseMetaApi;