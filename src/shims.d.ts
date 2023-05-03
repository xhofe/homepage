import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}

declare module "solid-js" {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
