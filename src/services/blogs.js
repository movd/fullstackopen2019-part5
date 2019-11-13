import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  console.log(res.data);
  return res.data;
};

export default { getAll };
