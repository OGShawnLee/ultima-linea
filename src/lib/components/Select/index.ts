import _Content from "./Content.svelte";
import _Trigger from "./Trigger.svelte";
import Multiple from "./Multiple.svelte";
import Single from "./Single.svelte";
import { Select as _Select } from "bits-ui";

export namespace Select {
	export const Content = _Content;
	export const Input = _Select.Input;
	export const Root = { Multiple, Single };
	export const Trigger = _Trigger;
	export const Value = _Select.Value;
}