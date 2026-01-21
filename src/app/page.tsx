import PokemonLista from "./components/PokemonLista";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonBuscar from "./components/PokemonBuscar";


export default function Home() {
  return (
    <div>
      <Header />
      <PokemonLista />
      <PokemonBuscar />
      <Footer />
    </div>
  );
}
