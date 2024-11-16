import { useState } from "react"
import api from "./api/api";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [returnApi,setReturnApi] =useState('')

  function handleFileChange(event:any){
      const file = event.target.files[0]
      setSelectedFile(file)
      setImagePreview(URL.createObjectURL(file))
      console.log('Arquivo selecionado:', file)
  }

  async function uploadFile(){
    console.log('entrou aqui')
    const formData = new FormData()
    formData.append('image',selectedFile)
    
    try{
      const data = await api.post('/analyze-image', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log(`then response : ${response.data}`)
          return response.data
        })
        .catch((Erro) => {
          console.log(`Erro : ${Erro.response.data}`)
        })
        setReturnApi(data)
    }catch(Erro){
      console.log(`Erro : ${Erro}`)
    }
    console.log(`returnApi : ${returnApi.vogal}`)
  }

  return (
    <div>
      <h1>Teste de seleção de file</h1>
      {imagePreview && (
        <div>
          <h2>Pré-visualização da imagem:</h2>
          <img src={imagePreview} alt="Pré-visualização" style={{ maxWidth: '250px', borderRadius: '8px' }} />
        </div>
      )}
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>analisar</button>
    </div>
  
  )
}
