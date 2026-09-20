import Footer from "./components/MainComponents/Footer"
import Header from "./components/MainComponents/Header"
import AllRoutes from "./routes/AllRoutes"

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-start">
      <Header/>
      <AllRoutes/>
      <Footer/>
    </div>
  )
}

export default App