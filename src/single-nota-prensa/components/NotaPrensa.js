import { RichText, MediaUpload } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { DatePicker, Popover } from '@wordpress/components';

import tipo1icon from '../../../assets/img/tipo-1.svg';
import tipo2icon from '../../../assets/img/tipo-2.svg';
import tipo3icon from '../../../assets/img/tipo-3.svg';


export default function NotaPrensa({ imagen, titulo, texto, fecha, tipo, updateNotaPrensa }) {

  const [nuevaImagen, setNuevaImagen] = useState(imagen);
  const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
  const [nuevoTexto, setNuevoTexto] = useState(texto);
  const [nuevaFecha, setNuevaFecha] = useState(new Date(fecha));
  const [nuevoTipo, setNuevoTipo] = useState(tipo);

  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isPopoverTipoVisible, setPopoverTipoVisible] = useState(false);

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  useEffect(() => {
    if(!fecha){
      setNuevaFecha(new Date());
    }

    if(!tipo){
      setNuevoTipo('1');
    }
  }, []);

  useEffect(() => {
    const nuevaNota = {imagen: nuevaImagen, titulo: nuevoTitulo, texto: nuevoTexto, fecha: nuevaFecha, tipo: nuevoTipo};
    updateNotaPrensa(nuevaNota);
  }, [nuevaImagen, nuevoTitulo, nuevoTexto, nuevaFecha, nuevoTipo]);

  const handleChangeImagen = (nuevaImagen) => {
    setNuevaImagen(nuevaImagen.url);
  }

  const handleChangeTitulo = (nuevoTitulo) => {
    setNuevoTitulo(nuevoTitulo);
  }

  const handleChangeTexto = (nuevoTexto) => {
    setNuevoTexto(nuevoTexto);
  }

  const handleChangeFecha = (nuevaFecha) => {
    let fechaSeleccionada = new Date(nuevaFecha);
    setNuevaFecha(fechaSeleccionada);
    setCalendarVisible(false);
  }

  const handleChangeTipo = (nuevoTipo) => {
    console.log(nuevoTipo);
    setNuevoTipo(nuevoTipo);
    setPopoverTipoVisible(false);
  }

  return (
    <div className="nota-prensa">
      <div className="nota-prensa-header">
        <MediaUpload
          onSelect={handleChangeImagen}
          type="image"
          value={imagen}
          render={({ open }) => (
            <div className="nota-prensa-img" onClick={open} style={imagen ? {backgroundImage: 'url('+imagen+')'} : {}}>{imagen ? '': (<div className='nota-prensa-no-img'><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="44" height="44" aria-hidden="true" focusable="false"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"></path></svg></div>)}</div>
          )}
        />

        <div className="nota-prensa-tipo-container">
          <div onClick={() => setPopoverTipoVisible(true)} className="nota-prensa-tipo">
            <img src={nuevoTipo == 1 ? tipo1icon : nuevoTipo == 2 ? tipo2icon : tipo3icon} alt="Tipo" />
          </div>
          
          {isPopoverTipoVisible && (
            <Popover position="bottom right" onClose={() => setPopoverTipoVisible(false)}>
              <ul className='nota-prensa-lista-tipo'>
                <li><a href="#" onClick={() => handleChangeTipo(1)}><img src={tipo1icon} alt="Tipo" /> Tipo 1</a></li>
                <li><a href="#" onClick={() => handleChangeTipo(2)}><img src={tipo2icon} alt="Tipo" /> Tipo 2</a></li>
                <li><a href="#" onClick={() => handleChangeTipo(3)}><img src={tipo3icon} alt="Tipo" /> Tipo 3</a></li>
              </ul>
            </Popover>
          )}
        </div>

        <div className="nota-prensa-date-container">
          <div onClick={() => setCalendarVisible(true)} className="nota-prensa-date">
            <div className="nota-prensa-date-dia">{nuevaFecha ? nuevaFecha.getDate() : ''}</div>
            <div className="nota-prensa-date-mes">{nuevaFecha ? months[nuevaFecha.getMonth()] : ''}</div>
          </div>
          
          {isCalendarVisible && (
            <Popover position="bottom right" onClose={() => setCalendarVisible(false)}>
              <DatePicker
                currentDate={nuevaFecha}
                onChange={handleChangeFecha}
              />
            </Popover>
          )}
        </div>
      </div>
      <div className='nota-prensa-content'>
        <RichText
          tagName="h2"
          placeholder="Título" 
          value={titulo}
          onChange={handleChangeTitulo}
        />

        <RichText
          tagName="p"
          placeholder="Texto"
          value={texto}
          onChange={handleChangeTexto} 
        />
      </div>
    </div>
  );

}
