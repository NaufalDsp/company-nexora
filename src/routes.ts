import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("portfolio/:slug", "routes/project-detail.tsx"),
] satisfies RouteConfig;
