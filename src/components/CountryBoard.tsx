import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getGuests } from "../app/slice/weddinginfoSlice";
import { RootState } from "../app/store";
import * as constants from "../app/utils/constants";

interface CountryBoardProps {
  country: string;
}

const CountryBoard: React.FC<CountryBoardProps> = ({ country }) => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();
  // #endregion

  // useEffect(() => {
  //   if (
  //     weddingInfoState.singaporeGuests.guests.length === 0 ||
  //     weddingInfoState.malaysiaGuests.guests.length === 0
  //   ) {
  //     dispatch(getGuests(country));
  //   }
  // }, [country]);

  return (
    <div className="w-full h-full p-5">
      <h1 className="font-semibold py-5 h-fit">
        {country.toLocaleUpperCase()} CountryBoard
      </h1>
      <div className="bg-slate-50 drop-shadow-xl rounded-lg h-[100%]"></div>
    </div>
  );
};

export default CountryBoard;
