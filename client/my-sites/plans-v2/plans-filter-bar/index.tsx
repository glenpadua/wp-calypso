/**
 * External dependencies
 */
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { translate } from 'i18n-calypso';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import SegmentedControl from 'components/segmented-control';
import SelectDropdown from 'components/select-dropdown';
import { TERM_MONTHLY, TERM_ANNUALLY } from 'lib/plans/constants';
import { masterbarIsVisible } from 'state/ui/selectors';
import { PRODUCT_TYPE_OPTIONS } from '../constants';
import useDetectWindowBoundary from '../use-detect-window-boundary';

/**
 * Type dependencies
 */
import type { Duration, ProductType } from '../types';

/**
 * Style dependencies
 */
import './style.scss';

interface Props {
	duration: Duration;
	productType: ProductType;
	onDurationChange: Function;
	onProductTypeChange: Function;
}

const MASTERBAR_HEIGHT = 47;

const PlansFilterBar = ( {
	duration,
	productType,
	onDurationChange,
	onProductTypeChange,
}: Props ) => {
	const barRef = useRef< HTMLDivElement | null >( null );
	const isMasterbarVisible = useSelector( masterbarIsVisible );
	// if we can find the masterbar in the DOM, get its height directly from the element.
	const masterbarHeight = document.querySelector( '.masterbar' )?.offsetHeight || MASTERBAR_HEIGHT;
	const masterbarOffset = isMasterbarVisible ? masterbarHeight : 0;
	const hasCrossed = useDetectWindowBoundary( barRef, masterbarOffset );

	return (
		<div ref={ barRef } className={ classNames( 'plans-filter-bar', { sticky: hasCrossed } ) }>
			<SelectDropdown selectedText={ PRODUCT_TYPE_OPTIONS[ productType ].label }>
				{ Object.values( PRODUCT_TYPE_OPTIONS ).map( ( option ) => (
					<SelectDropdown.Item
						key={ option.id }
						selected={ productType === option.id }
						onClick={ () => onProductTypeChange( option.id ) }
					>
						{ option.label }
					</SelectDropdown.Item>
				) ) }
			</SelectDropdown>
			<SegmentedControl primary={ true }>
				<SegmentedControl.Item
					onClick={ () => onDurationChange( TERM_MONTHLY ) }
					selected={ duration === TERM_MONTHLY }
				>
					{ translate( 'Monthly' ) }
				</SegmentedControl.Item>

				<SegmentedControl.Item
					onClick={ () => onDurationChange( TERM_ANNUALLY ) }
					selected={ duration === TERM_ANNUALLY }
				>
					{ translate( 'Yearly' ) }
				</SegmentedControl.Item>
			</SegmentedControl>
		</div>
	);
};

export default PlansFilterBar;
