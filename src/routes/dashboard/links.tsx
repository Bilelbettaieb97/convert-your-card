import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/links")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/content", replace: true });
  },
  component: () => null,
});
