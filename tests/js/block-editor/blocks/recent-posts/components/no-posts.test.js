/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import NoPosts from '../../../../../../assets/src/block-editor/blocks/recent-posts/components/no-posts';

// Mock InspectorControls component as not relevant in this test
jest.mock(
	'../../../../../../assets/src/block-editor/blocks/recent-posts/components/inspector-controls',
	() => {
		const InspectorControls = () => <div />;
		return InspectorControls;
	}
);

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <NoPosts { ...props } /> );
};

describe( 'NoPosts', () => {
	it( 'matches snapshot when recent posts is empty', () => {
		const wrapper = setup( { attributes: {}, recentPosts: [] } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when recent posts is null', () => {
		const wrapper = setup( { attributes: {}, recentPosts: null } );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
