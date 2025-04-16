import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типизация для элемента данных (можешь подставить свой тип)
interface IItem {
  _id: number;
  name: string;
  price: number;
  category: string;
  distraction: string;
  image: string;
  rate: {
    rate: number;
    count: number;
  };
}

// Типизация состояния
interface IData {
  data: IItem[];
}

const initialState: IData = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IItem[]>) => {
      state.data = action.payload;
    },
    addItem: (state, action: PayloadAction<IItem>) => {
      state.data.push(action.payload);
    },
    clearData: (state) => {
      state.data = [];
    },
  },
});

export const { setData, addItem, clearData } = dataSlice.actions;
export default dataSlice.reducer;
