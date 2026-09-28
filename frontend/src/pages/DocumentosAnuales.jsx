import { useState } from 'react';

export default function DocumentosAnuales({ titulo }) {
    const [anioAbierto, setAnioAbierto] = useState(null);

    const datosEstructurados = [
        {
            anio: "2026",
            documentos: [
                { id: "1", nombre: `Resolución de Aprobación ${titulo} 2026.pdf`, url: "/documentos/ejemplo-2026.pdf" },
                { id: "2", nombre: `Anexo Técnico ${titulo} 2026.pdf`, url: "/documentos/anexo-2026.pdf" }
            ]
        },
        {
            anio: "2025",
            documentos: [
                { id: "3", nombre: `Resolución de Aprobación ${titulo} 2025.pdf`, url: "/documentos/ejemplo-2025.pdf" },
                { id: "4", nombre: `Anexo Técnico ${titulo} 2025.pdf`, url: "/documentos/anexo-2025.pdf" },
                { id: "5", nombre: `Reformas Oficiales ${titulo} 2025.pdf`, url: "/documentos/reforma-2025.pdf" }
            ]
        },
        {
            anio: "2024",
            documentos: [
                { id: "6", nombre: `Resolución de Aprobación ${titulo} 2024.pdf`, url: "/documentos/ejemplo-2024.pdf" }
            ]
        },
        {
            anio: "2023",
            documentos: [
                { id: "7", nombre: `Resolución de Aprobación ${titulo} 2023.pdf`, url: "/documentos/ejemplo-2023.pdf" }
            ]
        }
    ];

    const toggleAnio = (anio) => {
        setAnioAbierto(anioAbierto === anio ? null : anio);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[75vh]">
            <div className="border-b-2 border-[#006837] pb-4 mb-8">
                <h2 className="text-3xl font-bold text-[#164286] font-heading">{titulo}</h2>
                <p className="text-gray-600 text-sm mt-1">Archivo documental organizado por periodo fiscal.</p>
            </div>

            <div className="space-y-4">
                {datosEstructurados.map((registro) => (
                    <div key={registro.anio} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                        <button
                            onClick={() => toggleAnio(registro.anio)}
                            className="w-full px-6 py-4 bg-[#164286] text-white font-bold text-left hover:bg-blue-900 transition-colors flex justify-between items-center relative z-10"
                        >
                            <span>Año {registro.anio}</span>
                            {/* Ícono Chevron SVG Minimalista */}
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 ${anioAbierto === registro.anio ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`grid transition-all duration-300 ease-in-out ${anioAbierto === registro.anio ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="px-5 sm:px-8 py-4 space-y-2 border-t border-gray-200">
                                    {registro.documentos.map(doc => (
                                        <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow gap-3">
                                            <span className="text-gray-700 font-medium text-sm leading-tight">{doc.nombre}</span>
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#164286] hover:text-[#006837] font-bold text-sm whitespace-nowrap flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Descargar PDF
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}