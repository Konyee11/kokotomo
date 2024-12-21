import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
            },
            "/profile/api": {
                target: "http://localhost:3000",
                rewrite: (path) => path.replace(/^\/profile\/api/, "/api"), // `/profile/api` を `/api` に置き換え
            },
        },
    },
});
