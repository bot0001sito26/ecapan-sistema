import imgAlcaldesa from '../assets/personal/Alcaldesa.jpg';

export default function Personal() {
    const administrativos = [
        { cargo: "Alcaldesa", departamento: "Presidente del Directorio", nombre: "Ing. Mgtr. María Belén Candado Veliz", foto: imgAlcaldesa },
        { cargo: "Gerente General", departamento: "Unidad Ejecutiva", nombre: "Ing. Segundo Humberto Castañeda Veliz", foto: null },
        { cargo: "Asistente de Gerencia", departamento: "Unidad Ejecutiva", nombre: "Azalia Nataly Vera Rojas", foto: null },
        { cargo: "Directora Técnica", departamento: "Unidad Técnica", nombre: "Lissette Viviana Magallanes Torres", foto: null },
        { cargo: "Compras Públicas", departamento: "Unidad Administrativa", nombre: "Anthony Eulises Torres Briones", foto: null },
        { cargo: "Tesorero", departamento: "Unidad Comercial", nombre: "Norelis Andres Rivas Caicedo", foto: null },
        { cargo: "Talento Humano", departamento: "Unidad Administrativa", nombre: "Sandra Carlota Alvarez Moran", foto: null },
        { cargo: "Facturación y Catastro", departamento: "Unidad Comercial", nombre: "Jorge Ramón Ruiz Holguin", foto: null },
        { cargo: "Sistemas Informáticos", departamento: "Unidad Administrativa", nombre: "Dayanna Pierina Macías Ibarbo", foto: null },
    ];

    const planilleros = [
        "Jimmy Felix Pilligua Cruz",
        "Jonathan Paul Pluas Martillo",
        "Luis Andy Romero Conforme",
        "Maikol Jesús Rosado Name",
        "Jesús David Franco Name"
    ];

    const cuadrilla = [
        "Domingo Reinaldo Alvarez Valencia",
        "Leonardo David Barzola Briones",
        "Santos Victor Magallanes Alvarado",
        "Fabricio Vicente Mejia Peñafiel",
        "Milton José Solorzano Carrero",
        "Roberto Marcelo Villamar Ibarbo",
        "Pedro Nicolas Villamar Chiriboga"
    ];

    const guardianes = [
        "Luis Enrique Herrera Mina",
        "Allan Joel Leon Delgado"
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
            <div className="border-b-2 border-[#006837] pb-4">
                <h2 className="text-3xl font-extrabold text-[#164286] font-heading">Nuestro Personal Institucional</h2>
                <p className="text-gray-600 text-sm mt-1">Directorio, área administrativa y equipo operativo de ECAPAN-EP.</p>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#164286] border-l-4 border-[#006837] pl-3 font-heading">
                    Personal Administrativo y Directivo
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {administrativos.map((persona, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow text-center p-6">

                            {persona.foto ? (
                                <img
                                    src={persona.foto}
                                    alt={persona.nombre}
                                    className="w-24 h-24 rounded-full mx-auto object-cover mb-4 shadow-sm border-4 border-gray-50"
                                />
                            ) : (
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-50 shadow-inner">
                                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            )}

                            <span className="text-[10px] font-bold text-[#006837] uppercase tracking-wider block mb-1">{persona.cargo}</span>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{persona.nombre}</h4>
                            <p className="text-gray-500 text-xs">{persona.departamento}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6 pt-6">
                <h3 className="text-xl font-bold text-[#164286] border-l-4 border-[#006837] pl-3 font-heading">
                    Personal Operativo y Técnico
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-[#164286] text-lg mb-4 border-b pb-2">Planilleros / Lectura</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {planilleros.map((nombre, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-[#006837] font-bold">•</span> {nombre}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-[#164286] text-lg mb-4 border-b pb-2">Cuadrilla de Agua Potable</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {cuadrilla.map((nombre, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-[#006837] font-bold">•</span> {nombre}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-[#164286] text-lg mb-4 border-b pb-2">Estación de Bombeo</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {guardianes.map((nombre, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-[#006837] font-bold">•</span> {nombre}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}