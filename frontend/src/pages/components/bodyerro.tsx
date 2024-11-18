import { useState ,useEffect } from "react"
import { useRouter } from "next/router"

export default function ErroMsg() {
    const [erro, setErro] = useState(localStorage.getItem('erro'))
    const router = useRouter()
    function retirectToHome() {
        setTimeout(() => {
            localStorage.setItem('erro','undefined')
            router.push('/upload')
        }, 8000)
    }

    useEffect(()=>{
        retirectToHome()
    },[])

    return (
        <div className="m-auto">
            {erro !== 'undefined' ? (
                <article className="flex flex-col h-[40px]">
                    <h1 className="text-4xl font-bold m-auto">Erro de Processamento </h1>
                    <p className="mt-6 font-semibold text-lg m-auto">{erro}</p>
                    <p className="mt-6 font-semibold text-lg m-auto">Você será redirecionado em alguns segundos...</p>
                </article>
            ) : (
                <article className="flex flex-col h-[40px]">
                    <h1 className="text-4xl font-bold m-auto">500 : Erro interno no servido</h1>
                    <p className="mt-6 font-semibold text-lg m-auto">A sua imagem não pode ser processada agora nesse momento por um erro inesperado no servidor , por favor volte mais tarde !!!</p>
                    <p className="mt-6 font-semibold text-lg m-auto">Você será redirecionado em alguns segundos...</p>
                </article>
            )}
        </div>
    )
}