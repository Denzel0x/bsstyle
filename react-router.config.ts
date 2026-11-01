import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Pre-render only the homepage for faster initial load
  async prerender() {
    return ["/"];
  },
} satisfies Config;

// import type { Config } from "@react-router/dev/config";

// export default {
//   // Config options...
//   // Server-side render by default, to enable SPA mode set this to `false`
//   ssr: false,
// } satisfies Config;

// import type { Config } from "@react-router/dev/config";

// export default {
//   ssr: true,
//   future: {
//     v8_splitRouteModules: false,
//   },
//   routeDiscovery: {
//     mode: "initial", // Forces all routes to be loaded upfront
//   },
// } satisfies Config;