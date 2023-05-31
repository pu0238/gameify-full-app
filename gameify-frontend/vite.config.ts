import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  plugins: [vue()],
});
