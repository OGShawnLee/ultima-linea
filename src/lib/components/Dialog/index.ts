import _Content from "./Content.svelte";
import { Dialog as _Dialog } from "bits-ui";

export namespace Dialog {
	export const Root = _Content;
	export const Trigger = _Dialog.Trigger;
  export const Close = _Dialog.Close;
}