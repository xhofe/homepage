import type { AttributifyAttributes } from "unocss/dist/preset-attributify";

declare module "solid-js" {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
