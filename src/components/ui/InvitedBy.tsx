import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCarouselPosition } from "../../app/slice/uiControlSlice";
import { setInvitedBy } from "../../app/slice/weddinginfoSlice";
import { RootState } from "../../app/store";
import { FormButton } from "./FormButton";

interface InvitedByProps {
  country: string;
}

const InvitedBy: React.FC<InvitedByProps> = ({ country }) => {
  // #region redux
  const uiState = useAppSelector((state: RootState) => state.uiState);
  const dispatch = useAppDispatch();
  // #endregion

  const { t } = useTranslation();

  const handleInvitedBy = (name: string) => {
    dispatch(setInvitedBy(name));
    nextSlide();
  };

  const nextSlide = () => {
    dispatch(
      setCarouselPosition(
        uiState.carouselPosition === uiState.carouselElementCount - 1
          ? 0
          : uiState.carouselPosition + 1
      )
    );
  };

  return (
    <div className="flex flex-col justify-start w-full">
      <h1 className="font-semibold text-sm text-center">{t("invitedby")}:</h1>
      <div className="pt-5">
        {country === "sg" ? (
          <div className="w-full flex justify-center">
            <FormButton
              style={{
                borderRadius: "5px",
                width: "6rem",
                padding: "0.5rem 1rem",
              }}
              onClick={() => handleInvitedBy("Colin")}
            >
              {t("colin")}
            </FormButton>
            <FormButton
              style={{
                borderRadius: "5px",
                width: "6rem",
                padding: "0.5rem 1rem",
              }}
              onClick={() => handleInvitedBy("Jing")}
            >
              {t("zhoajing")}
            </FormButton>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <FormButton
              style={{
                borderRadius: "5px",
                width: "6rem",
                padding: "0.5rem 1rem",
              }}
              onClick={() => handleInvitedBy("Jing")}
            >
              {t("zhoajing")}
            </FormButton>
            <FormButton
              style={{
                borderRadius: "5px",
                width: "6rem",
                padding: "0.5rem 1rem",
              }}
              onClick={() => handleInvitedBy("Colin")}
            >
              {t("colin")}
            </FormButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitedBy;
