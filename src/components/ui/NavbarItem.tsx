import React from "react";

interface NarbarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: any;
  name: string;
  isShow?: boolean;
  isSelected?: boolean;
}

const NavbarItem: React.FC<NarbarItemProps> = ({
  icon,
  name,
  isShow = true,
  isSelected = false,
  ...props
}) => {
  return (
    <div
      className={`relative rounded-xl flex justify-start items-center px-6 py-5 md:py-2 cursor-pointer w-full space-x-2 text-white ${
        isShow ? "w-52" : ""
      } ${isSelected ? "bg-white bg-opacity-50" : ""}`}
      {...props}
    >
      {icon}
      <div
        className={`text-white transition-transform duration-200 ease absolute -left-52 ${
          isShow ? "translate-x-72" : ""
        }`}
      >
        {name}
      </div>
    </div>
  );
};

export default NavbarItem;
