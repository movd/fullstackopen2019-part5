import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log("set token!");
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async blogObject => {
  const config = { headers: { Authorization: token } };

  const res = await axios.post(baseUrl, blogObject, config);
  return res.data;
};

const like = async (id, updateBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, updateBlog);
  return res.data;
};

const remove = async blogObject => {
  const config = { headers: { Authorization: token } };
  const res = await axios.delete(`${baseUrl}/${blogObject.id}`, config);
  return res.data;
};

export default { getAll, setToken, like, create, remove };
