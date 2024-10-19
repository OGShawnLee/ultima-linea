import { defineConfig } from "unocss/vite";
import { presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss"

export default defineConfig({
  shortcuts: {
    "button": "flex items-center justify-center gap-2",
    "button--lesser": "text-summit-light dark:text-summit bg-ground-3-light dark:bg-ground-3 hover:(bg-ground-4-light dark:bg-ground-4) border-focus-effect",
    "button--icon": "text-summit-light dark:text-summit hover:text-lesser border-focus-effect",
    "border-focus-effect": "", // we will handle focus states later on
    "section-header": "min-h-10",
    "heading-1": "text-3xl md:text-4xl text-summit-light dark:text-summit font-bold",
    "heading-2": "text-2xl text-summit-light dark:text-summit tracking-tight font-bold",
    "container": "w-full max-w-1538px mx-auto",
    "container--padding": "px-4 md:px-8",
  },
  theme: {
    colors: {
      "ground-0": "#000000",
      "ground-0-light": "#F5F5F5",
      "ground-1": "#0A0A0A",
      "ground-1-light": "#FFFFFF",
      "ground-2": "#171717",
      "ground-3": "#262626",
      "ground-3-light": "#D4D4D4",
      "ground-4": "#525252",
      "ground-4-light": "#A3A3A3",
      "common": "#D4D4D4",
      "common-light": "#404040",
      "middle": "#737373",
      "lesser": "#A3A3A3",
      "lesser-light": "#525252",
      "marque": "#38BDF8",
      "marque-light": "#0284C7",
      "summit": "#FFFFFF",
      "summit-light": "#000000",
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
    presetUno(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        "satoshi": "Satoshi",
      }
    })
  ]
})