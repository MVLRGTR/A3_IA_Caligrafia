import { useRouter } from "next/router"
import Navbar from "./components/navbar"


export default function Result() {

    const router = useRouter()

    function redirectToUpload() {
        router.push('/upload')
    }

    function redirectToInitial() {
        router.push('/')
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <h1>Resultado da Análise</h1>
                <div className="result-box">
                    <article>
                        <h3>Vogal reconhecida :</h3>
                        <p id="vowel"></p>
                    </article>
                    <article>
                        <h3>Classificado como:</h3>
                        <p id="category"></p>
                    </article>
                </div>
                <div className="buttons">
                    <button id="redoButton" onClick={redirectToUpload}>Analisar Novamente</button>
                    <button id="homeButton" onClick={redirectToInitial}>Página Inicial</button>
                </div>
            </div>
        </div>

    )
}