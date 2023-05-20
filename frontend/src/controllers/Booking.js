import axios from "axios";

// Config
import { BASE_URL } from "../utils/config";

export const updateBooking = async (details) => {
  const { data } = await axios.post(BASE_URL + "booking/update/", details);
  return data;
};
export const deleteBooking = async (id) => {
  const { data } = await axios.post(BASE_URL + "booking/delete/", { id, id });
  return data;
};

export const getAllBooking = async () => {
  const { data } = await axios.get(BASE_URL + "booking/");
  return data;
};

export const getAllpendingBookings = async () => {
  const { data } = await axios.get(BASE_URL + "booking/pending/");
  return data;
};
export const getAllOngoingBookings = async () => {
  const { data } = await axios.get(BASE_URL + "booking/ongoing/");
  return data;
};
export const getAllComletedBookings = async () => {
  const { data } = await axios.get(BASE_URL + "booking/completed/");
  return data;
};

export const getSingleBooking = async (bookid) => {
  console.log(bookid);
  const { data } = await axios.get(BASE_URL + "booking/getBook/", {
    id: bookid,
  });
  console.log(data);

  return data;
};
