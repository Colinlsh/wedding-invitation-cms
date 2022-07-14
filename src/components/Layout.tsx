import React, { useContext } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { animateScroll as scroll } from "react-scroll";
import { useAppSelector } from "../app/hooks";

import { RootState } from "../app/store";
import Navbar from "./Navbar";
import Alert from "./ui/Alert";
import { Modal } from "./ui/Modal";
import { ScrollContext } from "./ui/ScrollObserver";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  // #endregion

  const { scrollY } = useContext(ScrollContext);

  // #endregion
  return (
    <div className="flex flex-row w-screen h-screen">
      <Navbar />
      {children}
      {weddingInfoState.modal.isShow ? (
        <Modal
          header={weddingInfoState.modal.header}
          message={weddingInfoState.modal.message}
          yesCallback={weddingInfoState.modal.yesCallback}
          yesButtonText="ok"
          messageJSX={weddingInfoState.modal.messageJSX}
        />
      ) : (
        <></>
      )}
      {weddingInfoState.alert.isShow ? (
        <Alert
          header={weddingInfoState.alert.header}
          message={weddingInfoState.alert.message}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Layout;
