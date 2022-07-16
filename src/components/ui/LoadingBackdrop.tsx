import React from "react";
import Spinner from "./Spinner";

interface LoadingBackdropProps {
  backdropClassname?: string;
  spinnerClassname?: string;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  backdropClassname = "bg-black",
  spinnerClassname = "text-white",
}) => {
  return (
    <div
      className={`fixed flex w-full h-full top-0 right-0 bg-opacity-70 z-20 justify-center items-center ${backdropClassname}`}
    >
      <Spinner SpinnerColor={spinnerClassname} />
    </div>
  );
};

export default LoadingBackdrop;
