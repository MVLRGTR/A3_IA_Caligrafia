import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"



export default function BodyResult() {

    const [vowel,setVowel]= useState(localStorage.getItem('vowel'))
    const [category,setCategory] = useState(localStorage.getItem('category'))
    const [similarity,setSimilarity] = useState(localStorage.getItem('similarity'))
    const [imagePreview, setImagePreview] = useState<string>('')
    const router = useRouter()

    function redirectToUpload() {
        router.push('/upload')
    }

    function redirectToInitial() {
        router.push('/')
    }

    useEffect(() => {
        const savedImage = localStorage.getItem('image');
        if (savedImage) {
            setImagePreview(savedImage); 
        }
    }, [])

    console.log(`image preview :${imagePreview}`)

    return (
            <div className="text-center max-w-4xl p-5 m-auto w-[420px]">
                <h1 className="mb-5 text-4xl font-bold">Resultado da Análise</h1>
                {imagePreview && imagePreview !== '' && (
                <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    style={{ maxWidth: '350px', maxHeight: '280px', borderRadius: '8px', margin: 'auto' }}
                />
            )}
                <div className="bg-white rounded-md p-5 mb-5 mt-5 shadow-md  flex flex-col justify-between">
                    {vowel !== 'undefined' && (
                        <article className="flex row-auto h-[40px] mt-3">
                            <h3 className="text-lg font-semibold">Vogal reconhecida :</h3>
                            <p className="text-lg font-semibold ml-4">{vowel}</p>
                        </article>
                    )}
                    {category === 'Não foi possivél fazer a classificação da imagem como uma vogal !!!' ? (
                        <article className="flex row-auto h-[40px]">
                            <p className="text-lg font-semibold">{category}</p>
                        </article>
                    ):(
                        <article className="flex row-auto h-[40px]">
                            <h3 className="text-lg font-semibold">Classificado como:</h3>
                            <p className="text-lg font-semibold ml-4">{category}</p>
                        </article>
                    )}

                    {similarity !== 'undefined' &&(
                        <article className="flex row-auto h-[40px]">
                            <h3 className="text-lg font-semibold">Grau de Similaridade:</h3>
                            <p className="text-lg font-semibold ml-4">{Number(similarity).toFixed(4)}</p>
                        </article>
                    )}
                </div>
                <div className="flex ">
                    <button className="bg-custom-blue h-[40px] w-[200px] m-auto rounded-md duration-500 hover:scale-110 text-white" onClick={redirectToUpload}>Fazer Outra Analise</button>
                    <button className="bg-custom-blue h-[40px] w-[200px] m-auto rounded-md duration-500 hover:scale-110 text-white ml-3" onClick={redirectToInitial}>Página Inicial</button>
                </div>
            </div>
    )
}