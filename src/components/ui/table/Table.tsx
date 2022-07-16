import React from "react";
import { GuestModel } from "../../../app/models";

interface TableProps {
  tableItems: GuestModel[];
  tableHeaders: string[];
}

const Table: React.FC<TableProps> = ({ tableItems, tableHeaders }) => {
  return (
    <div className="table-fixed flex flex-col p-2 rounded-lg backdrop-blur-sm text-sm w-full h-full bg-slate-100">
      <div className="w-full grid grid-cols-3 items-center  border-b-2 border-b-slate-100">
        {tableHeaders.map((x, index) => (
          <div
            className="flex py-1 px-1 text-xs justify-center font-bold"
            key={index}
          >
            {x.toLocaleUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-col overflow-auto">
        {tableItems.map((x, index) => (
          <div
            className="py-1 px-1 text-xs grid grid-cols-3"
            key={`${x}${index}`}
          >
            <div className="px-2 flex items-center">{x.name}</div>
            <div className="px-2 flex items-center">{x.invitedBy}</div>
            <div className="px-2 flex items-center">
              {new Date(parseInt(x.rsvpDateTime)).toLocaleString("en-GB")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
