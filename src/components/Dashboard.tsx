import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getDashboard, getGuests } from "../app/slice/weddinginfoSlice";
import { RootState } from "../app/store";
import * as constants from "../app/utils/constants";
import Spinner from "./ui/Spinner";
import Table from "./ui/table/Table";

const Dashboard = () => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();
  // #endregion

  useEffect(() => {
    if (
      weddingInfoState.dashboard === undefined ||
      weddingInfoState.dashboard!.my.expectedGuest === 0
    ) {
      dispatch(getDashboard());
    }
  }, [weddingInfoState.dashboard]);

  return (
    <div className="h-full w-full p-5 space-y-2">
      <h1 className="font-semibold py-5 h-fit">Dashboard</h1>
      <div className="h-[30%] w-full flex space-x-2">
        <div className="h-full bg-linkedinShadeDark text-white rounded-lg p-5 flex flex-col w-full ">
          {weddingInfoState.dashboard!.isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <>
              <h2 className="h-10">Days until wedding</h2>
              <p className="h-full flex justify-center items-center">
                {weddingInfoState.dashboard!.myDatetime.till} days
              </p>
              <h2 className="h-10">Days until wedding</h2>
              <p className="h-full flex justify-center items-center">
                {weddingInfoState.dashboard!.sgDatetime.till} days
              </p>
            </>
          )}
        </div>

        <div className="w-full h-full flex flex-col justify-between">
          <div className="relative space-y-1 bg-slate-100 rounded-lg flex flex-col p-5 h-[49%] justify-center items-center">
            <div className="absolute -top-2">
              <img src="/assets/malaysia.svg" alt="sgs" className="h-5" />
            </div>
            {weddingInfoState.dashboard!.isLoading ? (
              <Spinner />
            ) : (
              <>
                <div>Guest Count</div>
                <div className="h-[60%] flex justify-center items-center">
                  {weddingInfoState.dashboard!.my.total} /{" "}
                  {weddingInfoState.dashboard!.my.expectedGuest}
                </div>
                <div>RSVP count</div>
                <div className="h-[60%] flex justify-center items-center">
                  <>
                    {weddingInfoState.dashboard!.my.accepted} /{" "}
                    {weddingInfoState.dashboard!.my.declined} /{" "}
                    {weddingInfoState.dashboard!.my.total}
                  </>
                </div>
              </>
            )}
          </div>
          <div className="relative bg-slate-100 rounded-lg flex flex-col p-5 h-[49%] justify-center items-center space-y-1">
            <div className="absolute -top-2">
              <img src="/assets/singapore.svg" alt="sgs" className="h-5" />
            </div>
            {weddingInfoState.dashboard!.isLoading ? (
              <Spinner />
            ) : (
              <>
                <div>Guest Count</div>
                <div className="h-[60%] flex justify-center items-center">
                  {weddingInfoState.dashboard!.sg.total} /{" "}
                  {weddingInfoState.dashboard!.sg.expectedGuest}
                </div>
                <div>RSVP count</div>
                <div className="h-[60%] flex justify-center items-center">
                  <>
                    {weddingInfoState.dashboard!.sg.accepted} /{" "}
                    {weddingInfoState.dashboard!.sg.declined} /{" "}
                    {weddingInfoState.dashboard!.sg.total}
                  </>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-[60%] w-full rounded-lg flex flex-col justify-around space-y-2">
        <div className="relative w-full h-[50%]">
          <div className="absolute z-10">
            <img src="/assets/malaysia.svg" alt="sgs" className="h-5" />
          </div>
          <Table
            tableHeaders={["name", "invited By", "rsvp Datetime"]}
            tableItems={weddingInfoState.dashboard!.my.guests}
          />
        </div>
        <div className="relative w-full h-[50%]">
          <div className="absolute z-10">
            <img src="/assets/singapore.svg" alt="sgs" className="h-5" />
          </div>
          <Table
            tableHeaders={["name", "invited By", "rsvp Datetime"]}
            tableItems={weddingInfoState.dashboard!.sg.guests}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
