/**
 * External dependencies
 */
import React, { FunctionComponent } from 'react';

/**
 * Internal dependencies
 */
import FormattedBlock from 'components/notes-formatted-block';
import isJetpackCloud from 'lib/jetpack/is-jetpack-cloud';

// FUTURE WORK: move this to a shared location
interface Activity {
	activityDescription: [
		{
			intent?: string;
			section?: string;
			type?: string;
			url?: string;
		}
	];
	activityName: string;
}

interface Props {
	activity: Activity;
}

const ActivityDescription: FunctionComponent< Props > = ( {
	activity: { activityName, activityDescription },
} ) => (
	<>
		{ activityDescription.map( ( description, index ) => {
			const { intent, section, type, url } = description;

			const content =
				isJetpackCloud() && type === 'link' && url?.startsWith( 'https://wordpress.com/' )
					? { ...description, type: undefined, url: undefined }
					: description;

			return (
				<FormattedBlock
					content={ content }
					key={ index }
					meta={ { activity: activityName, intent, section } }
				/>
			);
		} ) }
	</>
);

export default ActivityDescription;
