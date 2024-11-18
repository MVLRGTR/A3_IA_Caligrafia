import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/CALIA.jpeg"

export default function Navbar() {
    
    const linkStyle = {
        margin: "15px",
        fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
        textDecoration: "none",
        color: "#5f3a03",
        fontSize: "1.4em",
    }

    return (
        <div className=" h-[130px] bg-custom-orange flex shadow-2xl">
            <Image src={logo} alt="logo" className=" w-[100px] h-[100px] rounded-full m-4 shadow-2xl"></Image>
            <section className="flex m-auto">
                <Link style={linkStyle} className="duration-500 hover:scale-110" href={'/'}>Inicio</Link>
                <Link style={linkStyle} className="duration-500 hover:scale-110" href={'/aboutus'}>Sobre Nós</Link>
                <Link style={linkStyle} className="duration-500 hover:scale-110" href={'/typecalia'}>Tipos de Caligrafia</Link>
            </section>
        </div>
    )
}