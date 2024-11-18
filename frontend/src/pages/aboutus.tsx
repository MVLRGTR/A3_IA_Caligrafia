import Navbar from "./components/navbar"
import BodyAboutUs from "./components/bodyaboutus"
import Footer from "./components/footer"

export default function AboutUs(){
    return(
        <main className="bg-gradient-to-b from-custom-gr1 to-custom-gr2 m-0 p-0 min-h-screen flex flex-col">
            <Navbar></Navbar>
            <BodyAboutUs></BodyAboutUs>
            <Footer></Footer>
        </main>
    )
}