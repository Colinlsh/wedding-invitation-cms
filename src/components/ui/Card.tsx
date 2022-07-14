import React from "react";

interface Props {
  oilModel: any;
  handleClick: (id: string) => void;
}

const Card: React.FC<Props> = ({ oilModel, handleClick }) => {
  return (
    <div
      className="flex flex-row md:flex-col text-center rounded shadow-lg cursor-pointer"
      onClick={() => handleClick(oilModel.id)}
    >
      <div className="md:w-full w-[30%] flex justify-center">
        {oilModel.imageURL ? (
          <img
            className="object-contain"
            src={oilModel.imageURL}
            alt={oilModel.cname}
            width="100vw"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="md:w-full w-[70%]">
        <div className="px-6 py-4">
          <div className="font-bold md:text-xl text-sm mb-2">
            {oilModel.id} {oilModel.cname}
          </div>
          <p className="text-gray-700 text-base">{oilModel.ctraits}</p>
        </div>
        <div className="pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 md:mb-2">
            origin: {oilModel.corigin}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 md:mb-2">
            ingredients: {oilModel.cingredients.join(",")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
