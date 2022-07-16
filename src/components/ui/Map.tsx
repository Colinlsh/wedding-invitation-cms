import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  // #endregion

  const { t } = useTranslation();

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );

  return (
    <></>
    // <div id="map" className="flex flex-col text-center h-[100%] w-[100%]">
    //   <div className="h-[20%] flex flex-col justify-end">
    //     <h1 className="text-3xl flex align-middle justify-center items-center font-smooch">
    //       {t("howtogo")}
    //     </h1>
    //     <p className="font-semibold p-2 text-sm">
    //       Click on marker to get directions from google map!
    //     </p>
    //   </div>
    //   <div className="h-[70%] flex items-center align-middle">
    //     <GoogleMap
    //       mapContainerStyle={{
    //         height: "100%",
    //         width: "100%",
    //       }}
    //       id="location"
    //       zoom={19}
    //       center={weddingInfoState.currentLocation.coordinates}
    //       options={options}
    //     >
    //       <Marker
    //         title={weddingInfoState.currentLocation.address}
    //         position={weddingInfoState.currentLocation.coordinates}
    //         draggable={false}
    //         onClick={() => {
    //           console.log("HAHAH");
    //           window.open(
    //             "https://maps.google.com?q=" +
    //               weddingInfoState.currentLocation.coordinates.lat +
    //               "," +
    //               weddingInfoState.currentLocation.coordinates.lng
    //           );
    //         }}
    //       />
    //     </GoogleMap>
    //   </div>
    // </div>
  );
};

export default Map;
