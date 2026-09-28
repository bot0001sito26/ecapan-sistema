export default function Lotaip({ anio }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[75vh]">
            <div className="border-b-2 border-[#006837] pb-4 mb-8">
                <h2 className="text-3xl font-bold text-[#164286] font-heading">Transparencia LOTAIP - {anio}</h2>
                <p className="text-gray-600 text-sm mt-1">Cumplimiento de la Ley Orgánica de Transparencia y Acceso a la Información Pública.</p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <p className="text-gray-600 mb-6">
                    A continuación, se presentan los literales correspondientes al periodo fiscal <strong>{anio}</strong>.
                </p>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700 font-medium text-sm">Literal A - Estructura Orgánica Funcional</span>
                    <button className="text-[#164286] hover:text-[#006837] font-semibold text-sm">Ver Documento</button>
                </div>
            </div>
        </div>
    );
}