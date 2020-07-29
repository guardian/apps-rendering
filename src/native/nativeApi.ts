import { createAppClient } from './thrift/nativeConnection';
import * as Environment from '@guardian/bridget/Environment';
import * as Commercial from '@guardian/bridget/Commercial';
import * as Acquisitions from '@guardian/bridget/Acquisitions';
import * as Notifications from '@guardian/bridget/Notifications';
import * as User from '@guardian/bridget/User';
import * as Gallery from '@guardian/bridget/Gallery';
import * as Video from '@guardian/bridget/Videos';
import * as Metrics from '@guardian/bridget/Metrics';

const environmentClient: Environment.Client<void> = createAppClient<Environment.Client>(Environment.Client, 'buffered', 'compact');
const commercialClient: Commercial.Client<void> = createAppClient<Commercial.Client>(Commercial.Client, 'buffered', 'compact');
const acquisitionsClient: Acquisitions.Client<void> = createAppClient<Acquisitions.Client>(Acquisitions.Client, 'buffered', 'compact');
const notificationsClient: Notifications.Client<void> = createAppClient<Notifications.Client>(Notifications.Client, 'buffered', 'compact');
const userClient: User.Client<void> = createAppClient<User.Client>(User.Client, 'buffered', 'compact');
const galleryClient: Gallery.Client<void> = createAppClient<Gallery.Client>(Gallery.Client, 'buffered', 'compact');
const videoClient: Video.Client<void> = createAppClient<Video.Client>(Video.Client, 'buffered', 'compact');
const metricsClient: Metrics.Client<void> = createAppClient<Metrics.Client>(Metrics.Client, 'buffered', 'compact');

export {
    environmentClient,
    commercialClient,
    acquisitionsClient,
    notificationsClient,
    userClient,
    galleryClient,
    videoClient,
    metricsClient
};
