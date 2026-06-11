import { defineConfig, type PluginOption } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      client: { entry: "./client" },
    }),
    react(),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(
      ...nitro({
        preset: "vercel",
        handlers: [
          { middleware: true, handler: "./server/middleware/stripe-webhook" },
          { middleware: true, handler: "./server/middleware/auth" },
          { middleware: true, handler: "./server/middleware/checkout-embedded" },
          { middleware: true, handler: "./server/middleware/relance-click" },
          { middleware: true, handler: "./server/middleware/send-relance" },
          { middleware: true, handler: "./server/middleware/builder-relance-click" },
          { middleware: true, handler: "./server/middleware/send-builder-relance" },
          { middleware: true, handler: "./server/middleware/cron-daily" },
          { middleware: true, handler: "./server/middleware/vitrine-upgrade-click" },
          { middleware: true, handler: "./server/middleware/send-vitrine-relance" },
          { middleware: true, handler: "./server/middleware/generate-card-stream" },
        ],
      })
    );
  }

  return { plugins };
});
