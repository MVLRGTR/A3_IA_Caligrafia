import { useState } from "react"
import api from "../api/api"
import { useRouter } from "next/router"
import Loader from "./loader"
import Image from "next/image"

export default function BodyUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        // const file = event.target.files?.[0]
        // setSelectedFile(file)
        // const previewImage = URL.createObjectURL(file)
        // setImagePreview(previewImage)
        // localStorage.setItem('image', previewImage)
        // console.log('Arquivo selecionado:', file)
        const file = event.target.files?.[0] // Garante que o arquivo existe
    if (file) {
        setSelectedFile(file);
        const previewImage = URL.createObjectURL(file);
        setImagePreview(previewImage);
        localStorage.setItem('image', previewImage);
        console.log('Arquivo selecionado:', file);
    } else {
        console.log('Nenhum arquivo selecionado');
    }
    }

    async function uploadFile() {
        if (!selectedFile) {
            console.log('Nenhum arquivo selecionado')
            return
        }

        const formData = new FormData()
        formData.append('image', selectedFile)
        setLoading(true)

        try {
            console.log(`entrou aqui com NEXT_PUBLIC_API_BASE_URL : ${process.env.NEXT_PUBLIC_API_BASE_URL}`)
            await api.post('/analyze-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(`then response : ${JSON.stringify(response.data)}`)
                    if (response.data.parsedOutput.categoria === 'Não foi possivél fazer a classificação da imagem como uma vogal !!!') {
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('vowel', 'undefined')
                            localStorage.setItem('category', response.data.parsedOutput.categoria)
                            localStorage.setItem('similarity', 'undefined')
                        }
                        setLoading(false)
                        redirectToResult()
                    } else {
                        // localStorage.setItem('vowel', response.data.parsedOutput.vogal)
                        // localStorage.setItem('category', response.data.parsedOutput.categoria)
                        // localStorage.setItem('similarity', response.data.parsedOutput.similaridade)
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('vowel', response.data.parsedOutput.vogal)
                            localStorage.setItem('category', response.data.parsedOutput.categoria)
                            localStorage.setItem('similarity', response.data.parsedOutput.similaridade)
                        }

                        setLoading(false)
                        redirectToResult()
                    }
                    return response.data
                })
                .catch((Erro) => {
                    if (!Erro.response) {
                        console.log('Erro sem resposta da API')
                        localStorage.setItem('erro', 'undefined')
                        router.push('/erro')
                    } else {
                        localStorage.setItem('erro',Erro.response.data.message)
                        console.log(`Erro : ${JSON.stringify(Erro.response.data)}`)
                        router.push('/erro')
                    }
                })

        } catch (Erro) {
            console.log(`Erro : ${Erro}`)
        }
    }

    function redirectToResult() {
        router.push('/result')
    }

    function redirectToUpload() {
        setImagePreview('')
        router.push('/upload')
    }
    return (
        <div className="m-auto flex flex-col">
            {loading &&
                <Loader></Loader>
            }
            <h2 className="text-custom-blue font-bold text-xl mb-4 m-auto">Vamos analisar a imagem!</h2>
            <input className="bg-custom-blue p-3 cursor-pointer rounded-md duration-500 hover:opacity-70 text-white" type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && (
                <div >
                    <h2 className="mt-3 mb-3 font-bold text-custom-blue">Pré-visualização da imagem:</h2>
                    {/* <img src={imagePreview} alt="Pré-visualização" style={{ maxWidth: '350px', maxHeight: '350px', borderRadius: '8px', margin: 'auto' }} /> */}
                    <Image src={imagePreview} alt='preview' className="rounded-lg m-auto " width={260} height={260}></Image>
                    <button className="bg-custom-blue h-[40px] w-[180px] mt-8 rounded-md duration-500 hover:scale-110 text-white " onClick={uploadFile}>Analisar imagem</button>
                    <button className="bg-custom-blue h-[40px] w-[180px]  ml-4 rounded-md duration-500 hover:scale-110 text-white" onClick={redirectToUpload}>Limpar Seleção</button>
                </div>
            )}
        </div>
    )
}