import api from "./api.js";

export const getMerk = async () => {
  const res = await api.get("/merk");
  return res.data;
};

export const createMerk = async (data) => {
  const res = await api.post("/merk", data);
  return res.data;
};

export const updateMerk = async (id, data) => {
  const res = await api.put(`/merk/${id}`, data);
  return res.data;
};

export const deleteMerk = async (id) => {
  const res = await api.delete(`/merk/${id}`);
  return res.data;
};
