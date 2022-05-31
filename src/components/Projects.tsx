import { createResource, For, Show } from "solid-js";
import { Project } from "./Project";

const fetchRepos = async (id: string) =>
  (
    await fetch(`https://api.nn.ci/github/users/${id}/repos?per_page=100&sort=pushed`)
  ).json();

export const Projects = () => {
  const [repos] = createResource("Xhofe", fetchRepos);
  return (
    <>
      <h2 class="flex items-center mt-14 mb-4 font-semibold text-3xl">
        <span flex-1 class="outfit">
          Recent Projects
        </span>
        <div
          onClick={() => {
            window.open("https://github.com/Xhofe", "_blank");
          }}
          class="op-50 ml-2 hover:op-100 transition-opacity cursor-pointer"
        >
          <div class="m-2 i-ri-arrow-right-up-line"></div>
        </div>
      </h2>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Show when={repos.loading}>
          <h3>Loding...</h3>
        </Show>
        <For each={repos()}>
          {(item) => {
            const { name, description, html_url } = item as any;
            return (
              <Project name={name} link={html_url} desc={description} icon="" />
            );
          }}
        </For>
      </div>
    </>
  );
};
