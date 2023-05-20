import axios from "axios";

// Config
import { BASE_URL } from "../utils/config";

export const createVehicle = async (details) => {
  const { data } = await axios.post(BASE_URL + "vehicle/create/", details);
  return data;
};

export const getSingleVehicle = async (id) => {
  const { data } = await axios.post(BASE_URL + "vehicle/getselectedVehicle/", {
    id: id,
  });
  return data;
};

export const updateVehicle = async (details) => {
  console.log(details);
  const { data } = await axios.post(BASE_URL + "vehicle/update/", details);
  return data;
};
