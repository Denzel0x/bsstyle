import React from "react";

import type { Route } from "./+types/home";

import { useParams } from "react-router";

import data from "../../lib/data.json";
import { slugifyServiceTitle } from "../../lib/service-slug";

import ServiceBookingConfirmedPage from "../services/details/pricing/schedule/confirmed/service-booking-confirmed-page";

export function meta({ params }: Route.MetaArgs) {
  const slug = (params as { slug?: string } | undefined)?.slug;
  const homePageData = (data as HomePageData).homePage;

  const service =
    slug &&
    homePageData.services.items.find(
      (s) => slugifyServiceTitle(s.title) === slug,
    );

  return [
    {
      title: "Booking Confirmed | Invorious",
    },
    {
      name: "description",
      content:
        service && service.title
          ? `Your consultation for ${service.title} is confirmed.`
          : "Your consultation is confirmed.",
    },
  ];
}

export default function ServiceBookingConfirmedRoute() {
  const params = useParams();
  const slug = (params as { slug?: string }).slug;
  return <ServiceBookingConfirmedPage slug={slug} />;
}
