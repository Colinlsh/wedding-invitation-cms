import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import uiControlSlice from "./slice/uiControlSlice";
import weddinginfoSlice from "./slice/weddinginfoSlice";

export const store = configureStore({
  reducer: {
    uiState: uiControlSlice,
    weddingInfoState: weddinginfoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
