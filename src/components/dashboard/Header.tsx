
import React from 'react';
import { Calendar, User } from 'lucide-react';

const Header: React.FC = () => {
  // Obtener la fecha actual en español
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 px-6 bg-white rounded-lg shadow-sm mb-6">
      <div>
        <h1 className="text-ithelp-teal-dark font-bold">Dashboard Mesa de Ayuda TIC</h1>
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <Calendar size={16} className="mr-1" />
          <span>{getCurrentDate()}</span>
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <div className="bg-ithelp-lime text-ithelp-teal-dark px-3 py-1 rounded-full text-sm font-medium mr-4">
          ITIL v4
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-ithelp-teal-medium flex items-center justify-center text-white mr-2">
            <User size={16} />
          </div>
          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <p className="text-muted-foreground text-xs">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
