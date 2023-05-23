import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import theme from "../styles/styles";

import { PageLayout } from "~/components/layout";
import Globe from "~/components/globe/globe";
import GeolocationPinCard from "~/components/geolocation-pins/geolocation-pin-card";

import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Jumbotron = () => {
  // const { data } = api.geolocationPins.getAll.useQuery();

  // if (!data) return null;

  // const scaffolding = (
  //   <div className="text-slate-100">scaffolding... come back later 🚧🏗️👷‍♂️</div>
  // );

  return (
    <div
      className={`${theme.bg.primary} ${theme.h.contentShrunkWithCb} flex w-full justify-center`}
    >
      <div className="flex items-center justify-center">
        {/* {data.map(({ geolocationPin: pin, user }) => (
          <div key={pin.id}>{`${pin.lat} ${pin.lon}`}</div>
        ))} */}

        <Globe />

        {/* {scaffolding} */}
      </div>
    </div>
  );
};

type GeolocationPinWithUser =
  RouterOutputs["geolocationPins"]["getAll"][number];
const CardSection = () => {
  const { data } = api.geolocationPins.getAll.useQuery();

  if (!data) return null;

  return (
    <div className={`flex w-full justify-center`}>
      <div>
        {data.map((geolocationPinWithUser: GeolocationPinWithUser) => {
          const { geolocationPin: pin, user } = geolocationPinWithUser;

          return (
            <GeolocationPinCard key={pin.id} {...geolocationPinWithUser} />
          );
        })}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className={`${theme.bg.navbarBackground} w-full`}>
      <div className="flex items-center justify-center py-2 text-gray-500">
        <span>©2023 @hutajoullach</span>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.geolocationPins.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <PageLayout>
        <Jumbotron />
        <CardSection />
        <Footer />
      </PageLayout>
    </>
  );
};

export default Home;
