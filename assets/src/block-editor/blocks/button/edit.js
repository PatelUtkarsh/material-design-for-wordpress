/**
 * External dependencies
 */
import classNames from 'classnames';
import { capitalize } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { InspectorControls, ContrastChecker } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.css';
import hasBg from './utils/has-bg';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';
import ImageRadioControl from '../../components/image-radio-control';
import { BUTTON_STYLES, ICON_POSITIONS, BUTTON_TYPES } from './options';
import MaterialColorPalette from '../../components/material-color-palette';
import genericAttributesSetter from '../../utils/generic-attributes-setter';

/**
 * Material button edit component.
 */
const ButtonEdit = ( {
	attributes: {
		url,
		rel,
		icon,
		type,
		label,
		style,
		textColor,
		linkTarget,
		cornerRadius,
		iconPosition,
		backgroundColor,
	},
	setAttributes,
	isSelected,
	className,
} ) => {
	const setter = genericAttributesSetter( setAttributes );

	const onToggleOpenInNewTab = useCallback(
		value => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = 'noreferrer noopener';
			} else if ( ! newLinkTarget && rel === 'noreferrer noopener' ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		},
		[ rel, setAttributes ]
	);

	const switchType = newType => {
		if ( 'icon' === newType && ! icon ) {
			setAttributes( { icon: { name: 'favorite', hex: 59517 } } );
		}

		setAttributes( { type: newType } );
	};

	const MdcButton = () => {
		if ( 'icon' === type ) {
			return (
				<button
					className="material-icons mdc-icon-button"
					style={ { ...( textColor ? { color: textColor } : {} ) } }
				>
					{ String.fromCharCode( icon?.hex ) }
				</button>
			);
		}

		return (
			<div
				style={ {
					...( backgroundColor && hasBg( style ) ? { backgroundColor } : {} ),
					...( textColor ? { color: textColor } : {} ),
					...( cornerRadius !== undefined
						? { borderRadius: `${ cornerRadius }px` }
						: {} ),
				} }
				className={ classNames( 'mdc-button', {
					[ `mdc-button--${ style }` ]: true,
				} ) }
			>
				{ icon && ( iconPosition === 'leading' || type === 'icon' ) && (
					<i className="material-icons mdc-button__icon">
						{ String.fromCharCode( icon?.hex ) }
					</i>
				) }
				<span
					className="mdc-button__label button-label"
					role="textbox"
					tabIndex={ 0 }
					contentEditable
					suppressContentEditableWarning
					onBlur={ setter( 'label', e => e.currentTarget.textContent ) }
					onKeyPress={ event =>
						event.key === 'Enter' && event.currentTarget.blur()
					}
				>
					{ label }
				</span>
				{ icon && iconPosition === 'trailing' && (
					<i className="material-icons mdc-button__icon">
						{ String.fromCharCode( icon?.hex ) }
					</i>
				) }
			</div>
		);
	};

	return (
		<>
			<div className={ className }>
				<MdcButton />

				{ isSelected && (
					<TextControl
						value={ url }
						label={ __( 'Link', 'material-theme-builder' ) }
						placeholder={ __( 'Paste your URL...', 'material-theme-builder' ) }
						onChange={ setter( 'url' ) }
						className="components-base-control wp-block-button__inline-link"
					/>
				) }
			</div>

			<InspectorControls>
				<PanelBody
					title={ __( 'Styles', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ type }
						options={ BUTTON_TYPES }
						onChange={ switchType }
					/>

					{ type === 'text' && (
						<>
							<span>{ __( 'Container', 'material-theme-builder' ) }</span>
							<ButtonGroup
								buttons={ BUTTON_STYLES }
								current={ style }
								onClick={ setter( 'style' ) }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					{ type !== 'icon' && (
						<ButtonGroup
							buttons={ ICON_POSITIONS }
							current={ iconPosition }
							onClick={ setter( 'iconPosition' ) }
						/>
					) }

					{ ( iconPosition !== 'none' || type === 'icon' ) && (
						<IconPicker currentIcon={ icon } onChange={ setter( 'icon' ) } />
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					{ hasBg( style ) && type === 'text' && (
						<MaterialColorPalette
							label={ __( 'Background Color', 'material-theme-builder' ) }
							value={ backgroundColor }
							onChange={ setter( 'backgroundColor' ) }
						/>
					) }
					<MaterialColorPalette
						label={ sprintf(
							__( '%s Color', 'material-theme-builder' ),
							capitalize( type )
						) }
						value={ textColor }
						onChange={ setter( 'textColor' ) }
					/>

					{ hasBg( style ) && type === 'text' && (
						<ContrastChecker
							textColor={ textColor }
							backgroundColor={ backgroundColor }
						/>
					) }
				</PanelBody>
				{ type === 'text' && (
					<PanelBody
						title={ __( 'Rounded Corners', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						{ style !== 'text' ? (
							<RangeControl
								value={ cornerRadius }
								onChange={ setter( 'cornerRadius' ) }
								min={ 0 }
								max={ 36 }
							/>
						) : (
							<p>
								{ __(
									'Current button style does not support rounded corners.',
									'material-theme-builder'
								) }
							</p>
						) }
					</PanelBody>
				) }
				<PanelBody
					title={ __( 'Link Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Open in new tab', 'material-theme-builder' ) }
						onChange={ onToggleOpenInNewTab }
						checked={ linkTarget === '_blank' }
					/>
					<TextControl
						value={ rel }
						label={ __( 'Link rel', 'material-theme-builder' ) }
						onChange={ setter( 'rel' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default ButtonEdit;
