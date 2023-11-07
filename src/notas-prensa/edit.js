/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { InnerBlocks } from '@wordpress/block-editor';
import UltimosPosts from './components/UltimosPosts';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	const ultimosPosts = attributes.ultimosPosts;

	const handleChangeUltimosPosts = (nuevoUltimosPosts) => {
		setAttributes( { ultimosPosts: nuevoUltimosPosts });
	}

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title='Opciones'>
					<ToggleControl
						label="Últimos 4 posts"
						checked={ ultimosPosts }
						onChange={ handleChangeUltimosPosts }
					/>
				</PanelBody>
			</InspectorControls>
			<h2 className="ma-ndp-title">Notas de prensa</h2>
			{ ultimosPosts ? <UltimosPosts /> : 
				<InnerBlocks
					allowedBlocks={["ma-ndp/ma-single-nota"]}
					orientation="horizontal"
					template={[
						["ma-ndp/ma-single-nota", {titulo: "Nota de prensa 1"}]
					]}
					templateLock={false}
				/> 
			}
    	</div>
	);
}
