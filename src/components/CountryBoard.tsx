import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PaginateRequest } from "../app/models/common";
import { getGuests } from "../app/slice/weddinginfoSlice";
import { RootState } from "../app/store";
import * as constants from "../app/utils/constants";
import Table from "./ui/table/Table";

interface CountryBoardProps {}

const CountryBoard: React.FC<CountryBoardProps> = ({}) => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();
  let { slug: slug } = useParams();
  // #endregion

  const handleOnPageClick = (pageNum: number) => {
    dispatch(
      getGuests({
        ...paginateParams,
        currentPageNumber: pageNum,
        country: slug!,
      })
    );
  };

  const [paginateParams, setPaginateParams] = useState<PaginateRequest>({
    country: slug!,
    currentPageNumber: 1,
    pageSize: 10,
    orderBy: "sortOrder",
  });

  useEffect(() => {
    if (
      weddingInfoState.singapore.totalRecords === 0 ||
      weddingInfoState.malaysia.totalRecords === 0
    ) {
      dispatch(getGuests({ ...paginateParams, country: slug! }));
    }
  }, [slug]);

  return (
    <div className="w-full h-full p-5">
      <h1 className="font-semibold py-5 h-fit flex space-x-2">
        {slug!.toLocaleLowerCase() === constants.SG ? (
          <div className="z-10">
            <img src="/assets/singapore.svg" alt="sg" className="h-5" />
          </div>
        ) : (
          <div className="z-10">
            <img src="/assets/malaysia.svg" alt="my" className="h-5" />
          </div>
        )}
        CountryBoard
      </h1>
      <div className="drop-shadow-xl rounded-lg h-[95%]">
        <Table
          tableHeaders={["name", "rsvp datetime", "invited by", "attending?"]}
          tableItems={
            slug! === constants.SG
              ? weddingInfoState.singapore.items
              : weddingInfoState.malaysia.items
          }
          pagination={
            slug! === constants.SG
              ? weddingInfoState.singapore
              : weddingInfoState.malaysia
          }
          onPageClick={handleOnPageClick}
        />
      </div>
    </div>
  );
};

export default CountryBoard;
