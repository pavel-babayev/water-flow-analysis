import axios from "axios";
import { API_URL } from "../constants";

export const getTabs = async () => {
  const res = await axios.get(`${API_URL}/get-tabs`);

  return res.data.tabs;
}

export const getGridData = async (gId: number) => {
  const res = await axios.get(`${API_URL}/get-grid-data?gId=${gId}`);

  return res.data.grid;
}

export const getQualifyingCells = async (gId: number) => {
  const res = await axios.get(`${API_URL}/qualifying-cells?gId=${gId}`);

  return res.data.qualifies;
}