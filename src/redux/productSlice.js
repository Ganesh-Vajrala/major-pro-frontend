import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: null,
  reviews: {},
  plainComments: [],
  productSummary:null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setReviewsForModel: (state, action) => {
      const { model, reviews } = action.payload;
      state.reviews = {
        [model]: [ ...reviews]
      };
    },
    setPlainComments: (state, action) => {
      state.plainComments = action.payload;
    },
    setSummerization: (state,action) =>{
      state.productSummary = action.payload;
    }
  },
});

export const { setProductDetails, setReviewsForModel, setPlainComments, setSummerization } = productSlice.actions;
export default productSlice.reducer;
