/**
 * External dependencies
 */
import { TranslateResult } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { assertValidProduct } from 'lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'lib/products-values/format-product';
import { getJetpackProductsCallToAction } from 'lib/products-values/translations';

/**
 * Type dependencies
 */
import type { Product } from 'lib/products-values/products-list';

/**
 * Get Jetpack product call-to-action based on the product purchase object.
 *
 * @param {object} product Product purchase object
 * @returns {TranslateResult} Product display name
 */
export function getJetpackProductCallToAction( product: object ): TranslateResult | undefined {
	product = formatProduct( product );
	assertValidProduct( product );
	const jetpackProductsCallToActions = getJetpackProductsCallToAction() as Record<
		string,
		TranslateResult
	>;

	return jetpackProductsCallToActions?.[ ( product as Product ).product_slug ];
}
