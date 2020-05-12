<?php
/**
 * Helpers functions.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

/**
 * Plugin Helpers class.
 */
class Helpers {
	/**
	 * Get the block from referer.
	 *
	 * @param string $wp_http_referer HTTP referer.
	 * @param string $block_name      Block name.
	 *
	 * @return array|mixed
	 */
	public static function get_block_from_referer( $wp_http_referer, $block_name ) {
		// phpcs:disable WordPressVIPMinimum.Functions.RestrictedFunctions.url_to_postid_url_to_postid
		$post_id = url_to_postid( $wp_http_referer );

		$post = get_post( $post_id );

		$blocks = [];
		if ( $post ) {
			$blocks = parse_blocks( $post->post_content );
		}

		return current( self::get_block_by_name( $blocks, $block_name ) );
	}

	/**
	 * Get block by name.
	 *
	 * @param array  $blocks     Blocks.
	 * @param string $block_name Block name.
	 *
	 * @return array
	 */
	public static function get_block_by_name( $blocks, $block_name ) {
		return array_filter(
			$blocks,
			function ( $block ) use ( $block_name ) {
				return $block['blockName'] === $block_name;
			}
		);
	}

	/**
	 * Get block count from post.
	 *
	 * @param object $post       Post.
	 * @param string $block_name Block name.
	 *
	 * @return int
	 */
	public static function get_block_count_from_post( $post, $block_name ) {
		$blocks = parse_blocks( $post->post_content );

		$found_blocks = array_filter(
			$blocks,
			function ( $block ) use ( $block_name ) {
				return $block['blockName'] === $block_name;
			}
		);

		return count( $found_blocks );
	}

	/**
	 * Check whether or not the current user is admin or editor with the manage options capability.
	 *
	 * @return bool
	 */
	public static function is_current_user_admin_or_editor_with_manage_options() {
		return (
			current_user_can( 'editor' ) && current_user_can( 'manage_options' )
			|| current_user_can( 'administrator' )
		);
	}

	/**
	 * Convert color hex code to rgb
	 *
	 * @param  string|array $hex Hex/RGB of the color.
	 * @return mixed
	 */
	public static function hex_to_rgb( $hex ) {
		if ( is_array( $hex ) && ! empty( $hex ) ) {
			return $hex;
		}

		$hex = strtolower( ltrim( $hex, '#' ) );
		if ( 3 !== strlen( $hex ) && 6 !== strlen( $hex ) ) {
			return false;
		}

		$values = str_split( $hex, ( 3 === strlen( $hex ) ) ? 1 : 2 );

		return array_map( 'self::hexdec', $values );
	}

	/**
	 * Mix 2 colors with a weight.
	 *
	 * @see https://sass-lang.com/documentation/modules/color#mix
	 *
	 * @param mixed $color1 Color hex/RGB array.
	 * @param mixed $color2 Color hex/RGB array.
	 * @param float $weight Weight to use for mixing.
	 * @return string
	 */
	public static function mix_colors( $color1, $color2, $weight = 0.5 ) {
		$weight = min( $weight, 1 );
		$weight = $weight * 2 - 1;
		$alpha  = 0;

		$w1 = ( ( $weight * -1 === $alpha ? $weight : ( $weight + $alpha ) / ( 1 + $weight * $alpha ) ) + 1 ) / 2.0;
		$w2 = 1.0 - $w1;

		$color1 = self::hex_to_rgb( $color1 );
		$color2 = self::hex_to_rgb( $color2 );

		$mixed = [
			round( $w1 * $color1[0] + $w2 * $color2[0] ),
			round( $w1 * $color1[1] + $w2 * $color2[1] ),
			round( $w1 * $color1[2] + $w2 * $color2[2] ),
		];

		return '#' . implode( '', array_map( 'self::dechex', $mixed ) );
	}

	/**
	 * Convert color hex to dec.
	 *
	 * @param  string $hex_code Color hex code.
	 * @return int
	 */
	public static function hexdec( $hex_code ) {
		return hexdec( str_pad( $hex_code, 2, $hex_code ) );
	}

	/**
	 * Convert color dec to hex.
	 *
	 * @param  int $decimal Number.
	 * @return string
	 */
	public static function dechex( $decimal ) {
		return str_pad( dechex( $decimal ), 2, '0', STR_PAD_LEFT );
	}
}
