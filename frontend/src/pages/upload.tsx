import Navbar from "./components/navbar"
import BodyUpload from "./components/bodyupload"
import Footer from "./components/footer"

export default function Upload() {
    return (
        // <main className="bg-gradient-to-b from-custom-gr1 to-custom-gr2 m-0 p-0 min-h-screen flex flex-col">
        //     <Navbar></Navbar>
        //     <BodyUpload></BodyUpload>
        //     <Footer></Footer>
        // </main>
        <main className="relative bg-custom-bg bg-center bg-no-repeat bg-cover from-custom-gr1 to-custom-gr2 m-0 p-0 min-h-screen flex flex-col">
            <div className="absolute inset-0 bg-white/50"></div>
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <BodyUpload></BodyUpload>
                <Footer />
            </div>
        </main>
    )
}
