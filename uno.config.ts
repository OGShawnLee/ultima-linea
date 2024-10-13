import { defineConfig } from "unocss/vite";
import { presetUno, transformerDirectives, transformerVariantGroup } from "unocss"

export default defineConfig({
  shortcuts: {
    "button": "flex items-center",
    "button--lesser": "bg-ground-3 hover:bg-ground-4 border-focus-effect",
    "border-focus-effect": "", // we will handle focus states later on
  },
  theme: {
    colors: {
      "ground-0": "#000000",
      "ground-1": "#0A0A0A",
      "ground-2": "#171717",
      "ground-3": "#262626",
      "ground-4": "#525252",
      "common": "#A3A3A3",
      "lesser": "#737373",
      "marque": "#38BDF8",
    },
    fontFamily: {
      "geist": "Geist, sans-serif"
    }
  },
  transformers: [
    transformerDirectives({ "applyVariable": "--uno" }),
    transformerVariantGroup(),
  ],
  presets: [
    presetUno()
  ]
})