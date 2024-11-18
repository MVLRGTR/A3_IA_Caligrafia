import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/CALIA.jpeg"

export default function Footer() {
    return (
        <footer className="h-[130px] bg-custom-orange flex shadow-2xl">
            <section>
            <Image src={logo} alt="logo" className=" w-[90px] h-[90px] rounded-full m-4 shadow-2xl"></Image>
            </section>
            <p className="m-auto text-custom-hover font-semibold text-xl"><span className="bold">Calia</span> &copy; 2024</p>
        </footer>
    )
}