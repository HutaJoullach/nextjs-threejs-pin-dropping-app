import { useUser, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import useGeolocationPinModal from "~/store/geolocationPinModalStore";
import theme from "../../styles/styles";
import {
  travelPinGlobeLogo,
  travelPinGlobeBlack,
  travelPinGlobeCircle,
  travelPinGlobeCircleBlack,
  travelPinGlobeSquare,
} from "../../assets";
import Search from "./search";

import { GoOctoface, GoSignIn, GoPin } from "react-icons/go";

const Navbar = () => {
  const { route } = useRouter();

  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const geolocationPinModal = useGeolocationPinModal();

  const logo = travelPinGlobeSquare as StaticImageData;

  return (
    <nav
      className={`${theme.p.x.sm} ${theme.bg.navbarBackground} ${theme.h.navbar} fixed top-0 z-20 flex w-full items-center shadow-sm`}
    >
      <div
        className={`flex w-full flex-row items-center justify-between gap-3 md:gap-0`}
      >
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={logo}
            className="hidden cursor-pointer md:block"
            width={70}
            height={70}
            alt="logo"
          />
        </Link>

        <Search />

        <ul className="hidden list-none flex-row items-center gap-3 sm:flex">
          <li className="cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-300">
              <div onClick={geolocationPinModal.onOpen}>
                <GoPin size={29} color="black" />
              </div>
            </div>
          </li>

          <li className="cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-300">
              <a
                target="_blank"
                href="https://github.com/HutaJoullach/nextjs-threejs-pin-dropping-app"
                rel="noopener noreferrer"
              >
                <GoOctoface size={30} color="black" />
              </a>
            </div>
          </li>

          {!isSignedIn && (
            <li className="cursor-pointer">
              <div className=" flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-300">
                <Link href={"/signin/"}>
                  <div className="mt-1">
                    <GoSignIn size={30} color="black" />
                  </div>
                </Link>
              </div>
            </li>
          )}

          {!!isSignedIn && (
            <li className="flex cursor-pointer gap-1 text-xs">
              <UserButton />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
