import { For, Show } from "solid-js";

interface SocialProps {
  data: {
    icon: string;
    link: string;
    class: string;
    text?: string;
  };
}

const SocialItem = (props: SocialProps) => {
  const { data } = props;
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

const socialLists = [
  {
    text: "Github",
    link: "https://github.com/Xhofe",
    icon: "i-ri-github-fill",
    class: "hover:bg-gray-700 dark:hover:bg-white dark:hover:text-gray-900",
  },
  {
    text: "Blog",
    link: "https://nn.ci",
    icon: "i-ri-book-2-line",
    class: "hover:bg-gradient-to-r from-[#fd5949] to-[#d6249f]",
  },
  {
    text: "",
    link: "https://stackoverflow.com/users/10545416/xhofe",
    icon: "i-logos-stackoverflow-icon",
    class: "hover:bg-gradient-to-r from-#ff820022 to-[#ff820099]",
  },
  {
    text: "",
    link: "https://twitter.com/Xh0fe",
    icon: "i-ri-twitter-fill",
    class: "hover:bg-[#00ACEE]",
  },
  {
    text: "",
    link: "https://space.bilibili.com/1520762073",
    icon: "i-ri-bilibili-fill",
    class: "hover:bg-[#fb7299]",
  },
];

export const Socials = () => {
  return (
    <div mt-4>
      <For each={socialLists}>{(item) => <SocialItem data={item} />}</For>
    </div>
  );
};
