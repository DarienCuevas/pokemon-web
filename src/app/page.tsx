import PokemonLista from "./components/PokemonLista";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonBuscar from "./components/PokemonBuscar";
import Card from "./components/Card";


export default function Home() {
  return (
    <div>
      <Header />
      <PokemonLista />
      <PokemonBuscar />
      <Card />
      <Footer />
    </div>
  );
}
