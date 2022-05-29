import { CharactersProvider } from "./context/CharactersContext"
import { Content } from "./components/Content"
import { Header } from "./components/Header"

function App() {

  return (
    <div className="App">
      <Header />

      <CharactersProvider>
        <Content />
      </CharactersProvider>
    </div>
  )
}

export default App
