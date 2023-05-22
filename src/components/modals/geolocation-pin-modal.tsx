import { useCallback, useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";

import { emojis, svgicons } from "../../constants";
import useGeolocationPinModal from "~/store/geolocationPinModalStore";
import useBrowserLocation from "../../hooks/use-browser-location";
import useIPLocation from "../../hooks/use-ip-location";

import Modal from "./modal";
import Button from "../button";
import Heading from "../heading";
import Input from "../inputs/input";
import TextArea from "../inputs/textarea";
import IconInput from "../inputs/icon-input";

import { toast } from "react-hot-toast";
import clsx from "clsx";

import { SketchPicker, ColorChangeHandler, ColorResult } from "react-color";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
const BasicMap = dynamic(() => import("../leaflet/basic-map"), { ssr: false });

enum STEPS {
  GEOLOCATION = 0,
  MAPICON = 1,
  MESSAGE = 2,
}

const GeolocationPinModal = () => {
  const { user } = useUser();
  const geolocationPinModal = useGeolocationPinModal();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedIconType, setSelectedIconType] = useState<"emoji" | "svg">(
    "emoji"
  );
  const [pickedColor, setPickedColor] = useState("#000000");
  const handleOnChangeColor = (color: ColorResult) => {
    setPickedColor(color.hex);
  };
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const [step, setStep] = useState(STEPS.GEOLOCATION);

  const [userLocCoords, setUserLocCoords] = useState({
    lat: -77.508333,
    lng: 164.754167,
  });

  const { ipLocStatus, ipLocCoords } = useIPLocation();
  // console.log(ipLocStatus);
  // console.log(ipLocCoords);

  useEffect(() => {
    if (
      ipLocStatus === "success" &&
      ipLocCoords?.lat !== undefined &&
      ipLocCoords?.lon !== undefined &&
      geolocationPinModal.isOpen
    ) {
      setTimeout(() => {
        setUserLocCoords({
          lat: ipLocCoords?.lat,
          lng: ipLocCoords?.lon,
        });
      }, 500);
    }
  }, [ipLocStatus, ipLocCoords, geolocationPinModal.isOpen]);

  useEffect(() => {
    if (!geolocationPinModal.isOpen) {
      setUserLocCoords({
        lat: -77.508333,
        lng: 164.754167,
      });
    }
  }, [geolocationPinModal.isOpen]);

  const { browserLocStatus, browserLocCoords, browserLocData } =
    useBrowserLocation();
  // console.log(browserLocStatus);
  // console.log(browserLocCoords);
  // console.log(browserLocData);

  const getBrowserLocation = () => {
    if (
      browserLocStatus === "success" &&
      browserLocCoords?.coords.latitude !== undefined &&
      browserLocCoords?.coords.longitude !== undefined
    ) {
      setUserLocCoords({
        lat: browserLocCoords?.coords.latitude,
        lng: browserLocCoords?.coords.longitude,
      });
    }
  };

  // console.log(user);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      lat: "",
      lon: "",
      country: "",
      countrycode: "",
      city: "",
      timezone: "",
      emoji: "",
      svgicon: "",
      icontype: "",
      svgiconcolor: "",
      message: "",
    },
  });

  // const lat = watch("lat");
  // const lon = watch("lon");
  const emoji = watch("emoji");
  const svgicon = watch("svgicon");
  const icontype = watch("icontype");
  const svgiconcolor = watch("svgiconcolor");
  const message = watch("message");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // if (!user) return null;

    if (step !== STEPS.MESSAGE) return onNext();

    setIsLoading(true);

    setCustomValue("lat", userLocCoords.lat);
    setCustomValue("lon", userLocCoords.lng);
    setCustomValue("country", ipLocCoords?.country);
    setCustomValue("countrycode", ipLocCoords?.countryCode);
    setCustomValue("city", ipLocCoords?.city);
    setCustomValue("timezone", ipLocCoords?.timezone);
    // setCustomValue("svgicon", {});
    // setCustomValue("icontype", {});
    // setCustomValue("svgiconcolor", {});

    // use mutation
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.MESSAGE) return "Drop Pin";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.GEOLOCATION) return undefined;

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Add Your GeolocationPin"
        subtitle="drop your pin on globe!"
      />
      <BasicMap userLocCoords={userLocCoords} />

      {/* <Input
        id="address"
        label="Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}

      <Button
        onClick={getBrowserLocation}
        label="Use Browser Location"
        small
        outline
      />

      {browserLocStatus === "failed" && (
        <span className="-mb-5 -mt-3 flex text-red-400">
          <svg
            className="h-6 w-6 fill-current text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
          <span>failed to get browser geolocation</span>
        </span>
      )}
    </div>
  );

  if (step === STEPS.MAPICON) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Pick Your Map Icon"
          subtitle="choose map icon you want to use!"
        />
        {/* <Input
          id="emoji"
          label="Emoji"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        /> */}

        <div className="flex flex-wrap border-b border-gray-200 border-slate-800 text-center text-sm font-medium">
          <div onClick={() => setSelectedIconType("emoji")} className="mr-2">
            <p
              className={clsx(
                "inline-block rounded-t-lg px-6 py-2 text-gray-600",
                {
                  "border-slate-800 bg-slate-800 text-white":
                    selectedIconType === "emoji",
                }
              )}
            >
              emoji
            </p>
          </div>
          <div onClick={() => setSelectedIconType("svg")} className="mr-2">
            <p
              className={clsx(
                "inline-block rounded-t-lg px-6 py-2 text-gray-600",
                {
                  "border-slate-800 bg-slate-800 text-white":
                    selectedIconType === "svg",
                }
              )}
            >
              svg
            </p>
          </div>
        </div>

        {selectedIconType === "emoji" && (
          <>
            <div className="mb-5 flex flex-row items-center justify-between gap-2 overflow-x-auto pb-5">
              {emojis.map((item) => (
                <IconInput
                  onClick={(emoji) => setCustomValue("emoji", emoji)}
                  selected={emoji === item.label}
                  label={item.label}
                  emoji={item.emoji}
                />
              ))}
            </div>
            <span className="h-3"></span>
          </>
        )}

        {selectedIconType === "svg" && (
          <>
            <div className="flex flex-row items-center justify-between gap-2 overflow-x-auto pb-5">
              {svgicons.map((item) => (
                <IconInput
                  onClick={(svgicon) => setCustomValue("svgicon", svgicon)}
                  selected={svgicon === item.label}
                  label={item.label}
                  svgIcon={item.svg}
                  svgColor={pickedColor}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setIsColorPickerOpen((prevState) => {
                  return !prevState;
                })
              }
              className="flex-start flex w-fit rounded-lg bg-slate-800 px-5 py-2 text-sm font-medium text-white"
            >
              change svg color
            </button>

            {isColorPickerOpen && (
              <div className="-translate-x-1/6 absolute left-1/2 top-1/2 -translate-y-1/2 transform">
                <SketchPicker
                  color={pickedColor}
                  onChangeComplete={handleOnChangeColor}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  if (step === STEPS.MESSAGE) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add Your Message"
          subtitle="give some message to your map icon!"
        />

        <TextArea
          id="message"
          label="Message"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={geolocationPinModal.isOpen}
      title="GeolocationPin"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.GEOLOCATION ? undefined : onBack}
      onClose={geolocationPinModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default GeolocationPinModal;
