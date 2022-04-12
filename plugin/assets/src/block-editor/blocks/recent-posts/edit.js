/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import InspectorControls from './components/inspector-controls';
import EditWithSelect from '../common-posts-list/edit';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Recent Posts Edit component.
 *
 * @param {Object} props            - Component props.
 * @param {Object} props.attributes - Component attributes.
 * @param {string} props.name       - Component name.
 *
 * @return {JSX.Element} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const blockProps = useBlockProps();
	return (
		<>
			<InspectorControls { ...props } />
			<EditWithSelect
				{ ...{ ...props, ...{ className: blockProps.className } } }
			/>
		</>
	);
};

export default Edit;
