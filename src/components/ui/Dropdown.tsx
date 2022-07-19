import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { TableFilterFormProps } from "../../app/models";

interface DropdownProps {
  filters: string[];
  onSelected?: (selected: string) => void;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  filters,
  onSelected,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(value);

  return (
    <div
      className="relative border rounded text-gray-600 z-10 w-full flex items-center"
      style={{ height: "2rem" }}
    >
      <select
        className="border-0 w-full h-full"
        style={{ borderRadius: "0.5rem", border: "0px" }}
        value={value}
        onChange={onChange!}
      >
        {filters!.map((x, index) => (
          <option
            key={`${index}${x}`}
            style={{ borderStyle: "none" }}
            className={`transition-all duration-2000 text-sm text-gray-600 border-0 cursor-pointer ${
              filters.length - 1 === index ? "" : "border-b-2"
            }`}
            onClick={() => {
              setIsOpen(false);
              if (onSelected !== undefined) {
                onSelected!(x);
              }
              setLabel(x);
            }}
          >
            {x}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
