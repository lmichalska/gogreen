import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // this on might be "import react from "@vitejs/plugin-react";" in your solution


export default defineConfig(({ command }) => {
    const config = {
        plugins: [react()],
        base: "/"
    };

    if (command !== "serve") {
        config.base = "/gogreen";
    }

    return config;
});