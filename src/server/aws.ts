import DynamoDB from 'aws-sdk/clients/dynamodb';
import SSM from 'aws-sdk/clients/ssm';
import type { Credentials } from 'aws-sdk/lib/core';
import {
	CredentialProviderChain,
	EC2MetadataCredentials,
	SharedIniFileCredentials,
} from 'aws-sdk/lib/core';
import { Region } from './appIdentity';

const credentialProvider = new CredentialProviderChain([
	(): Credentials => new SharedIniFileCredentials({ profile: 'mobile' }),
	(): Credentials => new EC2MetadataCredentials(),
]);

export const ssm: SSM = new SSM({
	region: Region,
	credentialProvider: credentialProvider,
});

export async function getDefaultArticleIds(): Promise<
	Array<string | undefined>
> {
	if (process.env.CI) {
		return Promise.resolve([]);
	}

	const db: DynamoDB = new DynamoDB({
		region: Region,
		credentialProvider: credentialProvider,
	});

	const params = {
		TableName: 'random-article-ids',
	};

	const data = await db.scan(params).promise();
	return data.Items?.map((item) => item.articleId.S) ?? [];
}
