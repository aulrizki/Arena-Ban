import { mockItems } from "../data/mockItems";

// simulasi ambil data dari server
export const getItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockItems), 300);
  });
};
