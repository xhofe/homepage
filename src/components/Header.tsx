import { For, onCleanup } from "solid-js";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { data } from "~/data";

const sentences = data.sentences;

const colorIcons = {
  auto: "i-twemoji-snowflake",
  light: "i-twemoji-bright-button",
  dark: "i-twemoji-first-quarter-moon-face",
};

type ColorMode = keyof typeof colorIcons;

export const Header = () => {
  const [color, setColor] = useLocalStorage<ColorMode>("color-scheme", "auto");
  if (!Object.keys(colorIcons).includes(color())) {
    setColor("auto");
  }
  const switchColor = () => {
    const colors = Object.keys(colorIcons);
    const index = colors.indexOf(color());
    const nextColor = colors[(index + 1) % colors.length] as ColorMode;
    setColor(nextColor);
    setClass(nextColor);
  };

  const setClass = (color: string) => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (color === "dark" || (prefersDark && color !== "light"))
      document.documentElement.classList.toggle("dark", true);
    else {
      document.documentElement.classList.toggle("dark", false);
    }
  };

  const listener = () => {
    setClass(color());
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", listener);

  onCleanup(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", listener);
  });

  let avatar = `https://github.com/${data.github}.png`;
  if (data.avatar) {
    avatar = data.avatar;
  }

  return (
    <div>
      <div display="flex" flex="row">
        <div m="r-4">
          <img src={avatar} alt="avatar" h="20" class="rounded-40%" />
        </div>
        <div>
          <div display="flex">
            <div text="4xl" font="bold">
              Hello,
            </div>
            <div
              text="2xl"
              class={colorIcons[color()]}
              cursor="pointer"
              opacity="80"
              hover="op-100"
              onClick={switchColor}
            ></div>
          </div>
          <div text="4xl" p="y-1" font="bold">
            I'm {data.name}.
          </div>
        </div>
      </div>
      <For each={sentences}>{(item) => <p text="md">{item}</p>}</For>
    </div>
  );
};
