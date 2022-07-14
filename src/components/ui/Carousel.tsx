import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCarouselElementCount } from "../../app/slice/uiControlSlice";
import { RootState } from "../../app/store";

interface Props {
  childrens: React.ReactNode[];
  childrensHandle?: [];
}

const Carousel: React.FC<Props> = ({ childrens }) => {
  // #region redux
  const uiState = useAppSelector((state: RootState) => state.uiState);
  const dispatch = useAppDispatch();
  // #endregion

  useEffect(() => {
    dispatch(setCarouselElementCount(childrens.length));
  }, []);

  if (!Array.isArray(childrens) || childrens.length <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-[100%] h-[100%]">
      <div className="w-[100%] h-[100%] flex flex-row justify-center align-middle relative">
        {childrens.map((child, index) => {
          return (
            <div
              className={`flex w-full h-[100%] justify-center absolute ${
                index === uiState.carouselPosition
                  ? "opacity-1 duration-500 ease-in scale-100 z-40"
                  : "opacity-0 duration-500 z-0"
              }`}
              key={index}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
