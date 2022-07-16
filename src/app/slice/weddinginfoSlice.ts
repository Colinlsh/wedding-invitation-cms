import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import agent from "../api/agent";
import {
  AlertModel,
  AttendanceFormModel,
  AttendanceFormProps,
  DashboardDto,
  KeyValuePair,
  LocationModel,
  MainState,
  ModalModel,
} from "../models";
import * as constants from "../utils/constants";

// #region Async thunk

export const getLocation = createAsyncThunk(
  "weddingInfo/getLocation",
  async (id: string) => {
    try {
      const response = await agent.WeddingInfo.location(id);

      return {
        name: "location",
        value: [id, response],
      };
    } catch (error) {
      return {
        name: "",
        value: [-1, (error as any).code, (error as any).message],
      } as KeyValuePair;
    }
  }
);

export const getGuests = createAsyncThunk(
  "weddingInfo/getGuests",
  async (country: string) => {
    try {
      const response = await agent.WeddingInfo.guests(country);

      return {
        name: "guests",
        value: [country, response],
      };
    } catch (error) {
      return {
        name: "",
        value: [-1, (error as any).code, (error as any).message],
      } as KeyValuePair;
    }
  }
);

// export const checkGuestList = createAsyncThunk(
//   "weddingInfo/checkGuestList",
//   async (attendanceFormProps: AttendanceFormProps) => {
//     try {
//       const response = await agent.WeddingInfo.checkguest(attendanceFormProps);

//       return {
//         name: "attendance",
//         value: [response],
//       };
//     } catch (error) {
//       return {
//         name: "",
//         value: [-1, (error as any).code, (error as any).message],
//       } as KeyValuePair;
//     }
//   }
// );

// export const setNotAttending = createAsyncThunk(
//   "weddingInfo/setNotAttending",
//   async (attendanceFormProps: AttendanceFormProps) => {
//     try {
//       const response = await agent.WeddingInfo.attend(attendanceFormProps);

//       return {
//         name: "attendance",
//         value: [response],
//       };
//     } catch (error) {
//       return {
//         name: "",
//         value: [-1, (error as any).code, (error as any).message],
//       } as KeyValuePair;
//     }
//   }
// );

// export const setAttend = createAsyncThunk(
//   "weddingInfo/setAttend",
//   async (attendanceFormProps: AttendanceFormProps) => {
//     try {
//       const response = await agent.WeddingInfo.attend(attendanceFormProps);

//       return {
//         name: "attendance",
//         value: [response],
//       };
//     } catch (error) {
//       return {
//         name: "",
//         value: [-1, (error as any).code, (error as any).message],
//       } as KeyValuePair;
//     }
//   }
// );

export const setAttendance = createAsyncThunk(
  "weddingInfo/setAttendance",
  async (attendanceFormModel: AttendanceFormModel) => {
    try {
      const response = await agent.WeddingInfo.attendance(attendanceFormModel);

      return {
        name: "attendance",
        value: [response],
      };
    } catch (error) {
      return {
        name: "",
        value: [-1, (error as any).code, (error as any).message],
      } as KeyValuePair;
    }
  }
);

export const getDashboard = createAsyncThunk(
  "weddingInfo/getDashboard",
  async () => {
    try {
      const response = await agent.WeddingInfo.dashboard();

      return {
        name: "dashboard",
        value: [response],
      };
    } catch (error) {
      return {
        name: "",
        value: [-1, (error as any).code, (error as any).message],
      } as KeyValuePair;
    }
  }
);

const weddingInfoSlice: Slice<
  MainState,
  SliceCaseReducers<MainState>,
  "essentialoils"
