import type { Route } from "./+types/home";

import data from "../../lib/data.json";

import { useParams } from "react-router";

import PortfolioComponent from "../portfolio/portfolio";

import CaseStudyDetailsPage from "../portfolio/case-study-details";

export function meta({ params }: Route.MetaArgs) {
  const id = (params as { id?: string } | undefined)?.id;

  const caseStudy = id
    ? (data as PortfolioData).portfolio.caseStudies.find((c) => c.slug === id)
    : undefined;

  return [
    {
      title: caseStudy?.title
        ? `${caseStudy.title} - Invorious`
        : "Portfolio | Invorious",
    },
    {
      name: "description",
      content: caseStudy?.description
        ? caseStudy.description
        : "Discover how Invorious guides businesses across the blockchain divide. From traditional enterprises to Web3 natives, explore our portfolio of measurable results in blockchain development, marketing, and advisory-turning decentralized complexity into strategic growth.",
    },
  ];
}

export default function PortfolioRoute() {
  const params = useParams();
  const id = (params as { id?: string }).id;

  if (id) return <CaseStudyDetailsPage />;
  return <PortfolioComponent />;
}
