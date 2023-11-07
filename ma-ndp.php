<?php
/**
 * Plugin Name:       MA Notas de prensa
 * Description:       Prueba técnica
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Miguel Álvarez
 * Text Domain:       ma-ndp
 *
 * @package           ma-ndp
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function ma_ndp_ma_ndp_block_init() {
	register_block_type( __DIR__ . '/build/notas-prensa' );
	register_block_type( __DIR__ . '/build/single-nota-prensa' );
}
add_action( 'init', 'ma_ndp_ma_ndp_block_init' );


// Shortcode para mostrar los últimos 4 posts
function ma_ndp_ultimos_posts( $atts ) {;

	$args = array(
		'post_type' => 'post',
		'posts_per_page' => 4,
		'orderby' => 'date',
		'order' => 'DESC',
	);

	$posts = get_posts( $args );

	$months = array('Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic');

	ob_start();

	foreach($posts as $post){
		$featured_image = get_the_post_thumbnail_url($post);

		$tipo = 1;
		$categories = get_the_category($post);

		if($categories[0]->slug == 'tipo-2'){
			$tipo = 2;
		}
		else if($categories[0]->slug == 'tipo-3'){
			$tipo = 3;
		}

		?>
		<div class="wp-block-ma-ndp-ma-single-nota">
			<div class="nota-prensa">
				<div class="nota-prensa-header">
					<a href="<?php echo get_permalink($post); ?>" title="<?php echo $post->post_title; ?>">
						<div class="nota-prensa-img" <?php echo $featured_image ? 'style="background-image: url('.$featured_image.')"' : ''; ?>>
							<?php echo !$featured_image ? '<div class="nota-prensa-no-img"></div>' : ''; ?>
						</div>
					</a>

					<div class="nota-prensa-tipo-container">
						<div class="nota-prensa-tipo">
							<img src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/img/tipo-<?php echo $tipo; ?>.svg" alt="Tipo" />
						</div>
					</div>

					<div class="nota-prensa-date-container">
						<div class="nota-prensa-date">
							<div class="nota-prensa-date-dia">
								<?php echo date('j', strtotime($post->post_date)); ?>
							</div>
							<div class="nota-prensa-date-mes">
								<?php echo $months[date('n', strtotime($post->post_date)) - 1]; ?>
							</div>
						</div>
					</div>
				</div>
				<div class="nota-prensa-content">
					<a href="<?php echo get_permalink($post); ?>" title="<?php echo $post->post_title; ?>">
						<h2><?php echo $post->post_title; ?></h2>
					</a>
					<p><?php echo get_the_excerpt($post); ?></p>
				</div>
			</div>
		</div>
		<?php
	}

	$html = ob_get_contents();
	ob_end_clean();
	
	wp_reset_postdata();

	return $html;
}
add_shortcode( 'ma_ndp_ultimos_posts', 'ma_ndp_ultimos_posts' );