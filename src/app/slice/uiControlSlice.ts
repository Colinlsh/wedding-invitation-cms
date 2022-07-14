import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import * as constants from "../utils/constants";
import { MainState, ModalModel, UIControlState } from "../models";
import { i18n } from "../utils/translation";

// #region Async thunk

// export const getLocation = createAsyncThunk(
//   "weddingInfo/getLocation",
//   async (id: string) => {
//     try {
//       const response = await agent.WeddingInfo.location(id);

//       return {
//         name: "location",
//         value: [id, response],
//       };
//     } catch (error) {
//       return {
//         name: "",
//         value: [-1, (error as any).code, (error as any).message],
//       } as KeyValuePair;
//     }
//   }
// );

const uiControlSlice: Slice<
  UIControlState,
  SliceCaseReducers<UIControlState>,
  "essentialoils"
> = createSlice({
  name: "essentialoils",
  initialState: {
    uiType: 0,
    lang: constants.EN,
    modal: {
      header: "",
      message: "",
      isShow: false,
      isError: false,
      result: false,
      messageJSX: undefined,
    } as ModalModel,
    carouselPosition: 0,
    carouselElementCount: 0,
    RSVPCount: 0,
  } as UIControlState,
  reducers: {
    setModal: (state, action) => {
      const { header, message, yesCallback, noCallback, messageJSX } =
        action.payload;
      state.modal.isShow = true;
      state.modal.header = header;
      state.modal.message = message;
      state.modal.yesCallback = yesCallback;
      state.modal.noCallback = noCallback;
      state.modal.messageJSX = messageJSX;
    },
    setCloseModal: (state, action: PayloadAction<undefined>) => {
      state.modal.isShow = false;
      state.modal.isError = false;
    },
    setCarouselPosition: (state, action) => {
      state.carouselPosition = action.payload;
    },
    setCarouselElementCount: (state, action) => {
      state.carouselElementCount = action.payload;
    },
    setRSVPCount: (state, action) => {
      state.RSVPCount = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
  extraReducers: (builder) => {},
});

const setErrorModal = (value: any, state: MainState) => {
  state.modal.header = value[value.length - 2];
  state.modal.message = value[value.length - 1];
  state.modal.isShow = true;
};

export const {
  setModal,
  setCloseModal,
  setCarouselPosition,
  setCarouselElementCount,
  setRSVPCount,
  setLang,
} = uiControlSlice.actions;

export default uiControlSlice.reducer;
