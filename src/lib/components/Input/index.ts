import _Checkbox from "./Checkbox.svelte";
import _Error from "./Error.svelte";
import _Group from "./Group.svelte";
import _Input from "./Input.svelte";
import _Label from "./Label.svelte";
import _Root from "./Root.svelte";
import _TextArea from "./TextArea.svelte";
import Uploader from "./Uploader.svelte";

export { Uploader };

export namespace Input {
  export const Checkbox = _Checkbox;
  export const Error = _Error;
  export const Group = _Group;
  export const Input = _Input;
  export const Label = _Label;
  export const Root = _Root;
  export const TextArea = _TextArea;
};