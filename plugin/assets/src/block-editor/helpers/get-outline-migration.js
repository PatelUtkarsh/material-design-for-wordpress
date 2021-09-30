/**
 * Copyright 2021 Google LLC
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
 * External dependencies
 */
import { isBoolean } from 'lodash';

const getElevationStyleMigration = ( { attributes, save } ) => {
	return {
		attributes: {
			...attributes,
			...{ outlined: { type: 'bool', default: false } },
		},
		save,
		migrate( attr ) {
			// Convert boolean to outlined string.
			if ( isBoolean( attr.outlined ) ) {
				attr = {
					...attr,
					...{
						outlined: attr.outlined ? 'outlined' : 'elevated',
					},
				};
			}

			return attr;
		},
		isEligible( attr ) {
			return isBoolean( attr.outlined );
		},
	};
};

export default getElevationStyleMigration;
