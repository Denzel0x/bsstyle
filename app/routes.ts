import { type RouteConfig, index } from "@react-router/dev/routes";

import { route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("services", "routes/services.tsx"),
  route("services/:slug", "routes/service-details.tsx"),
  route("services/:slug/pricing", "routes/service-pricing.tsx"),
  route("services/:slug/schedule", "routes/service-schedule.tsx"),
  route(
    "services/:slug/schedule/confirmed",
    "routes/service-booking-confirmed.tsx",
  ),
  route("about", "routes/about.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("terms-of-service", "routes/terms-of-service.tsx"),
  route("cookie-policy", "routes/cookie-policy.tsx"),
  route("portfolio/:id?", "routes/portfolio.tsx"),
  route("team/:id?", "routes/team.tsx"),
  route("work-With-us/:id?", "routes/work-with-us.tsx"),
] satisfies RouteConfig;
