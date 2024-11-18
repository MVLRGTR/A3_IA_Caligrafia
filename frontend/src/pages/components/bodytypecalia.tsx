import Image from "next/image"
import copperplate from '../../../public/images/Copperplate.jpg'
import gotica from '../../../public/images/gotica.jpg'
import italiana from '../../../public/images/italiana.jpg'
import moderna from '../../../public/images/Moderna.jpg'
import { useRouter } from "next/router"

export default function BodyTypeCalia(){

    const router = useRouter()

    function redirectToUpload() {
        router.push('/upload')
    }

    return(
        <div className="m-auto flex flex-col">
            <h1 className="text-4xl font-bold m-auto text-custom-blue mb-5 mt-20" >Tipos de Caligrafia</h1>
            <article className="flex flex-row">
                <Image src={copperplate} alt='copperplate' className="w-[120px] h-[120px] rounded-lg m-auto"></Image>
                <div className="m-auto ml-5 w-[750px] flex flex-col">
                    <h2 className="text-custom-blue font-bold text-lg ">Caligrafia Copperplate</h2>
                    <p className="text-custom-blue "><span className="font-semibold">Características:</span> Reconhecida por seus traços finos e uniformes, com letras inclinadas e linhas ascendentes e descendentes bem definidas. É popular pela sua beleza e elegância.</p>
                    <p className="text-custom-blue"><span className="font-semibold">Aplicações:</span> Usada em certificados, convites de casamento e outros documentos formais.</p>
                </div>
            </article>
            <article className="flex flex-row mt-5">
                <Image src={gotica} alt='copperplate' className="w-[120px] h-[120px] rounded-lg m-auto"></Image>
                <div className="m-auto ml-5 w-[750px] flex flex-col">
                    <h2 className="text-custom-blue font-bold text-lg ">Caligrafia Gotica</h2>
                    <p className="text-custom-blue "><span className="font-semibold">Características:</span> Também conhecida como Blackletter, é caracterizada por suas linhas grossas e finas contrastantes e ângulos agudos. Surgiu na Europa durante a Idade Média e era frequentemente usada em manuscritos religiosos.</p>
                    <p className="text-custom-blue"><span className="font-semibold">Aplicações:</span>  Muito usada em convites formais, logotipos de marcas de luxo e títulos de obras históricas.</p>
                </div>
            </article>
            <article className="flex flex-row mt-5">
                <Image src={italiana} alt='copperplate' className="w-[120px] h-[120px] rounded-lg m-auto"></Image>
                <div className="m-auto ml-5 w-[750px] flex flex-col">
                    <h2 className="text-custom-blue font-bold text-lg ">Caligrafia Italiana</h2>
                    <p className="text-custom-blue "><span className="font-semibold">Características:</span> Esta caligrafia é mais fluida e elegante, com traços suaves e curvas. Originada no Renascimento, era popular entre escribas italianos.</p>
                    <p className="text-custom-blue"><span className="font-semibold">Aplicações:</span>Ideal para convites e cartas pessoais, pois é mais legível e sofisticada.</p>
                </div>
            </article>
            <article className="flex flex-row mt-5 mb-20">
                <Image src={moderna} alt='copperplate' className="w-[120px] h-[120px] rounded-lg m-auto"></Image>
                <div className="m-auto ml-5 w-[750px] flex flex-col">
                    <h2 className="text-custom-blue font-bold text-lg ">Caligrafia Moderna</h2>
                    <p className="text-custom-blue "><span className="font-semibold">Características:</span> Este estilo é mais flexível, com variações criativas nas formas das letras. Pode ser mais descontraído e é frequentemente usado para dar um toque pessoal aos textos.</p>
                    <p className="text-custom-blue"><span className="font-semibold">Aplicações:</span> Perfeita para design gráfico, bullet journals e peças de arte modernas.</p>
                </div>
            </article>
            <div className="mb-8 flex">
                <button className="bg-custom-blue h-[40px] w-[160px] m-auto rounded-md duration-500 hover:scale-110 text-white " onClick={redirectToUpload}>Ver Meu Tipo</button>
            </div>
        </div>
    )
}