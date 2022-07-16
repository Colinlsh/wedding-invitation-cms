import React, { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

interface DropdownProps {
  filters: string[];
  onSelected?: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ filters, onSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(filters[0]);
  return (
    <div className="relative p-3 border rounded text-gray-600 z-10 w-full flex items-center">
      <div className="w-[90%]">{selected}</div>
      <div
        className={`transition-all w-full duration-500 absolute top-1 left-0 px-3 bg-white ${
          isOpen ? "translate-y-10 opacity-1 z-0" : "opacity-0 -z-10"
        }`}
      >
        {filters!.map((x, index) => (
          <div
            key={`${index}${x}`}
            className={`text-sm text-gray-600 border-0 py-2 cursor-pointer ${
              filters.length - 1 === index ? "" : "border-b-2"
            }`}
            onClick={() => {
              setSelected(x);
              setIsOpen(false);
              onSelected!(x);
            }}
          >
            {x}
          </div>
        ))}
      </div>
      <div className="w-fit cursor-pointer z-10">
        {isOpen ? (
          <IoIosArrowDropup
            size={20}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          />
        ) : (
          <IoIosArrowDropdown
            size={20}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
