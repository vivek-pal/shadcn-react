// const { createSlice } = require("@reduxjs/toolkit");
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentStep: 1,
  formData: {
    bussinessClasss: [
      { subClassCode: "", numberToParticipants: "" }
    ]
  },
};
const mainSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
  },
});
export const getAccount = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1",
      { withCredentials: true }
    );
    const responseData = {
      name: "John",
      address: "U.S. Naval Research Laboratory, USA",
      city: "California",
      state: "Los Angeles",
      zip: "90001",
      effectiveDate: new Date("2024-07-16"),
      expirationDate: new Date("2025-06-18"),
    };
    console.log("form load...");
    dispatch(mainSlice.actions.updateFormData(responseData));
  } catch (error) {
    console.log(error.response.data.message);
  }
};
export const getSummary = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1",
      { withCredentials: true }
    );
    const responseData = {
      limit: "123",
      deductible: "25",
      coverageFactor: "Primary",
      premium: "100",
      premium1: "50",
      written: "150",
      change: "200",
    };
    console.log("form load...");
    dispatch(mainSlice.actions.updateFormData(responseData));
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const addNew = (data) => async (dispatch) => {
  // dispatch(mainSlice.actions.addNewSkillRequest());
  try {
    const response = await axios.post(
      "https://localhost:8000/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);
    console.log(response.data.message);
    // dispatch(mainSlice.actions.addNewSkillSuccess(response.data.message));
    dispatch(mainSlice.actions.clearAllErrors());
  } catch (error) {
    // dispatch(mainSlice.actions.addNewSkillFailed(error.response.data.message));
  }
};

export const { setCurrentStep, updateFormData } = mainSlice.actions;
export default mainSlice.reducer;
