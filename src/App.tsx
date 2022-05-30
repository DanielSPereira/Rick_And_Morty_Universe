import { CharactersProvider } from "./context/CharactersContext"
import { CardsList } from "./components/CardsList"
import { Toolbar } from "./components/Toolbar"
import { Header } from "./components/Header"

function App() {

  return (
    <div className="App">
      <Header />
      
      <CharactersProvider>
        <Toolbar />
        
        <CardsList />
      </CharactersProvider>
    </div>
  )
}

export default App
