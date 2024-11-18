import Navbar from "./components/navbar"
import BodyResult from "./components/bodyresult"
import Footer from "./components/footer"

export default function Result() {

    return (
        <main className="bg-gradient-to-b from-custom-gr1 to-custom-gr2 m-0 p-0 min-h-screen flex flex-col">
            <Navbar></Navbar>
            <BodyResult></BodyResult>
            <Footer></Footer>
        </main>

    )
}