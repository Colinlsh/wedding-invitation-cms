import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return (
    <div className="h-full w-full flex justify-center" {...props}>
      <div
        className={`h-full w-[70%]`}
        style={{
          boxShadow: "0 1em 0.5em -1em rgba(0, 0, 0, 0.25)",
        }}
      />
    </div>
  );
};

export default Divider;
