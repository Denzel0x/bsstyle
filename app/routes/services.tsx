import type { Route } from "./+types/home";

import ServicesComponent from "../services/services";

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: "Services |  Invorious",
    },
    {
      name: "description",
      content:
        "Explore our services across blockchain strategy, DeFi and tokenomics, Web3 transformation, smart contract development, sustainable blockchain solutions, and community & human capital development.",
    },
  ];
}

export default function ServicesRoute() {
  return <ServicesComponent />;
}
