<?php
/**
 * Template for displaying posts in grid or list layout.
 *
 * @package MaterialThemeBuilder
 */

use MaterialThemeBuilder\Template;

defined( 'ABSPATH' ) || exit;

$attributes = isset( $attributes ) ? $attributes : [];
$class_name = isset( $attributes['className'] ) ? $attributes['className'] : '';
$style      = isset( $attributes['style'] ) ? $attributes['style'] : 'grid';
?>

<div class="mdc-layout-grid <?php echo esc_attr( Template::classnames( [ "layout-$style", $class_name ] ) ); ?>">
	<div class="mdc-layout-grid__inner">
		<?php if ( ! empty( $posts_query ) && $posts_query->have_posts() ) : ?>

			<?php
			while ( $posts_query->have_posts() ) :
				$posts_query->the_post();
				?>

				<?php
				Template::get_template(
					'partials/single-post.php',
					[
						'attributes' => $attributes,
					]
				);
				?>

			<?php endwhile; ?>

			<?php // reset the main query loop. ?>
			<?php wp_reset_postdata(); ?>

		<?php endif; ?>
	</div>
</div>
