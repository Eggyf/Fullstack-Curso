import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
  return axios.get(`${baseUrl}/api/all`);
};

const create = (newObject) => {
  return axios.post(`${baseUrl}/api/all`, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteCountry = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  deleteCountry,
};
