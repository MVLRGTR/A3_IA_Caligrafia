import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"



export default function BodyResult() {

    const [vowel, setVowel] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>(null)
    const [similarity, setSimilarity] = useState<string | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    const router = useRouter()

    function redirectToUpload() {
        router.push('/upload')
    }

    function redirectToInitial() {
        router.push('/')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') { 
            const savedVowel = localStorage.getItem('vowel')
            const savedCategory = localStorage.getItem('category')
            const savedSimilarity = localStorage.getItem('similarity')
            const savedImage = localStorage.getItem('image')

            setVowel(savedVowel)
            setCategory(savedCategory)
            setSimilarity(savedSimilarity)
            if (savedImage) {
                setImagePreview(savedImage) 
            }
        }
    }, [])

    console.log(`image preview :${imagePreview}`)

    return (
            <div className="text-center max-w-4xl p-5 m-auto w-[420px]">
                <h1 className="mb-5 text-4xl font-bold text-custom-blue">Resultado da Análise</h1>
                {imagePreview && imagePreview !== '' && (
                // <img
                //     src={imagePreview}
                //     alt="Pré-visualização"
                //     style={{ maxWidth: '350px', maxHeight: '280px', borderRadius: '8px', margin: 'auto' }}
                // />
                <Image src={imagePreview} alt='preview' className="rounded-lg m-auto" width={250} height={250}></Image>
            )}
                <div className="bg-white rounded-md p-5 mb-5 mt-5 shadow-md  flex flex-col justify-between">
                    {vowel !== 'undefined' && (
                        <article className="flex row-auto h-[40px] mt-3">
                            <h3 className="text-lg font-semibold text-custom-blue">Vogal reconhecida :</h3>
                            <p className="text-lg font-semibold ml-4 text-custom-blue">{vowel}</p>
                        </article>
                    )}
                    {category === 'Não foi possivél fazer a classificação da imagem como uma vogal !!!' ? (
                        <article className="flex row-auto h-[40px]">
                            <p className="text-lg font-semibold text-custom-blue">{category}</p>
                        </article>
                    ):(
                        <article className="flex row-auto h-[40px]">
                            <h3 className="text-lg font-semibold text-custom-blue">Classificado como:</h3>
                            <p className="text-lg font-semibold ml-4 text-custom-blue">{category}</p>
                        </article>
                    )}

                    {similarity !== 'undefined' &&(
                        <article className="flex row-auto h-[40px]">
                            <h3 className="text-lg font-semibold text-custom-blue">Grau de Similaridade:</h3>
                            <p className="text-lg font-semibold ml-4 text-custom-blue">{Number(similarity).toFixed(4)}</p>
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