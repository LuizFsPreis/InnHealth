
import SearchBar from "./searchBar";
export default function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 mb-16">
            <div className="absolute inset-0 -z-10 bg-black opacity-40"></div>
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/icons/FeedHero.jpg')",
                    backgroundAttachment: 'fixed',
                    filter: 'grayscale(100%)',
                }}
            ></div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-6xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">InnHealth</h2>
                    <p className="mt-6 leading-8 text-4xl text-gray-300 drop-shadow-lg">
                        Transforme seu treino em uma experiência única: seu próximo check-in para o sucesso começa agora!
                    </p>
                </div>
                <SearchBar />
            </div>
        </div>
    );
}
