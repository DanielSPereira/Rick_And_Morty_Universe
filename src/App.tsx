import { CharactersProvider } from "./context/CharactersContext"
import { TabPageWidget } from "./components/TabPageWidget"
import { CardsList } from "./components/CardsList"
import { Toolbar } from "./components/Toolbar"
import { Header } from "./components/Header"

function App() {

  return (
    <div className="App">
      <Header />
      
      <CharactersProvider>
        <Toolbar />
        <TabPageWidget />
        <CardsList />
      </CharactersProvider>


    </div>
  )
}

export default App
