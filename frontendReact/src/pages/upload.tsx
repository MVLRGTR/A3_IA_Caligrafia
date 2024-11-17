import { useState } from "react"
import api from "./api/api"
import { useRouter } from "next/router"
import Navbar from "./components/navbar"

export default function Upload() {
    const [selectedFile, setSelectedFile] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [returnApi, setReturnApi] = useState('')

    const router = useRouter()

    function handleFileChange(event: any) {
        const file = event.target.files[0]
        setSelectedFile(file)
        setImagePreview(URL.createObjectURL(file))
        console.log('Arquivo selecionado:', file)
    }

    async function uploadFile() {
        console.log('entrou aqui')
        const formData = new FormData()
        formData.append('image', selectedFile)

        try {
            await api.post('/analyze-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    // console.log(`then response : ${JSON.stringify(response.data)}`)
                    if (response.data.classification === 'erro') {
                        localStorage.setItem('categoria', response.data.parsedOutput.categoria)
                    } else {
                        localStorage.setItem('vogal', response.data.parsedOutput.vogal)
                        localStorage.setItem('categoria', response.data.parsedOutput.categoria)
                        localStorage.setItem('similaridade', response.data.parsedOutput.similaridade)
                    }
                    setReturnApi(response.data)
                    return response.data
                })
                .catch((Erro) => {
                    console.log(`Erro : ${Erro.response.data}`)
                })

        } catch (Erro) {
            console.log(`Erro : ${Erro}`)
        }
    }

    function redirectToUpload(){
        setImagePreview('')
        router.push('/upload')
    }

    return (
        <div>
            <div>
                <h2>Vamos analisar a imagem!</h2>
                <input type="file" onChange={handleFileChange} />
                {imagePreview && (
                    <div>
                        <h2>Pré-visualização da imagem:</h2>
                        <img src={imagePreview} alt="Pré-visualização" style={{ maxWidth: '250px', borderRadius: '8px' }} />
                        <button onClick={uploadFile}>Analisar imagem</button>
                        <button onClick={redirectToUpload}>Anexar Novamente</button>
                    </div>
                )}
            </div>
        </div>

    )
}
