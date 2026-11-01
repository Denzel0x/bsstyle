import type { Route } from "./+types/home";

import { useParams } from "react-router";

import ServiceDetailsPage from "../services/details/service-details-page";

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
          ? `${service.title} | Invorious`
          : "Service Details | Invorious",
    },
    {
      name: "description",
      content:
        service && service.description
          ? service.description
          : "Service details and engagement options.",
    },
  ];
}

export default function ServiceDetailsRoute() {
  const params = useParams();
  const slug = (params as { slug?: string }).slug;
  return <ServiceDetailsPage slug={slug} />;
}
