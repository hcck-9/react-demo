// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [
    {
      "flex-center": "flex flex-justify-center flex-items-center",
      btn: "flex flex-justify-center flex-items-center px-4 py-2 border border-gray-300 border-solid text-sm font-medium rounded-sm  hover:border-indigo-500 hover:text-indigo-500 focus:outline-none",
      "btn-primary":
        "text-white bg-indigo-600 border-transparent hover:bg-indigo-500 hover:text-white",
      "btn-lg": "leading-6",
    },
  ],
});
