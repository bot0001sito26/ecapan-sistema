export default function Inicio({ setPaginaActual }) {
    const sectores = [
        {
            titulo: "Sector Doméstico",
            descripcion: "Suministro de agua potable continuo y seguro para los hogares del cantón Nobol."
        },
        {
            titulo: "Comercial e Industrial",
            descripcion: "Abastecimiento de alta eficiencia para potenciar el comercio e industrias locales."
        },
        {
            titulo: "Alcantarillado Sanitario",
            descripcion: "Mantenimiento integral de la red para proteger la salud pública y el medio ambiente."
        }
    ];

    return (
        <div className="space-y-10 pb-12">

            {/* HERO SECTION REDISEÑADO: Fondo claro de alto contraste */}
            <section className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200 py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center space-y-5">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Empresa Pública de Agua Potable y Alcantarillado
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                        Garantizamos servicios básicos de calidad con transparencia y compromiso para la comunidad.
                    </p>
                    <div className="pt-2">
                        <button
                            onClick={() => setPaginaActual('planillas')}
                            className="w-full sm:w-auto bg-[#006837] hover:bg-green-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all duration-200 text-base flex items-center justify-center mx-auto gap-2"
                        >
                            Consultar y Pagar Planilla
                        </button>
                    </div>
                </div>
            </section>

            {/* SECCIÓN PRINCIPAL RESPONSIVA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* COLUMNA SERVICIOS (2/3 en desktop, 1/1 en móvil) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="border-b-2 border-[#006837] pb-2">
                            <h2 className="text-2xl font-bold text-[#164286]">Cobertura de Servicios</h2>
                            <p className="text-gray-500 text-sm">Sectores atendidos en el cantón</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {sectores.map((sector, index) => (
                                <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
                                    <div className="text-3xl mb-3">{sector.icono}</div>
                                    <h3 className="text-base font-bold text-[#164286] mb-1">{sector.titulo}</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{sector.descripcion}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-50 border-l-4 border-[#164286] p-5 rounded-r-xl">
                            <h4 className="font-bold text-[#164286] text-sm sm:text-base">¿Necesitas reportar un daño o fuga?</h4>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1">
                                Nuestro equipo técnico está disponible para atenciones de emergencia en la red pública.
                            </p>
                        </div>
                    </div>

                    {/* COLUMNA FACEBOOK (1/3 en desktop, 1/1 en móvil) */}
                    <div className="space-y-6">
                        <div className="border-b-2 border-[#006837] pb-2">
                            <h2 className="text-2xl font-bold text-[#164286]">Canal Oficial</h2>
                            <p className="text-gray-500 text-sm">Publicaciones recientes</p>
                        </div>

                        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex justify-center overflow-hidden">
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fecapanepnobol&tabs=timeline&width=340&height=480&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                                width="100%"
                                height="480"
                                style={{ border: 'none', overflow: 'hidden', maxWidth: '340px' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                title="Facebook ECAPAN-EP"
                                className="rounded-lg"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}