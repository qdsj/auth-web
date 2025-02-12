import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: "/authqdsj",
	plugins: [react()],
	// build: {
	// 	minify: false,
	// 	sourcemap: true,
	// },
	server: {
		port: 3111,
		proxy: {
			"/api": {
				target: "http://localhost:3100",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
