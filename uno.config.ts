import { defineConfig } from "unocss/vite";
import { presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss"

export default defineConfig({
  shortcuts: {
    "anchor-hover": "hover:text-marque-light hover:dark:text-marque",
    // @Button
    "button": "flex items-center justify-center gap-2",
    "button-dropdown-item": "button h-10 w-full justify-left px-3 bg-transparent data-[highlighted]:(bg-ground-3-light dark:bg-ground-3) outline-none text-sm text-summit-light dark:text-summit",
    "button--square-8": "size-8",
    "button--square-10": "size-10",
    "button--square-12": "size-12",
    "button--rectangle-10": "h-10 px-4",
    "button--rectangle-12": "h-12 px-4",
    "button--background": "bg-ground-3-light dark:bg-ground-3 text-summit-light dark:text-summit hover:(bg-ground-4-light dark:bg-ground-4)",
    "button--background-less": "bg-transparent text-summit-light dark:text-summit hover:(text-lesser-light darK:text-lesser)",
    "button--inverse": "bg-ground-0-light dark:bg-ground-0 border border-ground-3-light dark:border-ground-3 rounded-lg hover:(bg-ground-3-light text-summit-light dark:(bg-ground-3 text-white))",
    // @Dialog
    "dialog": "fixed z-10 inset-0 top-0 max-h-100vh overflow-y-auto sm:(inset-initial top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[calc(100vh-5rem)] w-xl)",
    "dialog-overlay": "fixed z-10 inset-0 bg-ground-0-light/90 dark:bg-ground-0/90",
    "dialog--background": "bg-ground-1-light bg-ground-1-light dark:bg-ground-1 border border-ground-3-light dark:border-ground-3 rounded-xl shadow-md",
    // @Header
    "section-header": "min-h-10",
    "heading": "text-summit-light dark:text-summit tracking-tight",
    "heading-1": "heading text-3xl md:text-4xl font-bold",
    "heading-2": "heading text-2xl font-bold",
    "container": "w-full max-w-1538px mx-auto",
    "container--padding": "px-4 md:px-8",
    "input-common": "w-full px-4 bg-transparent outline-none border-b border-ground-3-light dark:border-ground-3 text-summit-light dark:text-summit placeholder-middle resize-none",
    "input-common--input": "h-10 font-bold placeholder-font-normal placeholder-text-sm focus:(border-marque-light dark:border-marque)",
    "input-common--textarea": "min-h-12 py-4 leading-loose",
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