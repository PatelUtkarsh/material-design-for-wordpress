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

import '@testing-library/jest-dom/extend-expect';

jest.mock( '../../../../assets/src/settings/utils/promises', () => ( {
	updateFonts: jest.fn(),
	updateIcons: jest.fn(),
} ) );

/**
 * Internal dependencies
 */
import {
	update,
	updateFonts,
	updateIcons,
} from '../../../../assets/src/settings/utils';

describe( 'Settings: Update', () => {
	it( 'should call fonts', () => {
		update( 'FONTS' );

		expect( updateFonts ).toHaveBeenCalledWith();
	} );

	it( 'should call icons', () => {
		update( 'ICONS' );

		expect( updateIcons ).toHaveBeenCalledWith();
	} );
} );
