import { Component } from 'solid-js';
import { Footer } from './components/Footer';
import { Socials } from './components/Socials';
import { Title } from './components/Title';

const App: Component = () => {
  return (
    <div class='mx-auto max-w-64em' p="x-6 y-6vh">
      <Title />
      <Socials />
      <Footer />
    </div>
  );
};

export default App;
