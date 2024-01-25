import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [react()],
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["src/setupTest.ts"],
		coverage: {
			reportsDirectory: "./documentation/tests/coverage",
			reporter: ["html"],
		},
	},
}));
