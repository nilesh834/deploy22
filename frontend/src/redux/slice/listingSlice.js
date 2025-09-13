import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [], // default empty array, avoids null checks
};

export const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
  },
});

export const { setListings } = listingSlice.actions;

export default listingSlice.reducer;
