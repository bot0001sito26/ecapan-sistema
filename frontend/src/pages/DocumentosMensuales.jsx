import { useState } from 'react';

export default function DocumentosMensuales({ titulo, incluyeActas }) {
    const [anioAbierto, setAnioAbierto] = useState(null);
    const [mesAbierto, setMesAbierto] = useState(null);

    const datosEstructurados = [
        {
            anio: "2026",
            meses: [
                {
                    nombre: "Agosto",
                    resoluciones: [
                        { id: "RES-001", nombre: "Resolución Administrativa 001-2026.pdf", url: "#" },
                        { id: "RES-002", nombre: "Resolución Administrativa 002-2026.pdf", url: "#" }
                    ],
                    actas: incluyeActas ? [
                        { id: "ACT-001", nombre: "Acta de Sesión Ordinaria 12-08-2026.pdf", url: "#" }
                    ] : []
                },
                {
                    nombre: "Julio",
                    resoluciones: [
                        { id: "RES-003", nombre: "Resolución Administrativa 003-2026.pdf", url: "#" }
                    ],
                    actas: incluyeActas ? [
                        { id: "ACT-002", nombre: "Acta de Sesión Extraordinaria 05-07-2026.pdf", url: "#" },
                        { id: "ACT-003", nombre: "Acta de Sesión Ordinaria 28-07-2026.pdf", url: "#" }
                    ] : []
                }
            ]
        },
        {
            anio: "2025",
            meses: [
                {
                    nombre: "Diciembre",
                    resoluciones: [
                        { id: "RES-004", nombre: "Resolución Administrativa 045-2025.pdf", url: "#" },
                        { id: "RES-005", nombre: "Resolución de Cierre Fiscal 2025.pdf", url: "#" }
                    ],
                    actas: incluyeActas ? [
                        { id: "ACT-004", nombre: "Acta de Sesión Ordinaria 15-12-2025.pdf", url: "#" }
                    ] : []
                },
                {
                    nombre: "Noviembre",
                    resoluciones: [
                        { id: "RES-006", nombre: "Resolución Administrativa 042-2025.pdf", url: "#" }
                    ],
                    actas: incluyeActas ? [] : []
                }
            ]
        }
    ];

    const toggleAnio = (anio) => {
        setAnioAbierto(anioAbierto === anio ? null : anio);
        setMesAbierto(null);
    };

    const toggleMes = (mes) => {
        setMesAbierto(mesAbierto === mes ? null : mes);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[75vh]">
            <div className="border-b-2 border-[#006837] pb-4 mb-8">
                <h2 className="text-3xl font-bold text-[#164286] font-heading">{titulo}</h2>
                <p className="text-gray-600 text-sm mt-1">Archivo documental organizado cronológicamente.</p>
            </div>

            <div className="space-y-4">
                {datosEstructurados.map((registroAnio) => (
                    <div key={registroAnio.anio} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">

                        <button
                            onClick={() => toggleAnio(registroAnio.anio)}
                            className="w-full px-6 py-4 bg-[#164286] text-white font-bold text-left hover:bg-blue-900 transition-colors flex justify-between items-center relative z-20"
                        >
                            <span>Año {registroAnio.anio}</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 ${anioAbierto === registroAnio.anio ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`grid transition-all duration-300 ease-in-out ${anioAbierto === registroAnio.anio ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="bg-white border-t border-gray-200">
                                    {registroAnio.meses.map((registroMes) => (
                                        <div key={registroMes.nombre} className="border-b border-gray-100 last:border-b-0">

                                            <button
                                                onClick={() => toggleMes(registroMes.nombre)}
                                                className="w-full px-8 py-3 bg-gray-50 text-[#164286] font-semibold text-left hover:bg-gray-100 transition-colors flex justify-between items-center text-sm relative z-10"
                                            >
                                                <span>Mes de {registroMes.nombre}</span>
                                                <svg
                                                    className={`w-4 h-4 transform transition-transform duration-300 ${mesAbierto === registroMes.nombre ? 'rotate-90' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>

                                            <div className={`grid transition-all duration-300 ease-in-out ${mesAbierto === registroMes.nombre ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                <div className="overflow-hidden">
                                                    <div className="px-5 sm:px-10 py-4 bg-white space-y-6">

                                                        {registroMes.resoluciones.length > 0 && (
                                                            <div>
                                                                <h4 className="text-[#006837] font-bold text-sm mb-3 border-b pb-1">Resoluciones</h4>
                                                                <div className="space-y-2">
                                                                    {registroMes.resoluciones.map(doc => (
                                                                        <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded text-sm hover:shadow-sm transition-shadow gap-2">
                                                                            <span className="text-gray-700 font-medium">{doc.nombre}</span>
                                                                            <a href={doc.url} className="text-[#164286] hover:text-[#006837] font-bold flex items-center gap-1 whitespace-nowrap">
                                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                                </svg>
                                                                                Descargar
                                                                            </a>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {incluyeActas && registroMes.actas.length > 0 && (
                                                            <div>
                                                                <h4 className="text-[#006837] font-bold text-sm mb-3 border-b pb-1">Actas de Sesión</h4>
                                                                <div className="space-y-2">
                                                                    {registroMes.actas.map(doc => (
                                                                        <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded text-sm hover:shadow-sm transition-shadow gap-2">
                                                                            <span className="text-gray-700 font-medium">{doc.nombre}</span>
                                                                            <a href={doc.url} className="text-[#164286] hover:text-[#006837] font-bold flex items-center gap-1 whitespace-nowrap">
                                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                                </svg>
                                                                                Descargar
                                                                            </a>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
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