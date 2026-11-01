import React from "react";

import type { Route } from "./+types/home";

import { useParams } from "react-router";

import ServiceSchedulePage from "../services/details/pricing/schedule/service-schedule-page";

import { slugifyServiceTitle } from "../../lib/service-slug";

import data from "../../lib/data.json";

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
      title: "Schedule Consultation | Invorious",
    },
    {
      name: "description",
      content:
        service && service.title
          ? `Schedule a consultation for ${service.title}.`
          : "Schedule a consultation with a Invorious consultant.",
    },
  ];
}

export default function ServiceScheduleRoute() {
  const params = useParams();
  const slug = (params as { slug?: string }).slug;
  return <ServiceSchedulePage slug={slug} />;
}
