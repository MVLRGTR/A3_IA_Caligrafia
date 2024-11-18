import Navbar from "./components/navbar"
import ErroMsg from "./components/bodyerro"
import Footer from "./components/footer"
export default function Erro(){
    return(
        <main className="bg-gradient-to-b from-custom-gr1 to-custom-gr2 m-0 p-0 min-h-screen flex flex-col">
            <Navbar></Navbar>
            <ErroMsg></ErroMsg>
            <Footer></Footer>
        </main>
        )
}