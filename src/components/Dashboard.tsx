import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getGuests } from "../app/slice/weddinginfoSlice";
import { RootState } from "../app/store";
import * as constants from "../app/utils/constants";

const Dashboard = () => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();
  // #endregion

  useEffect(() => {
    if (weddingInfoState.singaporeGuests.length === 0) {
      dispatch(getGuests(constants.SG));
    } else if (weddingInfoState.malaysiaGuests.length === 0) {
      dispatch(getGuests(constants.MY));
    }
  }, []);

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
          <div className="bg-slate-100 rounded-lg flex flex-col p-5 h-[49%] justify-center items-center">
            <div>MY Guest Count</div>
            <div className="h-[60%] flex justify-center items-center">
              {weddingInfoState.malaysiaGuests.length === 0
                ? 0
                : weddingInfoState.malaysiaGuests.filter(
                    (x) => x.isAttending === true
                  ).length}
              /9999
            </div>
          </div>
          <div className="bg-slate-100 rounded-lg flex flex-col p-5 h-[49%] justify-center items-center">
            <div className="h-fit">SG Guest Count</div>
            <div className="h-[60%] flex justify-center items-center">
              {weddingInfoState.singaporeGuests.length === 0
                ? 0
                : weddingInfoState.malaysiaGuests.filter(
                    (x) => x.isAttending === true
                  ).length}
              /9999
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
