import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCloseAlert } from "../../app/slice/weddinginfoSlice";
import { RootState } from "../../app/store";

interface AlertProps {
  header: string;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ header, message }) => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();
  // #endregion
  return (
    <div className="absolute w-full bottom-10">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative z-50"
        role="alert"
      >
        <strong className="font-bold">{header}</strong>
        <span className="block sm:inline">{message}</span>
        <div onClick={() => dispatch(setCloseAlert(true))}>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Alert;
