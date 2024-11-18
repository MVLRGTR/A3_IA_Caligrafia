import Navbar from './components/navbar'
import Body from './components/body'
import Footer from './components/footer'
import { useRouter } from "next/router"


export default function Home() {

  const router = useRouter()

    function redirectToUpload() {
        router.push('/upload')
    }

  return (
    <main className="bg-gradient-to-b from-custom-gr1 to-custom-gr2 m-0 p-0 min-h-screen flex flex-col">
      <Navbar></Navbar>
      <Body redirectToUpload={redirectToUpload}></Body>
      <Footer></Footer>
    </main>

  )
}
