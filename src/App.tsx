import { Component } from "solid-js";
import { Footer } from "./components/Footer";
import { Projects } from "./components/Projects";
import { Socials } from "./components/Socials";
import { Title } from "./components/Title";

const App: Component = () => {
  return (
    <div class="mx-auto max-w-64em" p="x-6 y-6vh">
      <Title />
      <Socials />
      <Projects />
      <Footer />
    </div>
  );
};

export default App;
