import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { GuestModel } from "../../../app/models";
import { PaginationDto } from "../../../app/models/common";

interface TableProps {
  tableItems: GuestModel[];
  tableHeaders: string[];
  pagination?: PaginationDto;
  onPageClick?: (pageNum: number) => void;
}

const Table: React.FC<TableProps> = ({
  tableItems,
  tableHeaders,
  pagination,
  onPageClick,
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
          className={`transition-all duration-150 h-[80%] text-black p-2 text-center flex justify-center items-center cursor-pointer bg-white bg-opacity-80 rounded-sm font-semibold ${
            pagination!.currentPageNumber === index + 1
              ? "scale-110"
              : "scale-1"
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
    <div className="table-fixed flex flex-col p-2 rounded-lg backdrop-blur-sm text-sm w-full h-full bg-slate-100">
      <div className="w-full grid grid-cols-4 items-center  border-b-2 border-b-linkedinShade">
        {tableHeaders.map((x, index) => (
          <div
            className="flex py-1 px-1 text-xs justify-center font-bold text-center"
            key={index}
          >
            {x.toLocaleUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-col overflow-auto">
        {tableItems.map((x, index) => (
          <div
            className="py-1 px-1 text-xs grid grid-cols-4"
            key={`${x}${index}`}
          >
            <div className="px-2 flex items-center">{x.name}</div>
            <div className="px-2 flex items-center">{x.invitedBy}</div>
            <div className="px-2 flex items-center">
              {new Date(parseInt(x.rsvpDateTime)).toLocaleString("en-GB")}
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
  );
};

export default Table;
