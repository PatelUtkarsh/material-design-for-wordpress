/**
 * Copyright 2022 Google LLC
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
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import Button from './button';
import Drawer from './drawer';

/**
 * Edit.
 *
 * @return {JSX.Element} Block edit.
 */
const Edit = () => {
	const [ isOpen, setIsOpen ] = useState( false );

	const toggleDrawer = () => {
		setIsOpen( ! isOpen );
	};

	return (
		<div { ...useBlockProps() }>
			<Button onClick={ toggleDrawer } />

			<Drawer isOpen={ isOpen } />
		</div>
	);
};

export default Edit;
