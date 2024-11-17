import Navbar from './components/navbar'
import Footer from './components/footer'
import Image from "next/image"
import logo from "../../public/CALIA.jpeg"

export default function Home() {

  return (
    <div className="bg-gradient-to-b from-custom-gr1 to-custom-gr2 m-0 p-0 min-h-screen flex flex-col">
      <Navbar></Navbar>
      <section className="text-center max-w-3xl p-6 m-auto">
          <Image src={logo} alt="logo" className=" w-[200px] h-[200px] rounded-md  m-auto"></Image>
          <h2 className="text-custom-hover">Bem-vindo à Calia</h2>
          <p className="text-custom-hover">
            Calia é sua parceira na jornada para melhorar sua caligrafia.
            Oferecemos ferramentas e técnicas personalizadas para ajudar você
            a desenvolver uma escrita mais bonita e legível.
          </p>
          <p className="text-custom-hover">
            Seja para os fins profissionais ou pessoais, a Calia está aqui para
            guiar você em cada traço, transformando sua escrita em uma
            expressão única de sua personalidade.
          </p>
          <button id="startButton">Comece sua jornada</button>

      </section>
      <Footer></Footer>
    </div>
  
  )
}
