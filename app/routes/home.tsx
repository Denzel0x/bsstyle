import type { Route } from "./+types/home";

import Welcome from "../home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Invorious | Premium Web3 Consulting" },
    {
      name: "description",
      content:
        "Premium Web3 consulting and development with global expertise-turning complex blockchain challenges into measurable growth.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
