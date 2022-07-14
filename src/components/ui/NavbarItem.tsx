import React from "react";

interface NarbarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: any;
  name: string;
  isShow?: boolean;
}

const NavbarItem: React.FC<NarbarItemProps> = ({
  icon,
  name,
  isShow = true,
  ...props
}) => {
  return (
    <div
      className={`flex justify-start items-center space-x-2 px-10 py-5 text-white cursor-pointer ${
        isShow ? "" : "px-0 justify-center"
      }`}
      {...props}
    >
      {icon}
      <div
        className={`text-white transition-all duration-500 ${
          isShow ? "opacity-1" : "opacity-0 w-0"
        }`}
      >
        {name}
      </div>
    </div>
  );
};

export default NavbarItem;
