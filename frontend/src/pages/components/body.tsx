import Image from "next/image"
import logo from "../../../public/CALIA.jpeg"

interface BodyProps{
  redirectToUpload: ()=> void
}

export default function Body({redirectToUpload}:BodyProps){
    return(
        <section className="text-center max-w-4xl p-6 m-auto flex flex-col h-[580px]">
          <Image src={logo} alt="logo" className=" w-[200px] h-[200px] rounded-md  m-auto mb-10 shadow-md"></Image>
          <h1 className="text-custom-blue font-bold text-4xl mb-5">Bem-vindo à Calia</h1>
          <p className="text-custom-blue text-lg mb-4">
            Calia é sua parceira na jornada para melhorar sua caligrafia.
            Oferecemos ferramentas e técnicas personalizadas para ajudar você
            a desenvolver uma escrita mais bonita e legível.
          </p>
          <p className="text-custom-blue text-lg mb-4">
            Seja para os fins profissionais ou pessoais, a Calia está aqui para
            guiar você em cada traço, transformando sua escrita em uma
            expressão única de sua personalidade.
          </p>
          <button className="bg-custom-blue h-[40px] w-[200px] m-auto rounded-md duration-500 hover:scale-110 text-white" onClick={redirectToUpload}>Comece sua jornada</button>

      </section>
    )
}