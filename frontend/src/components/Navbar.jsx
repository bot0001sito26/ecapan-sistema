import { useState, useRef, useEffect } from 'react';

export default function Navbar({ paginaActual, setPaginaActual }) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Estados para Desktop
    const [dropdownNosotros, setDropdownNosotros] = useState(false);
    const [dropdownLotaip, setDropdownLotaip] = useState(false);

    // Estados para Móvil (Acordeones)
    const [mobileNosotrosAbierto, setMobileNosotrosAbierto] = useState(false);
    const [mobileLotaipAbierto, setMobileLotaipAbierto] = useState(false);

    const nosotrosRef = useRef(null);
    const lotaipRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (nosotrosRef.current && !nosotrosRef.current.contains(event.target)) {
                setDropdownNosotros(false);
            }
            if (lotaipRef.current && !lotaipRef.current.contains(event.target)) {
                setDropdownLotaip(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const cambiarPagina = (id) => {
        setPaginaActual(id);
        setMenuAbierto(false);
        setDropdownNosotros(false);
        setDropdownLotaip(false);
        setMobileNosotrosAbierto(false);
        setMobileLotaipAbierto(false);
    };

    return (
        <nav className="bg-[#164286] text-white shadow-xl sticky top-0 z-50 overflow-visible pb-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div
                        className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105 py-1"
                        onClick={() => cambiarPagina('inicio')}
                    >
                        <img
                            src="/Logo-Oficial.png"
                            alt="Logo ECAPAN-EP"
                            className="h-11 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                        />
                    </div>

                    {/* Menú Desktop */}
                    <div className="hidden xl:flex items-center space-x-1">
                        <button onClick={() => cambiarPagina('inicio')} className={`px-2.5 py-2 rounded-full text-xs font-semibold transition-all ${paginaActual === 'inicio' ? 'bg-[#006837] text-white' : 'text-blue-100 hover:bg-white/10'}`}>
                            Inicio
                        </button>

                        {/* Dropdown Nosotros (Desktop) */}
                        <div className="relative" ref={nosotrosRef}>
                            <button onClick={() => setDropdownNosotros(!dropdownNosotros)} className={`px-2.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${(paginaActual === 'mision_vision' || paginaActual === 'personal') ? 'bg-[#006837] text-white' : 'text-blue-100 hover:bg-white/10'}`}>
                                Nosotros ▾
                            </button>
                            {dropdownNosotros && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg py-2 z-50">
                                    <button onClick={() => cambiarPagina('mision_vision')} className="block w-full text-left px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#164286] font-medium">Misión y Visión</button>
                                    <button onClick={() => cambiarPagina('personal')} className="block w-full text-left px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#164286] font-medium">Personal (Directorio)</button>
                                </div>
                            )}
                        </div>

                        {/* Dropdown LOTAIP (Desktop) */}
                        <div className="relative" ref={lotaipRef}>
                            <button onClick={() => setDropdownLotaip(!dropdownLotaip)} className={`px-2.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${(paginaActual === 'lotaip_2021' || paginaActual === 'lotaip_2022' || paginaActual === 'lotaip_2023') ? 'bg-[#006837] text-white' : 'text-blue-100 hover:bg-white/10'}`}>
                                LOTAIP ▾
                            </button>
                            {dropdownLotaip && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-lg py-2 z-50">
                                    <button onClick={() => cambiarPagina('lotaip_2021')} className="block w-full text-left px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#164286] font-medium">2021</button>
                                    <button onClick={() => cambiarPagina('lotaip_2022')} className="block w-full text-left px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#164286] font-medium">2022</button>
                                    <button onClick={() => cambiarPagina('lotaip_2023')} className="block w-full text-left px-4 py-2 text-xs hover:bg-blue-50 hover:text-[#164286] font-medium">2023</button>
                                    <a href="https://transparencia.dpe.gob.ec/entidades/1204" target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-xs text-[#006837] hover:bg-green-50 font-bold border-t border-gray-100 mt-1">Portal de Transparencia</a>
                                </div>
                            )}
                        </div>

                        <button onClick={() => cambiarPagina('rendicion')} className={`px-2.5 py-2 rounded-full text-xs font-semibold ${paginaActual === 'rendicion' ? 'bg-[#006837]' : 'text-blue-100 hover:bg-white/10'}`}>Rendición de Cuentas</button>
                        <button onClick={() => cambiarPagina('actas')} className={`px-2.5 py-2 rounded-full text-xs font-semibold ${paginaActual === 'actas' ? 'bg-[#006837]' : 'text-blue-100 hover:bg-white/10'}`}>Resol. y Actas Directorio</button>
                        <button onClick={() => cambiarPagina('resoluciones_admin')} className={`px-2.5 py-2 rounded-full text-xs font-semibold ${paginaActual === 'resoluciones_admin' ? 'bg-[#006837]' : 'text-blue-100 hover:bg-white/10'}`}>Resoluciones Admin.</button>
                        <button onClick={() => cambiarPagina('pac')} className={`px-2.5 py-2 rounded-full text-xs font-semibold ${paginaActual === 'pac' ? 'bg-[#006837]' : 'text-blue-100 hover:bg-white/10'}`}>PAC</button>
                        <button onClick={() => cambiarPagina('presupuesto')} className={`px-2.5 py-2 rounded-full text-xs font-semibold ${paginaActual === 'presupuesto' ? 'bg-[#006837]' : 'text-blue-100 hover:bg-white/10'}`}>Presupuesto</button>
                        <button onClick={() => cambiarPagina('planillas')} className={`px-2.5 py-2 rounded-full text-xs font-semibold bg-[#006837] border border-green-500 hover:bg-green-700`}>Consultar Planilla</button>
                    </div>

                    {/* Botón Móvil */}
                    <div className="flex items-center xl:hidden">
                        <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-white p-2 rounded-lg bg-white/10">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuAbierto ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Móvil Expandido */}
            {menuAbierto && (
                <div className="xl:hidden bg-[#103266] border-t border-blue-900/50 px-4 pt-3 pb-5 space-y-1 relative z-10 max-h-[80vh] overflow-y-auto">
                    <button onClick={() => cambiarPagina('inicio')} className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 border-b border-blue-800">Inicio</button>

                    {/* Acordeón Móvil: Nosotros */}
                    <div className="border-b border-blue-800">
                        <button
                            onClick={() => setMobileNosotrosAbierto(!mobileNosotrosAbierto)}
                            className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg"
                        >
                            <span>Nosotros</span>
                            <svg className={`w-4 h-4 transform transition-transform ${mobileNosotrosAbierto ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${mobileNosotrosAbierto ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="pl-8 pb-2 space-y-1 bg-black/10 rounded-b-lg">
                                <button onClick={() => cambiarPagina('mision_vision')} className="block w-full text-left text-sm text-blue-100 py-2 hover:text-white">Misión y Visión</button>
                                <button onClick={() => cambiarPagina('personal')} className="block w-full text-left text-sm text-blue-100 py-2 hover:text-white">Personal (Directorio)</button>
                            </div>
                        </div>
                    </div>

                    {/* Acordeón Móvil: LOTAIP */}
                    <div className="border-b border-blue-800">
                        <button
                            onClick={() => setMobileLotaipAbierto(!mobileLotaipAbierto)}
                            className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg"
                        >
                            <span>LOTAIP</span>
                            <svg className={`w-4 h-4 transform transition-transform ${mobileLotaipAbierto ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${mobileLotaipAbierto ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="pl-8 pb-2 space-y-1 bg-black/10 rounded-b-lg">
                                <button onClick={() => cambiarPagina('lotaip_2021')} className="block w-full text-left text-sm text-blue-100 py-2 hover:text-white">2021</button>
                                <button onClick={() => cambiarPagina('lotaip_2022')} className="block w-full text-left text-sm text-blue-100 py-2 hover:text-white">2022</button>
                                <button onClick={() => cambiarPagina('lotaip_2023')} className="block w-full text-left text-sm text-blue-100 py-2 hover:text-white">2023</button>
                                <a href="https://transparencia.dpe.gob.ec/entidades/1204" target="_blank" rel="noopener noreferrer" className="block w-full text-left text-sm text-[#34d399] font-bold py-2">Portal de Transparencia ↗</a>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => cambiarPagina('rendicion')} className="block w-full text-left px-4 py-3 rounded-lg text-sm text-white hover:bg-white/5 border-b border-blue-800">Rendición de Cuentas</button>
                    <button onClick={() => cambiarPagina('actas')} className="block w-full text-left px-4 py-3 rounded-lg text-sm text-white hover:bg-white/5 border-b border-blue-800">Resolución y Actas de Directorio</button>
                    <button onClick={() => cambiarPagina('resoluciones_admin')} className="block w-full text-left px-4 py-3 rounded-lg text-sm text-white hover:bg-white/5 border-b border-blue-800">Resoluciones Administrativas</button>
                    <button onClick={() => cambiarPagina('pac')} className="block w-full text-left px-4 py-3 rounded-lg text-sm text-white hover:bg-white/5 border-b border-blue-800">Plan Anual de Contrataciones (PAC)</button>
                    <button onClick={() => cambiarPagina('presupuesto')} className="block w-full text-left px-4 py-3 rounded-lg text-sm text-white hover:bg-white/5 border-b border-blue-800">Presupuesto</button>
                    <button onClick={() => cambiarPagina('planillas')} className="block w-full text-left px-4 py-3 rounded-lg text-sm font-bold text-[#006837] bg-white mt-2">Consultar Planilla</button>
                </div>
            )}

            {/* Olas Animadas */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
                <svg className="relative block w-full h-7 sm:h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
                    <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
                    <g>
                        <use href="#gentle-wave" x="48" y="0" fill="#006837" opacity="0.6" className="wave-1" />
                        <use href="#gentle-wave" x="48" y="3" fill="#38BDF8" opacity="0.5" className="wave-2" />
                        <use href="#gentle-wave" x="48" y="5" fill="#F8FAFC" opacity="1" className="wave-3" />
                    </g>
                </svg>
            </div>
            <style>{`
                .wave-1 { animation: move-wave 10s cubic-bezier(.55,.5,.45,.5) infinite; }
                .wave-2 { animation: move-wave 6s cubic-bezier(.55,.5,.45,.5) infinite; }
                .wave-3 { animation: move-wave 3s cubic-bezier(.55,.5,.45,.5) infinite; }
                @keyframes move-wave { 0% { transform: translate3d(-90px, 0, 0); } 100% { transform: translate3d(85px, 0, 0); } }
            `}</style>
        </nav>
    );
}