import React, { useEffect, useState } from "react";
import { GuestModel } from "../../../app/models";
import { SwipingState } from "../../../app/models/common";
import { ImBin } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";

interface TableSwipeItemProps {
  index: number;
  item: GuestModel;
  tableHeaders: string[];
  onRemove?: (index: GuestModel) => void;
}

const TableSwipeItem: React.FC<TableSwipeItemProps> = ({
  index,
  item,
  tableHeaders,
  onRemove,
}) => {
  const [swipeState, setSwipeState] = useState<SwipingState>({
    left: 0,
    originalOffset: 0,
    velocity: 0,
    timeOfLastDragEvent: 0,
    touchStartX: 0,
    prevTouchX: 0,
    beingTouched: false,
    height: 0,
  });

  const [wantRemove, setWantRemove] = useState(false);

  const handleMove = (clientX: number) => {
    if (swipeState.beingTouched) {
      const touchX = clientX;
      const currTime = Date.now();
      const elapsed = currTime - swipeState.timeOfLastDragEvent;
      const velocity = (20 * (touchX - swipeState.prevTouchX)) / elapsed;
      let deltaX = touchX - swipeState.touchStartX + swipeState.originalOffset;
      if (deltaX < -200) {
        console.log("remove here");
        setWantRemove(true);
        if (onRemove !== undefined) {
          onRemove(item);
        }
      } else if (deltaX > 0) {
        deltaX = 0;
      }
      setSwipeState({
        ...swipeState,
        left: deltaX,
        velocity: velocity,
        timeOfLastDragEvent: currTime,
        prevTouchX: touchX,
      });

      console.log(deltaX);
    }
  };

  useEffect(() => {
    if (!swipeState.beingTouched && swipeState.left < -0.01) {
      console.log("..... in use effect");
      let velocity = swipeState.velocity + 10 * 0.033;
      setSwipeState({
        ...swipeState,
        left: (swipeState.left += velocity),
      });
      setSwipeState({ ...swipeState, left: 0 });
    }
  }, [swipeState.beingTouched, swipeState.left]);

  const handleStart = (clientX: number) => {
    setSwipeState({
      ...swipeState,
      originalOffset: swipeState.left,
      velocity: 0,
      timeOfLastDragEvent: Date.now(),
      touchStartX: clientX,
      beingTouched: true,
    });
  };

  const handleEnd = () => {
    setSwipeState({
      ...swipeState,
      velocity: swipeState.velocity,
      touchStartX: 0,
      beingTouched: false,
    });
  };

  const handleTouchStart = (
    touchStartEvent: React.TouchEvent<HTMLDivElement>
  ) => {
    console.log("TOUCH");
    handleStart(touchStartEvent.targetTouches[0].clientX);
  };

  const handleTouchMove = (
    touchMoveEvent: React.TouchEvent<HTMLDivElement>
  ) => {
    handleMove(touchMoveEvent.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (
    mouseDownEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    mouseDownEvent.preventDefault();
    handleStart(mouseDownEvent.clientX);
  };

  const handleMouseMove = (
    mouseMoveEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleMove(mouseMoveEvent.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    handleMouseUp();
  };
  return (
    <div
      className={`py-1 px-1 text-xs w-full h-full flex relative transition-width duration-500`}
      key={`${item}${index}`}
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={() => handleTouchEnd()}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={() => handleMouseUp()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div
        className={`w-full h-full grid transition-translate duration-500 ${
          tableHeaders.length === 5 ? "grid-cols-5" : "grid-cols-4"
        }`}
        style={{
          transform: `translateX(${swipeState.left}px)`,
          transition: "ease-in-out",
          transitionDuration: "100ms",
        }}
      >
        <div className="px-2 flex items-center md:justify-center">
          {item.name}
        </div>
        <div className="px-2 py-1 flex items-center md:justify-center">
          {new Date(parseInt(item.rsvpDateTime)).toLocaleString("en-GB")}
        </div>
        <div className="px-2 flex items-center justify-center">
          {item.invitedBy}
        </div>
        <div className="px-2 flex justify-center items-center">
          {item.isAttending ? (
            "Yes"
          ) : (
            <p className="font-semibold bg-red-500 w-full text-center text-white">
              No
            </p>
          )}
        </div>
        <div className="px-2 flex items-center justify-center">
          {item.dietaryPreference}
        </div>
      </div>
      <div
        className={`items-center ${
          wantRemove ? "w-[20%] flex flex-row" : "hidden"
        }`}
      >
        <div
          className="p-1 bg-green-400 h-full w-full justify-center flex items-center"
          onClick={() => setWantRemove(false)}
        >
          <IoCloseSharp />
        </div>
        <div
          className="p-1 bg-red-400 h-full w-full flex justify-center items-center"
          onClick={() => setWantRemove(false)}
        >
          <ImBin />
        </div>
      </div>
    </div>
  );
};

export default TableSwipeItem;
