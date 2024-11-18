import {useEffect,useCallback ,useState} from "react"
import { useRouter } from "next/router"

export default function ErroMsg() {
    const [erro, setErro] = useState<string | null>(null)
    const router = useRouter()
    // function retirectToHome() {
    //     setTimeout(() => {
    //         localStorage.setItem('erro','undefined')
    //         router.push('/upload')
    //     }, 8000)
    // }

    const redirectToHome = useCallback(() => {
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('erro', 'undefined')
            }
            router.push('/upload')
        }, 8000)
    }, [router])

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            const erroLocalStorage = localStorage.getItem('erro')
            setErro(erroLocalStorage)
        }
        redirectToHome()
    },[redirectToHome])

    

    return (
        <div className="m-auto">
            {erro !== 'undefined' ? (
                <article className="flex flex-col h-[40px]">
                    <h1 className="text-4xl font-bold m-auto text-custom-blue">Erro de Processamento </h1>
                    <p className="mt-6 font-semibold text-lg m-auto text-custom-blue">{erro}</p>
                    <p className="mt-6 font-semibold text-lg m-auto text-custom-blue">Você será redirecionado em alguns segundos...</p>
                </article>
            ) : (
                <article className="flex flex-col h-[40px]">
                    <h1 className="text-4xl font-bold m-auto text-custom-blue">500 : Erro interno no servido</h1>
                    <p className="mt-6 font-semibold text-lg m-auto text-custom-blue">A sua imagem não pode ser processada agora nesse momento por um erro inesperado no servidor , por favor volte mais tarde !!!</p>
                    <p className="mt-6 font-semibold text-lg m-auto text-custom-blue">Você será redirecionado em alguns segundos...</p>
                </article>
            )}
        </div>
    )
}