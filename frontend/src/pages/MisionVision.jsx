export default function MisionVision() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
            <div className="border-b-2 border-[#006837] pb-4">
                <h2 className="text-3xl font-extrabold text-[#164286]">Misión y Visión</h2>
                <p className="text-gray-600 text-sm mt-1">Los pilares fundamentales que guían nuestro compromiso con Nobol.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 border-t-4 border-t-[#164286] space-y-4">
                    <h3 className="text-2xl font-bold text-[#164286]">Misión</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Proveer servicios de agua potable y alcantarillado sanitario con altos estándares de calidad, continuidad y eficiencia, contribuyendo a la salud pública, al desarrollo socioeconómico y a la preservación del medio ambiente en el cantón Nobol.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 border-t-4 border-t-[#006837] space-y-4">

                    <h3 className="text-2xl font-bold text-[#006837]">Visión</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Ser una empresa pública de agua potable modelo en la provincia del Guayas, reconocida por su innovación tecnológica, sostenibilidad financiera y excelencia en la atención ciudadana para el bienestar de todos los habitantes.
                    </p>
                </div>
            </div>
        </div>
    );
}