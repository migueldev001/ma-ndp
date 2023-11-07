/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import UltimosPosts from './components/UltimosPosts';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {

	return (
		<div { ...useBlockProps.save() }>
			<div className="ma-ndp-slider-container">
				<h2 class="ma-ndp-title">Notas de prensa</h2>
				<div className='ma-ndp-slider-navigation'>
					<button id="ma-ndp-prev">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" focusable="false"><path d="M14.6 7l-1.2-1L8 12l5.4 6 1.2-1-4.6-5z"></path></svg>
					</button>
					<button id="ma-ndp-next">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" focusable="false"><path d="M10.6 6L9.4 7l4.6 5-4.6 5 1.2 1 5.4-6z"></path></svg>
					</button>
				</div>
				<div class="ma-ndp-slider">
					{attributes.ultimosPosts ? '[ma_ndp_ultimos_posts]' : <InnerBlocks.Content />}
				</div>
			</div>
		</div>
	);
}
