import { useState } from 'react';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import DocumentosMensuales from './pages/DocumentosMensuales';
import DocumentosAnuales from './pages/DocumentosAnuales';
import ConsultaPlanillas from './pages/ConsultaPlanillas';
import MisionVision from './pages/MisionVision';
import Personal from './pages/Personal';
import Lotaip from './pages/Lotaip';

export default function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');

  // Función para determinar qué componente renderizar según el estado
  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'inicio':
        return <Inicio setPaginaActual={setPaginaActual} />;
      case 'mision_vision':
        return <MisionVision />;
      case 'personal':
        return <Personal />;
      case 'planillas':
        return <ConsultaPlanillas />;
      // DOCUMENTOS MENSUALES
      case 'actas':
        return <DocumentosMensuales key={paginaActual} titulo="Resolución y Actas de Directorio" incluyeActas={true} />;
      case 'resoluciones_admin':
        return <DocumentosMensuales key={paginaActual} titulo="Resoluciones Administrativas" incluyeActas={false} />;

      // DOCUMENTOS ANUALES
      case 'rendicion':
        return <DocumentosAnuales key={paginaActual} titulo="Rendición de Cuentas" />;
      case 'pac':
        return <DocumentosAnuales key={paginaActual} titulo="Plan Anual de Contrataciones (PAC)" />;
      case 'presupuesto':
        return <DocumentosAnuales key={paginaActual} titulo="Presupuesto" />;
      case 'lotaip_2021':
        return <Lotaip anio="2021" />;
      case 'lotaip_2022':
        return <Lotaip anio="2022" />;
      case 'lotaip_2023':
        return <Lotaip anio="2023" />;
      default:
        return <Inicio setPaginaActual={setPaginaActual} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar paginaActual={paginaActual} setPaginaActual={setPaginaActual} />

      {/* Contenedor principal donde se inyectan las páginas */}
      <main className="flex-grow">
        {renderizarPagina()}
      </main>

      {/* Footer sencillo */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
        <p className="text-sm">
          © 2026 ECAPAN-EP. Empresa Pública de Agua Potable del cantón Nobol.
        </p>
      </footer>
    </div>
  );
}