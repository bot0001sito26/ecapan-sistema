import { useState } from 'react';


const API_URL = 'https://ecapan-backend.onrender.com';

export default function ConsultaPlanillas() {
    const [cedula, setCedula] = useState('');
    const [cargando, setCargando] = useState(false);
    const [datosDeuda, setDatosDeuda] = useState(null);
    const [error, setError] = useState(null);

    const [planillasSeleccionadas, setPlanillasSeleccionadas] = useState([]);
    const [procesandoPago, setProcesandoPago] = useState(false);
    const [pagoCompletado, setPagoCompletado] = useState(false);
    const [tarjeta, setTarjeta] = useState({ numero: '', exp: '', cvc: '' });

    const handleConsultar = async (e) => {
        e.preventDefault();
        if (!cedula) return;

        setCargando(true);
        setError(null);
        setDatosDeuda(null);
        setPagoCompletado(false);

        try {
            const response = await fetch(`${API_URL}/api/consultar-deuda`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cedula })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.detail || 'Error al consultar');

            if (!data.medidores || data.medidores.length === 0) {
                setError('El usuario no registra planillas pendientes de pago.');
            } else {
                setDatosDeuda(data);
                const todasLasPlanillas = data.medidores.flatMap(m => m.planillas.map(p => p.id_planilla));
                setPlanillasSeleccionadas(todasLasPlanillas);
            }
        } catch (err) {
            setError('No se pudo conectar con el servidor o el usuario no existe.');
        } finally {
            setCargando(false);
        }
    };

    const togglePlanilla = (id) => {
        if (planillasSeleccionadas.includes(id)) {
            setPlanillasSeleccionadas(planillasSeleccionadas.filter(item => item !== id));
        } else {
            setPlanillasSeleccionadas([...planillasSeleccionadas, id]);
        }
    };

    const calcularTotalSeleccionado = () => {
        if (!datosDeuda) return 0;
        const todasLasPlanillas = datosDeuda.medidores.flatMap(m => m.planillas);
        return todasLasPlanillas
            .filter(p => planillasSeleccionadas.includes(p.id_planilla))
            .reduce((acc, curr) => acc + curr.monto, 0);
    };

    const handleNumeroTarjeta = (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.replace(/(\d{4})(?=\d)/g, '$1-').slice(0, 19);
        setTarjeta({ ...tarjeta, numero: valor });
    };

    const handleExpiracion = (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length >= 2) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
        }
        setTarjeta({ ...tarjeta, exp: valor.slice(0, 5) });
    };

    const handleCVC = (e) => {
        const valor = e.target.value.replace(/\D/g, '').slice(0, 4);
        setTarjeta({ ...tarjeta, cvc: valor });
    };

    const handlePagar = async (e) => {
        e.preventDefault();
        if (planillasSeleccionadas.length === 0) {
            alert('Seleccione al menos una planilla para realizar el abono.');
            return;
        }

        setProcesandoPago(true);

        try {
            const numeroLimpio = tarjeta.numero.replace(/\D/g, '');
            const response = await fetch(`${API_URL}/api/procesar-pago`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cedula,
                    ids_planillas: planillasSeleccionadas,
                    monto: calcularTotalSeleccionado(),
                    tarjeta_oculta: `**** **** **** ${numeroLimpio.slice(-4)}`
                })
            });

            const res = await response.json();

            if (res.status === 'aprobado') {
                setPagoCompletado(true);
                setDatosDeuda(null);
                setTarjeta({ numero: '', exp: '', cvc: '' });
            }
        } catch (err) {
            alert('Error al procesar la transacción');
        } finally {
            setProcesandoPago(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[75vh] space-y-6 sm:space-y-8">
            <div className="border-b-2 border-[#006837] pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#164286] font-heading">Consultar y Pagar Planilla</h2>
                <p className="text-gray-600 text-sm mt-1">Ingrese su número de cédula o RUC para consultar su saldo pendiente.</p>
            </div>

            <form onSubmit={handleConsultar} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cédula / RUC del Abonado</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value.replace(/\D/g, '').slice(0, 13))}
                            placeholder="Ej: 0999999999"
                            className="w-full sm:flex-grow px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#164286] focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            disabled={cargando}
                            className="w-full sm:w-auto whitespace-nowrap bg-[#164286] hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-colors disabled:opacity-50"
                        >
                            {cargando ? 'Buscando...' : 'Consultar'}
                        </button>
                    </div>
                </div>
            </form>

            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl text-sm">{error}</div>}

            {pagoCompletado && (
                <div className="bg-green-50 border-l-4 border-[#006837] text-green-800 p-5 sm:p-6 rounded-r-xl space-y-2">
                    <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#006837] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="font-bold text-lg">¡Abono Realizado con Éxito!</h3>
                    </div>
                    <p className="text-sm">Las planillas seleccionadas fueron abonadas correctamente en el sistema institucional.</p>
                </div>
            )}

            {datosDeuda && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-[#164286] border-b pb-2 font-heading">Información de la Cuenta</h3>
                            <div className="mt-3">
                                <span className="text-xs text-gray-400 block uppercase">Abonado Titular</span>
                                <p className="font-bold text-gray-800 text-lg break-words">{datosDeuda.cliente}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <span className="text-xs text-gray-400 block uppercase border-b pb-1">Desglose por Medidor</span>

                            {datosDeuda.medidores.map(medidor => (
                                <div key={medidor.id_medidor} className="bg-gray-50/50 p-4 rounded-xl border border-gray-200 space-y-3">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-[#164286] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm font-semibold text-gray-800 leading-tight">{medidor.direccion}</p>
                                    </div>

                                    <div className="space-y-2 pl-0 sm:pl-7 pt-1">
                                        {medidor.planillas.map(p => {
                                            const estaSeleccionada = planillasSeleccionadas.includes(p.id_planilla);
                                            return (
                                                <div
                                                    key={p.id_planilla}
                                                    onClick={() => togglePlanilla(p.id_planilla)}
                                                    className={`flex justify-between items-center text-sm p-3 rounded-xl border cursor-pointer transition-all ${estaSeleccionada ? 'bg-white border-[#006837] shadow-sm' : 'bg-transparent border-gray-200 opacity-60'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border rounded transition-colors ${estaSeleccionada ? 'bg-[#006837] border-[#006837]' : 'border-gray-300 bg-white'}`}>
                                                            {estaSeleccionada && (
                                                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="font-medium text-gray-700">{p.mes}</span>
                                                    </div>
                                                    <span className="font-bold text-[#164286]">${p.monto.toFixed(2)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="font-bold text-gray-700">Total Seleccionado:</span>
                            <span className="text-2xl font-extrabold text-[#006837]">${calcularTotalSeleccionado().toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-[#164286] border-b pb-2 font-heading">Pasarela de Pago Segura</h3>

                        <form onSubmit={handlePagar} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Número de Tarjeta (16 dígitos)</label>
                                <input
                                    type="text"
                                    placeholder="4500-1234-5678-9012"
                                    value={tarjeta.numero}
                                    onChange={handleNumeroTarjeta}
                                    pattern="(?:\d{4}-){3}\d{4}"
                                    title="Debe ingresar 16 números"
                                    className="w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006837]"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Expiración (MM/AA)</label>
                                    <input
                                        type="text"
                                        placeholder="12/28"
                                        value={tarjeta.exp}
                                        onChange={handleExpiracion}
                                        pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                                        title="Formato requerido: MM/AA (ej. 12/28)"
                                        className="w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006837]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">CVC (3-4 dígitos)</label>
                                    <input
                                        type="password"
                                        placeholder="***"
                                        value={tarjeta.cvc}
                                        onChange={handleCVC}
                                        pattern="\d{3,4}"
                                        title="El código de seguridad debe tener 3 o 4 números"
                                        className="w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006837]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={procesandoPago || planillasSeleccionadas.length === 0}
                                    className="w-full bg-[#006837] hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-md transition-all text-sm sm:text-base flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {procesandoPago ? 'Validando Banco...' : `Pagar $${calcularTotalSeleccionado().toFixed(2)}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}