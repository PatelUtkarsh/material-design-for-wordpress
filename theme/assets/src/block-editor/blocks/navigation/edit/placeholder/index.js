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
 * WordPress dependencies
 */
import { Placeholder, Button, DropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { navigation, Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */

import useNavigationEntities from '../../use-navigation-entities';
import PlaceholderPreview from './placeholder-preview';
import useNavigationMenu from '../../use-navigation-menu';
import useCreateNavigationMenu from '../use-create-navigation-menu';
import useConvertClassicMenu from '../../use-convert-classic-menu';
import ExistingMenusOptions from '../existing-menus-options';

export default function NavigationPlaceholder( {
	clientId,
	onFinish,
	canSwitchNavigationMenu,
	hasResolvedNavigationMenus,
	canUserCreateNavigation = false,
} ) {
	const createNavigationMenu = useCreateNavigationMenu( clientId );

	const onFinishMenuCreation = async (
		blocks,
		navigationMenuTitle = null
	) => {
		if ( ! canUserCreateNavigation ) {
			return;
		}

		const navigationMenu = await createNavigationMenu(
			navigationMenuTitle,
			blocks
		);
		onFinish( navigationMenu, blocks );
	};

	const convertClassicMenu = useConvertClassicMenu( onFinishMenuCreation );

	const {
		isResolvingPages,
		menus,
		isResolvingMenus,
		hasMenus,
	} = useNavigationEntities();

	const isStillLoading = isResolvingPages || isResolvingMenus;

	const onCreateEmptyMenu = () => {
		onFinishMenuCreation( [] );
	};

	const { navigationMenus } = useNavigationMenu();

	const hasNavigationMenus = !! navigationMenus?.length;

	const showSelectMenus =
		( canSwitchNavigationMenu || canUserCreateNavigation ) &&
		( hasNavigationMenus || hasMenus );

	return (
		<>
			{ ( ! hasResolvedNavigationMenus || isStillLoading ) && (
				<PlaceholderPreview isLoading />
			) }
			{ hasResolvedNavigationMenus && ! isStillLoading && (
				<Placeholder className="wp-block-navigation-placeholder">
					<PlaceholderPreview />
					<div className="wp-block-navigation-placeholder__controls">
						<div className="wp-block-navigation-placeholder__actions">
							<div className="wp-block-navigation-placeholder__actions__indicator">
								<Icon icon={ navigation } />{ ' ' }
								{ __( 'Navigation' ) }
							</div>

							<hr />

							{ showSelectMenus ? (
								<>
									<DropdownMenu
										text={ __( 'Select menu' ) }
										icon={ null }
										toggleProps={ {
											variant: 'tertiary',
											iconPosition: 'right',
											className:
												'wp-block-navigation-placeholder__actions__dropdown',
										} }
										popoverProps={ { isAlternate: true } }
									>
										{ () => (
											<ExistingMenusOptions
												showNavigationMenus={
													canSwitchNavigationMenu
												}
												navigationMenus={
													navigationMenus
												}
												onSelectNavigationMenu={
													onFinish
												}
												classicMenus={ menus }
												onSelectClassicMenu={ ( {
													id,
													name,
												} ) =>
													convertClassicMenu(
														id,
														name
													)
												}
												showClassicMenus={
													canUserCreateNavigation
												}
											/>
										) }
									</DropdownMenu>
									<hr />
								</>
							) : undefined }

							{ canUserCreateNavigation && (
								<Button
									variant="tertiary"
									onClick={ onCreateEmptyMenu }
								>
									{ __( 'Start empty' ) }
								</Button>
							) }
						</div>
					</div>
				</Placeholder>
			) }
		</>
	);
}
