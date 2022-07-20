import { FormikProps } from "formik";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import {
  CountryDataDto,
  GuestModel,
  TableFilterFormProps,
} from "../../../app/models";
import { PaginationDto } from "../../../app/models/common";
import Dropdown from "../Dropdown";

interface TableProps {
  tableItems: GuestModel[];
  tableHeaders: string[];
  isFiltering?: boolean;
  filterBy?: string[];
  pagination?: PaginationDto;
  onPageNumClick?: (pageNum: number) => void;
  headerClassname?: string;
  itemClassname?: string;
  filterFormik?: FormikProps<TableFilterFormProps>;
  countryData?: CountryDataDto;
}

const Table: React.FC<TableProps> = ({
  tableItems,
  tableHeaders,
  pagination,
  onPageNumClick: onPageClick,
  headerClassname,
  itemClassname,
  filterBy = [],
  isFiltering = false,
  filterFormik,
  countryData,
}) => {
  const getPageNumber = () => {
    const pageNumbers: DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[] = [];
    for (let index = 0; index < pagination!.totalPage; index++) {
      pageNumbers.push(
        <div
          key={index + 1}
          className={`transition-all duration-150 h-[80%] text-black p-2 text-center flex justify-center items-center cursor-pointer bg-opacity-80 rounded-sm font-semibold ${
            pagination!.currentPageNumber === index + 1
              ? "scale-110 bg-linkedinShade text-white"
              : "scale-1 bg-white"
          } `}
          onClick={() => onPageClick!(index + 1)}
        >
          {index + 1}
        </div>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="table-fixed flex flex-col p-2 rounded-lg backdrop-blur-sm text-sm w-full h-full bg-slate-100 z-0">
      <div
        className={`w-full justify-between p-2 font-semibold ${
          !isFiltering ? "hidden" : "flex"
        }`}
      >
        {countryData !== undefined ? (
          <>
            <div>Expected: {countryData!.expectedGuest}</div>
            <div>RSVPed: {countryData!.total}</div>
            <div>Yes: {countryData!.accepted}</div>
            <div>No: {countryData!.declined}</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={`w-full ${!isFiltering ? "hidden" : "flex flex-col"} `}>
        <div className="w-full h-full flex space-x-1 rounded-sm pb-2">
          <div className="relative flex flex-col w-[40%] h-full">
            <div className="px-2 font-semibold">Search</div>
            {filterFormik !== undefined ? (
              filterFormik!.errors.name ? (
                <div className="absolute p-2 -bottom-10 left-0 text-red-500 bg-white bg-opacity-50 rounded-lg backdrop-blur-sm text-xs">
                  {filterFormik !== undefined ? filterFormik!.errors.name : ""}
                </div>
              ) : (
                <></>
              )
            ) : (
              ""
            )}
            <input
              id="name"
              name="name"
              type="text"
              placeholder="name"
              className="h-full px-2"
              value={
                filterFormik !== undefined ? filterFormik!.values.name : ""
              }
              onChange={
                filterFormik !== undefined
                  ? filterFormik!.handleChange("name")
                  : () => {}
              }
            />
          </div>
          <div className="relative flex flex-col w-[25%] h-full">
            <div className="px-2 font-semibold">Page size</div>
            {filterFormik !== undefined ? (
              filterFormik!.errors.pageSize ? (
                <div className="absolute p-2 -bottom-12 left-0 text-red-500 bg-white bg-opacity-50 rounded-lg backdrop-blur-sm text-xs">
                  {filterFormik !== undefined
                    ? filterFormik!.errors.pageSize
                    : ""}
                </div>
              ) : (
                <></>
              )
            ) : (
              ""
            )}
            <input
              id="pageSize"
              name="pageSize"
              type="text"
              placeholder={"10"}
              className="h-full px-2"
              onChange={
                filterFormik !== undefined
                  ? filterFormik!.handleChange("pageSize")
                  : () => {}
              }
              value={
                filterFormik !== undefined ? filterFormik!.values.pageSize : ""
              }
            />
          </div>

          <div className="flex flex-col w-[35%]">
            <div className="px-2 font-semibold">Filter by:</div>
            <Dropdown
              filters={filterBy}
              onSelected={(x: string) => {
                if (filterFormik !== undefined) {
                  filterFormik!.values.filterBy = x;
                }
              }}
              value={
                filterFormik !== undefined ? filterFormik!.values.filterBy : ""
              }
              onChange={
                filterFormik !== undefined
                  ? filterFormik!.handleChange("filterBy")
                  : () => {}
              }
            />
          </div>
        </div>

        <div className="flex justify-end select-none z-0 space-x-2">
          <button
            onClick={() => {
              filterFormik!.resetForm();
            }}
            className="px-3 py-1 border-0"
          >
            Clear
          </button>
          <button
            onClick={() => {
              filterFormik!.submitForm();
            }}
            className="px-3 py-1 border-0"
          >
            Apply
          </button>
        </div>
      </div>
      <div
        className={`w-full grid  items-center border-b-2 border-b-linkedinShade ${headerClassname} ${
          tableHeaders.length === 5 ? "grid-cols-5" : "grid-cols-4"
        }`}
      >
        {tableHeaders.map((x, index) => (
          <div
            className="flex px-1 text-mini justify-center font-bold text-center"
            key={index}
          >
            {x.toLocaleUpperCase()}
          </div>
        ))}
      </div>
      <div className="w-full h-[90%] flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col overflow-y-auto">
          {tableItems.map((x, index) => (
            <div
              className={`py-1 px-1 text-xs grid grid-cols-5 ${
                tableHeaders.length === 5 ? "grid-cols-5" : "grid-cols-4"
              }`}
              key={`${x}${index}`}
            >
              <div className="px-2 flex items-center md:justify-center">
                {x.name}
              </div>
              <div className="px-2 py-1 flex items-center md:justify-center">
                {new Date(parseInt(x.rsvpDateTime)).toLocaleString("en-GB")}
              </div>
              <div className="px-2 flex items-center justify-center">
                {x.invitedBy}
              </div>
              <div className="px-2 flex justify-center items-center">
                {x.isAttending ? (
                  "Yes"
                ) : (
                  <p className="font-semibold bg-red-500 w-full text-center text-white">
                    No
                  </p>
                )}
              </div>
              <div className="px-2 flex items-center justify-center">
                {x.dietaryPreference}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-fit flex overflow-y-auto items-center space-x-2">
          {pagination !== undefined ? (
            <>{getPageNumber().map((x) => x)}</>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
