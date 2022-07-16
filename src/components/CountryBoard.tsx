import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PaginateRequest, PaginationDto } from "../app/models/common";
import { getGuests } from "../app/slice/weddinginfoSlice";
import { RootState } from "../app/store";
import * as constants from "../app/utils/constants";
import LoadingBackdrop from "./ui/LoadingBackdrop";
import Table from "./ui/table/Table";

interface CountryBoardProps {}

const CountryBoard: React.FC<CountryBoardProps> = ({}) => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();
  let { slug: slug } = useParams();
  const [data, setData] = useState<PaginationDto>();
  // #endregion

  const handleOnPageNumClick = (pageNum: number) => {
    dispatch(
      getGuests({
        ...paginateParams,
        currentPageNumber: pageNum,
        country: slug!,
      })
    );
    paginateParams = {
      ...paginateParams,
      currentPageNumber: pageNum,
      country: slug!,
    };
  };

  let paginateParams = {
    country: slug!,
    currentPageNumber: 1,
    pageSize: 10,
    orderBy: "sortOrder",
  } as PaginateRequest;

  useEffect(() => {
    if (
      weddingInfoState.singapore.totalRecords === 0 ||
      weddingInfoState.malaysia.totalRecords === 0
    ) {
      dispatch(getGuests({ ...paginateParams, country: slug! }));
      paginateParams = { ...paginateParams, country: slug! };
    }

    setData(
      slug! === constants.SG
        ? weddingInfoState.singapore
        : weddingInfoState.malaysia
    );
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
        {data !== undefined ? (
          data!.isLoading ? (
            <LoadingBackdrop
              backdropClassname="transparent"
              spinnerClassname="text-black"
            />
          ) : (
            <Table
              tableHeaders={[
                "name",
                "rsvp datetime",
                "invited by",
                "attending?",
              ]}
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
              onPageNumClick={handleOnPageNumClick}
              isFiltering={true}
              filterBy={["Yes/No", "Yes", "No"]}
            />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CountryBoard;
