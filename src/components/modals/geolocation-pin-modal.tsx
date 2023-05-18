import { useCallback, useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";

import useGeolocationPinModal from "~/store/geolocationPinModalStore";
import useBrowserLocation from "../../hooks/use-browser-location";
import useIPLocation from "../../hooks/use-ip-location";

import Modal from "./modal";
import Button from "../button";
import Heading from "../heading";
import Input from "../inputs/input";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

import "leaflet/dist/leaflet.css";
// import osm from "./osm-providers";

// const markerIcon = new L.Icon({
//   iconUrl: require("resources/images/marker.png"),
//   iconSize: [40, 40],
//   iconAnchor: [17, 46], //[left/right, top/bottom]
//   popupAnchor: [0, -46], //[left/right, top/bottom]
// });

const GeolocationPinModal = () => {
  const { user } = useUser();
  const geolocationPinModal = useGeolocationPinModal();
  const [isLoading, setIsLoading] = useState(false);

  const { browserLocStatus, browserLocCoords, browserLocData } =
    useBrowserLocation();
  // console.log(browserLocStatus);
  // console.log(browserLocCoords);
  // console.log(browserLocData);

  const { ipLocStatus, ipLocCoords } = useIPLocation();
  // console.log(ipLocStatus);
  // console.log(ipLocCoords);

  // console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      lat: "",
      lon: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!user) return null;

    setIsLoading(true);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Add Your GeolocationPin"
        subtitle="drop your pin on a map!"
      />
      <Input
        id="address"
        label="Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* <MapContainer>
        <Marker position={[ipLocCoords?.lat, ipLocCoords?.lon]}></Marker>
      </MapContainer> */}
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <div></div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={geolocationPinModal.isOpen}
      title="GeolocationPin"
      actionLabel="Drop Pin"
      onClose={geolocationPinModal.onClose}
      // onSubmit={handleSubmit(onSubmit)}
      onSubmit={() => {
        console.log("hey");
      }}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default GeolocationPinModal;
