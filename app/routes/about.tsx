import type { Route } from "./+types/home";

import AboutComponent from "../about/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us | Invorious" },
    {
      name: "description",
      content:
        "Invorious is a Web3-native consulting, advisory, and development firm. Whether you're a traditional enterprise, startup, or Web3 entity, we help you make the most of the decentralized economy through expert guidance and cutting-edge blockchain development. We are your guides in Web3.",
    },
  ];
}

export default function AboutRoute() {
  return <AboutComponent />;
}
