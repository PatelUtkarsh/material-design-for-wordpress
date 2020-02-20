import edit from './edit';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const name = 'recent-posts';

const el = wp.element.createElement;
const iconEl = el(
	'svg',
	{ width: 24, height: 24 },
	el( 'path', {
		d:
			'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
	} )
);

export const settings = {
	title: __( 'Recent Posts', 'material-theme-builder' ),
	description: __(
		'Display a list of your most recent posts.',
		'material-theme-builder'
	),
	category: 'material',
	icon: iconEl,
	edit,
};
