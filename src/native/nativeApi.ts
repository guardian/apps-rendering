import * as Acquisitions from '@guardian/bridget/Acquisitions';
import * as Commercial from '@guardian/bridget/Commercial';
import * as Discussion from '@guardian/bridget/Discussion';
import * as Environment from '@guardian/bridget/Environment';
import * as Gallery from '@guardian/bridget/Gallery';
import * as Metrics from '@guardian/bridget/Metrics';
import * as Notifications from '@guardian/bridget/Notifications';
import * as User from '@guardian/bridget/User';
import * as Video from '@guardian/bridget/Videos';
import { createAppClient } from './thrift/nativeConnection';

const environmentClient: Environment.Client<void> = createAppClient<
	Environment.Client<void>
>(Environment.Client, 'buffered', 'compact');
const commercialClient: Commercial.Client<void> = createAppClient<
	Commercial.Client<void>
>(Commercial.Client, 'buffered', 'compact');
const acquisitionsClient: Acquisitions.Client<void> = createAppClient<
	Acquisitions.Client<void>
>(Acquisitions.Client, 'buffered', 'compact');
const notificationsClient: Notifications.Client<void> = createAppClient<
	Notifications.Client<void>
>(Notifications.Client, 'buffered', 'compact');
const userClient: User.Client<void> = createAppClient<User.Client<void>>(
	User.Client,
	'buffered',
	'compact',
);
const galleryClient: Gallery.Client<void> = createAppClient<
	Gallery.Client<void>
>(Gallery.Client, 'buffered', 'compact');
const videoClient: Video.Client<void> = createAppClient<Video.Client<void>>(
	Video.Client,
	'buffered',
	'compact',
);
const metricsClient: Metrics.Client<void> = createAppClient<
	Metrics.Client<void>
>(Metrics.Client, 'buffered', 'compact');
const discussionClient: Discussion.Client<void> = createAppClient<
	Discussion.Client<void>
>(Discussion.Client, 'buffered', 'compact');

export {
	environmentClient,
	commercialClient,
	acquisitionsClient,
	notificationsClient,
	userClient,
	galleryClient,
	videoClient,
	metricsClient,
	discussionClient,
};
