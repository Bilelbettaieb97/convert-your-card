import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/modeles")({
  beforeLoad: () => {
    throw redirect({ to: "/builderia" });
  },
  component: () => null,
});
