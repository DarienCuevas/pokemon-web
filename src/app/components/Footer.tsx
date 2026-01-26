export default function Footer() {
    
        const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-r from-purple-200 to-pink-400 py-8 flex justify-center items-center shadow-lg">
            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-[Quicksand,Arial,sans-serif]">
                © {year} Derechos Reservados
            </p>
        </footer>
    )
}