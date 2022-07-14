import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getGuests } from "../app/slice/weddinginfoSlice";
import { RootState } from "../app/store";
import * as constants from "../app/utils/constants";
import Spinner from "./ui/Spinner";

const Dashboard = () => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();
  // #endregion

  useEffect(() => {
    if (weddingInfoState.singaporeGuests.guests.length === 0) {
      dispatch(getGuests(constants.SG));
    } else if (weddingInfoState.malaysiaGuests.guests.length === 0) {
      dispatch(getGuests(constants.MY));
    }
  }, [
    weddingInfoState.singaporeGuests.guests,
    weddingInfoState.malaysiaGuests.guests,
  ]);

  return (
    <div className="h-full w-full p-5">
      <h1 className="font-semibold py-5 h-fit">Dashboard</h1>
      <div className="h-[30%] w-full flex space-x-2">
        <div className="h-full bg-linkedinShadeDark text-white rounded-lg p-5 flex flex-col w-full ">
          <h2 className="h-10">Days until wedding</h2>
          <p className="h-full flex justify-center items-center">
            9999999 days
          </p>
          <h2 className="h-10">Days until wedding</h2>
          <p className="h-full flex justify-center items-center">
            9999999 days
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="relative space-y-1 bg-slate-100 rounded-lg flex flex-col p-5 h-[49%] justify-center items-center">
            <div className="absolute -top-2">
              <img src="/assets/malaysia.svg" alt="sgs" className="h-5" />
            </div>
            <div>Guest Count</div>
            <div className="h-[60%] flex justify-center items-center">
              {weddingInfoState.malaysiaGuests.isLoading ? (
                <Spinner SpinnerColor="text-black" />
              ) : (
                weddingInfoState.malaysiaGuests.guests.filter(
                  (x) => x.isAttending === true
                ).length
              )}
              /9999
            </div>
            <div>RSVP count</div>
            <div className="h-[60%] flex justify-center items-center">
              {weddingInfoState.malaysiaGuests.isLoading ? (
                <Spinner SpinnerColor="text-black" />
              ) : (
                weddingInfoState.malaysiaGuests.guests.length
              )}
              /9999
            </div>
          </div>
          <div className="relative bg-slate-100 rounded-lg flex flex-col p-5 h-[49%] justify-center items-center space-y-1">
            <div className="absolute -top-2">
              <img src="/assets/singapore.svg" alt="sgs" className="h-5" />
            </div>
            <div className="h-fit">Guest Count</div>
            <div className="h-[60%] flex justify-center items-center">
              {weddingInfoState.singaporeGuests.isLoading ? (
                <Spinner SpinnerColor="text-black" />
              ) : weddingInfoState.singaporeGuests.guests!.length === 0 ? (
                0
              ) : (
                weddingInfoState.malaysiaGuests.guests.filter(
                  (x) => x.isAttending === true
                ).length
              )}
              /9999
            </div>
            <div className="h-fit">RSVP Count</div>
            <div className="h-[60%] flex justify-center items-center">
              {weddingInfoState.singaporeGuests.isLoading ? (
                <Spinner SpinnerColor="text-black" />
              ) : weddingInfoState.singaporeGuests.guests!.length === 0 ? (
                0
              ) : (
                weddingInfoState.malaysiaGuests.guests.length
              )}
              /9999
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
