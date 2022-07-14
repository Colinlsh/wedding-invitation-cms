import React, { useState } from "react";

interface Props {
  id: string;
  label: string;
  labelProps?: string;
  handleChecked: (id: string, checkedState: boolean) => void;
}

const Checkbox: React.FC<Props> = ({
  id,
  label,
  labelProps,
  handleChecked,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex m-2">
      <input
        id={id}
        type="checkbox"
        value=""
        className={`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500`}
        onChange={() => {
          setChecked(!checked);
        }}
        checked={checked}
      />
      <label
        htmlFor={id}
        className={`ml-2 text-sm font-medium text-black cursor-pointer ${labelProps}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
