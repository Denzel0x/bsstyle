import React from "react";

import type { Route } from "./+types/home";

import { useParams } from "react-router";

import ServicePricingPage from "../services/details/pricing/service-pricing-page";
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
      title:
        service && service.title
          ? `${service.title} Pricing | Invorious`
          : "Service Pricing | Invorious",
    },
    {
      name: "description",
      content:
        service && service.description
          ? `Pricing and packages for ${service.title}.`
          : "Pricing and engagement packages.",
    },
  ];
}

export default function ServicePricingRoute() {
  const params = useParams();
  const slug = (params as { slug?: string }).slug;
  return <ServicePricingPage slug={slug} />;
}
