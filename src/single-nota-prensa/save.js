/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

import tipo1icon from '../../assets/img/tipo-1.svg';
import tipo2icon from '../../assets/img/tipo-2.svg';
import tipo3icon from '../../assets/img/tipo-3.svg';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {

	const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

	return (
		<div { ...useBlockProps.save() }>
			<div className="nota-prensa">
				<div className='nota-prensa-header'>
					<a href={attributes.enlace} title={attributes.notaPrensa.titulo}>
						<div className="nota-prensa-img" style={attributes.notaPrensa.imagen ? {backgroundImage: 'url('+attributes.notaPrensa.imagen+')'} : {}}>
							{!attributes.notaPrensa.imagen && <div className='nota-prensa-no-img'></div>}
						</div>
					</a>

					<div className="nota-prensa-tipo-container">
						<div className="nota-prensa-tipo">
							<img src={attributes.notaPrensa.tipo == 1 ? tipo1icon : attributes.notaPrensa.tipo == 2 ? tipo2icon : tipo3icon} alt="Tipo" />
						</div>
					</div>

					<div className="nota-prensa-date-container">
						<div className="nota-prensa-date">
							<div className="nota-prensa-date-dia">{ new Date(attributes.notaPrensa.fecha).getDate() }</div>
							<div className="nota-prensa-date-mes">{ months[new Date(attributes.notaPrensa.fecha).getMonth()] }</div>
						</div>
					</div>
				</div>

				<div className='nota-prensa-content'>
					<a href={attributes.enlace} title={attributes.notaPrensa.titulo}>
						<h2>{ attributes.notaPrensa.titulo }</h2>
					</a>
					<p>{ attributes.notaPrensa.texto }</p>
				</div>
			</div>
		</div>
	);
}
