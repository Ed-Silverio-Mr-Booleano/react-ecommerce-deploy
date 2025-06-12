import { api } from "../api";

const getProducts = async (): Promise<any[]> => {
  try {
    const response = await api.get("/produtos");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const getCategories = async (): Promise<any[]> => {
  try {
    const response = await api.get("/categorias");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
const addSells = async (sell: any) => {
  try {
    const response = await api.post("/vendas", sell);
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

export { getProducts, addSells, getCategories };
