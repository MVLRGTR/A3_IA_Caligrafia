import Image from "next/image"
import Link from "next/link"
import imageImport from "../../../public/images/import.png"
import matrix from "../../../public/images/matrix.png"
import vetor from "../../../public/images/vetor.png"
import vetores from "../../../public/images/vetores.png"
import similaridade from "../../../public/images/cossenos.png"
import codigo from "../../../public/images/codigo.png"
import github from "../../../public/logogithub.png"

const tagp = {
    marginTop: '0.80rem',
    color: '#1a2639',
    fontWeight: 'bold'
}

export default function BodyAboutUs() {
    return (
        <div className="m-auto flex flex-col">
            <h1 className="text-4xl font-bold m-auto text-custom-blue mt-8">Projeto A3</h1>
            <p className=" w-[750px] m-auto mt-6 text-lg font-semibold text-center text-custom-blue">Esse projeto foi desenvolvido para a Avaliação nº3, que consiste em colocar em prática o conhecimento adquirido em sala de aula e demonstrar a aplicação dos conceitos de forma funcional. O objetivo principal é criar uma solução que reúna as habilidades e técnicas aprendidas durante o curso de inteligência artificial ,focando no aprendizado dos modelos de I.A.</p>
            <p className="w-[750px] m-auto mt-6 text-lg font-semibold text-center text-custom-blue">O projeto foi desenvolvido pelos alunos : <strong>Henrique Rocha</strong> , <strong>Marcos Ribeiro</strong> , <strong>Pedro Martins</strong> , <strong>Rafael Ribeiro</strong> e <strong>Sergio</strong> ambos cursando Ciência da computação na Unifacs , campus C.T.N na U.C de Inteligência Artificial com a professora Camila Moura Ferreira dos Santo</p>
            <section className="flex flex-col">
                <h1 className="text-4xl font-bold m-auto text-custom-blue mt-8">Funcionamento do Algoritmo</h1>
                <p className=" w-[750px] m-auto mt-6 text-lg font-semibold text-center text-custom-blue">O algoritmo que nós construímos para fazer o reconhecimento das vogais, se baseia no princípio de similaridade de cossenos, onde fazemos o tratamento prévio da imagem, transformando-a em um dado computacional e depois aplicando a equação da trigonometria de similaridade de cossenos.</p>
                <article className="flex flex-col w-[650px] m-auto mt-14">
                    <h2 className="m-auto text-xl font-semibold text-center text-custom-blue ">Etapa 1: Pré-processamento das imagens</h2>
                    <Image src={imageImport} alt="imports" className="rounded-lg m-auto mt-3"></Image>
                    <p style={tagp}>•	A imagem de entrada é carregada utilizando cv2.imread e aplicado um filtro cinza cv2.IMREAD_GRAYSCALE.</p>
                    <p style={tagp}>•	Depois redimensionamos a imagem para 100x100 pixels.</p>
                    <p style={tagp}>•	A imagem com resize tem o formato de dados de uma matrix, isso acontece porque toda imagem e formada por pixel e cada pixel é formado por um conjunto RGB , no nosso caso utilizamos o filtro cinza , fazendo assim com que cada pixel contenha apenas agora um valor, onde 0 representa a cor preta , 255 o branco e valores intermediários representam tons de cinza.</p>
                    <Image src={matrix} alt="matrix" className="rounded-lg m-auto mt-3"></Image>
                    <p style={tagp}>•	Depois de feito o redimensionamento na imagem, agora ela é transformada em um vetor de 10.000 dimensões com o método .flatten() que contém as informações de cada pixel da imagem.</p>
                    <Image src={vetor} alt="vetor" className="rounded-lg m-auto mt-3"></Image>
                    <p style={tagp}>•   Sendo assim a imagem é transformada em um vetor, chegando ao nosso primeiro objetivo que é transformar a imagem em um dado manipulável para os próximos passos. </p>
                </article>
                <article className="flex flex-col w-[650px] m-auto mt-14">
                    <h2 className="m-auto text-xl font-semibold text-center text-custom-blue ">Etapa 2: Comparação das imagens</h2>
                    <p style={tagp}>•	Como as imagens são transformadas em vetores, para sabermos se uma imagem é semelhante a outra, utilizamos uma equação chamada de similaridade de cossenos, onde valores próximos a 1 indicam ângulo baixo entre os vetores e valores próximos a 0 indicam o um ângulo maior entre os vetores. Sendo assim quando menor o ângulo entre os vetores maior é a similaridade entre eles e consequentemente entre as imagens que foram transformadas nesses vetores.</p>
                    <Image src={vetores} alt="vetores" className="rounded-lg m-auto mt-3"></Image>
                    <Image src={similaridade} alt="similaridade cossenos" className="rounded-lg m-auto mt-3"></Image>
                </article>
                <article className="flex flex-col w-[650px] m-auto mt-14">
                    <h2 className="m-auto text-xl font-semibold text-center text-custom-blue mt-12">Etapa 3: Comparação da imagem de entrada com a base de dados</h2>
                    <p style={tagp}>•	A imagem de entrada é pré-processada da mesma forma que as imagens de referência.</p>
                    <p style={tagp}>•	Para cada vogal e categoria, o algoritmo calcula a similaridade de cossenos entre o vetor da imagem de entrada e cada vetor de referência dentro dessa categoria.</p>
                    <p style={tagp}>•	O código:
                        o	Armazena o valor máximo de similaridade de cada categoria.
                        o	Identifica a vogal e a categoria com maior similaridade geral.
                    </p>
                    <Image src={codigo} alt="Trecho código" className="rounded-lg m-auto mt-3"></Image>
                </article>
                <article className="flex flex-col w-[650px] m-auto mt-14">
                    <h2 className="m-auto text-xl font-semibold text-center text-custom-blue mt-12">Etapa 4: Logica de decisão</h2>
                    <p style={tagp}>•	O algoritmo usa um limite de similaridade (0.95 neste caso) para decidir se a imagem de entrada pode ser classificada com confiança como pertencente a uma vogal e categoria.</p>
                    <p style={tagp}>•	Se a similaridade máxima for maior que 0.95
                        o	Retorna a vogal, categoria e o valor da similaridade.
                        	Caso contrário
                        	Indica que não foi possível fazer classificação da imagem.
                    </p>
                </article>
                {/* <Link href={''} className="fflex items-center space-x-4"><Image src={github} alt="githubimage" className=" w-[100px] h-[100px] rounded-full shadow-2xl"></Image>Link do repositorio</Link> */}
                <Link href={'https://github.com/MVLRGTR/A3_IA_Caligrafia'} target="_blank" className="flex items-center space-x-4 m-auto mt-8 mb-8">
                    <Image
                        src={github}
                        alt="githubimage"
                        className="w-[100px] h-[100px] rounded-full shadow-2xl"
                    />
                    <span className="text-custom-blue text-lg">Link do repositório</span>
                </Link>

            </section>
        </div>
    )
}