> = createSlice({
  name: "essentialoils",
  initialState: {
    singapore: {
      name: "Park Royal Pickering",
      address: "3 Upper Pickering St, Singapore 058289",
      datetime: "22 October 2022 12:30 PM",
      coordinates: {
        lat: 1.285776755572009,
        lng: 103.8461034086686,
      },
      code: "SG",
      theme: {
        name: "haha",
        colors: ["green", "white"],
      },
      schedule: {
        items: [
          {
            eventName: "Pre-event Cocktail",
            time: "12:00 pm",
          },
          {
            eventName: "Lunch",
            time: "1:00 pm",
          },
        ],
      },
    } as LocationModel,
    malaysia: {
      name: "Averie Hous",
      address: "6W, Jalan Siput Kepah, 10250 George Town, Penang",
      coordinates: {
        lat: 5.44716074782574,
        lng: 100.30604456771344,
      },
      datetime: "14 October 2022 6:00 PM",
      code: "MY",
      theme: {
        name: "rustic",
        colors: ["green", "white"],
      },
      schedule: {
        items: [
          {
            eventName: "Garden Wedding/Cocktail",
            time: "5:00 pm",
          },
          {
            eventName: "Dinner",
            time: "6:30 pm",
          },
        ],
      },
    } as LocationModel,
    modal: {
      header: "",
      message: "",
      isShow: false,
      isError: false,
      result: false,
      messageJSX: undefined,
    } as ModalModel,
    alert: {
      header: "Alert!",
      message: "",
    } as AlertModel,
    attendanceForm: {
      attendanceFormProps: {
        id: "",
        attendingList: [],
        country: "",
      },
      invitedBy: "",
      isLoading: false,
    },
    dashboard: {
      sg: {
        guests: [],
        accepted: 0,
        declined: 0,
        total: 0,
        expectedGuest: 0,
      },
      my: {
        guests: [],
        accepted: 0,
        declined: 0,
        total: 0,
        expectedGuest: 0,
      },
      sgDatetime: {
        eventDate: new Date(0),
        numberOfGuest: 120,
        till: 0,
      },
      myDatetime: {
        eventDate: new Date(0),
        numberOfGuest: 100,
        till: 0,
      },
      isLoading: false,
    } as DashboardDto,
  } as MainState,
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
    setAlert: (state, action) => {
      const { header, message } = action.payload;
      state.alert.isShow = true;
      state.alert.header = header;
      state.alert.message = message;
    },
    setCloseAlert: (state, action: PayloadAction<undefined>) => {
      state.alert.isShow = false;
    },
    setResetAttendanceForm: (state, action) => {
      state.attendanceForm.isLoading = false;
      state.attendanceForm.attendanceFormProps = {
        id: "",
        attendingList: [
          {
            name: "",
            isAttending: undefined,
            dietaryPreference: "",
          },
        ],
        country: "",
      };
      state.attendanceForm.invitedBy = "";
    },
    setAttendanceForm: (state, action) => {
      const value = action.payload as AttendanceFormProps;
      state.attendanceForm.attendanceFormProps = {
        ...value,
        attendingList: [...value.attendingList],
      };
    },
    setInvitedBy: (state, action) => {
      state.attendanceForm.invitedBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state, { meta }) => {
      // state.checkResponse.isLoading = true;
    });
    builder.addCase(
      getLocation.fulfilled,
      (state, action: PayloadAction<KeyValuePair>) => {
        let { name, value } = action.payload;
        if (value[0] !== -1) {
          if ((value[0] as string).toLocaleUpperCase() === "SG") {
            state.singapore = value[1];
          } else {
            state.malaysia = value[1];
          }
        } else {
          setErrorModal(value, state);
        }
      }
    );
    builder.addCase(getLocation.rejected, (state, { meta }) => {
      // state.checkResponse.isLoading = false;
    });

    // builder.addCase(getGuests.pending, (state, { meta }) => {
    //   const country = meta.arg as string;

    //   if (country !== constants.SG) {
    //     state.malaysiaGuests.isLoading = true;
    //   } else {
    //     state.singaporeGuests.isLoading = true;
    //   }
    // });
    // builder.addCase(
    //   getGuests.fulfilled,
    //   (state, action: PayloadAction<KeyValuePair>) => {
    //     let { name, value } = action.payload;
    //     if (value[0] !== -1) {
    //       if ((value[0] as string).toLowerCase() === constants.SG) {
    //         state.singaporeGuests.guests = value[1];
    //         state.singaporeGuests.isLoading = false;
    //       } else {
    //         state.malaysiaGuests.guests = value[1];
    //         state.malaysiaGuests.isLoading = false;
    //       }
    //     } else {
    //       setErrorModal(value, state);
    //     }
    //   }
    // );
    // builder.addCase(getGuests.rejected, (state, { meta }) => {
    //   const country = meta.arg as string;

    //   if (country !== constants.SG) {
    //     state.malaysiaGuests.isLoading = false;
    //   } else {
    //     state.singaporeGuests.isLoading = false;
    //   }
    // });

    builder.addCase(getDashboard.pending, (state, { meta }) => {
      state.dashboard!.isLoading = true;
    });
    builder.addCase(
      getDashboard.fulfilled,
      (state, action: PayloadAction<KeyValuePair>) => {
        let { name, value } = action.payload;
        if (value[0] !== -1) {
          state.dashboard = value[0];
        } else {
          setErrorModal(value, state);
        }
        state.dashboard!.isLoading = false;
      }
    );
    builder.addCase(getDashboard.rejected, (state, { meta }) => {
      state.dashboard!.isLoading = false;
    });

    builder.addCase(setAttendance.pending, (state, { meta }) => {
      state.attendanceForm.isLoading = true;
    });
    builder.addCase(
      setAttendance.fulfilled,
      (state, action: PayloadAction<KeyValuePair>) => {
        let { name, value } = action.payload;
        if (value[0] !== -1) {
          // setResetAttendanceForm(true);
        } else {
          setErrorModal(value, state);
        }
        state.attendanceForm.isLoading = false;
      }
    );
    builder.addCase(setAttendance.rejected, (state, { meta }) => {
      state.attendanceForm.isLoading = false;
    });
  },
});

const setErrorModal = (value: any, state: MainState) => {
  state.modal.header = value[value.length - 2];
  state.modal.message = value[value.length - 1];
  state.modal.isShow = true;
};

export const {
  setModal,
  setCloseModal,
  setAlert,
  setCloseAlert,
  setResetAttendanceForm,
  setAttendanceForm,
  setInvitedBy,
  setLocation,
} = weddingInfoSlice.actions;

export default weddingInfoSlice.reducer;
