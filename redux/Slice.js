import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "load",
  initialState: { addToCartLoading: false,authToken:null },
  reducers: {
    setAddCartLoading: (state, action) => {
        state.addToCartLoading = action.payload; // Update state based on the payload
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload; // Update authToken based on the payload
    },
  },
});

export const { setAddCartLoading,setAuthToken } = Slice.actions;
export default Slice.reducer;
