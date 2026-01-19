import PokemonList from "./components/PokemonList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PokemonBuscar from "./components/PokemonBuscar";


export default function Home() {
  return (
    <div>
      <Header />
      <PokemonList />
      <PokemonBuscar />
      <Footer />
    </div>
  );
}
