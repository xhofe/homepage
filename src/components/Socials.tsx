import { For, Show } from "solid-js";
import { data } from "~/data";

export interface SocialProps {
  icon: string;
  link: string;
  class: string;
  text?: string;
}

const SocialItem = (data: SocialProps) => {
  return (
    <a
      class={`inline-flex text-current px-3 py-2 mt-2 mr-2 rounded-md transition-colors decoration-none ${data.class} hover:text-white`}
      bg="gray-500/10 dark:gray-400/10"
      href={data.link}
      target="_blank"
    >
      <div text-lg>
        <div class={data.icon} />
      </div>
      <Show when={data.text}>
        <div text-sm ml-1 font-500>
          {data.text}
        </div>
      </Show>
    </a>
  );
};

const socialLists: SocialProps[] = data.socials;

export const Socials = () => {
  return (
    <div mt-4>
      <For each={socialLists}>{(item) => <SocialItem {...item} />}</For>
    </div>
  );
};
