import { Component } from "solid-js";
import { Footer } from "./components/Footer";
import { Projects } from "./components/Projects";
import { Socials } from "./components/Socials";
import { Header } from "./components/Header";

const App: Component = () => {
  return (
    <div class="mx-auto max-w-64em" p="x-6 y-6vh">
      <Header />
      <Socials />
      <img w="full" src="https://jsd.nn.ci/gh/Xhofe/Xhofe@main/out/github-contribution-grid-snake.svg" />
      <Projects />
      <Footer />
    </div>
  );
};

export default App;
