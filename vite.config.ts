import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: "/authqdsj",
	plugins: [react()],
	server: {
		port: 8088,
		proxy: {
			"/api": {
				target: "http://localhost:3100",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
