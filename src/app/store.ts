import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import uiControlSlice from "./slice/uiControlSlice";
import weddinginfoSlice from "./slice/weddinginfoSlice";

export const store = configureStore({
  reducer: {
    uiState: uiControlSlice,
    weddingInfoState: weddinginfoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
