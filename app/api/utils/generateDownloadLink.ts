import {
    S3Client,
    ListObjectsV2Command,
    GetObjectCommand
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3 = new S3Client({
    region: process.env.NEXT_WASABI_REGION,
    endpoint: process.env.NEXT_WASABI_ENDPOINT,
    credentials: {
        accessKeyId: process.env.NEXT_WASABI_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_WASABI_SECRET_ACCESS_KEY!,
    },
});


export async function getWasabiDownloadLink(
    fileNameCandidates: string[]
): Promise<string | null> {

    // Link expires in 7 days
    const expiresIn = (60 * 60 * 24 * 7) - 10;

    const bucket = process.env.NEXT_WASABI_BUCKET;

    if (!bucket) {
        throw new Error("NEXT_WASABI_BUCKET is not defined");
    }

    if (!fileNameCandidates.length) {
        return null;
    }

    const candidates = new Set(fileNameCandidates);

    let continuationToken: string | undefined;

    do {
        const response = await s3.send(
            new ListObjectsV2Command({
                Bucket: bucket,
                ContinuationToken: continuationToken,
            })
        );

        for (const object of response.Contents ?? []) {
            if (!object.Key) continue;

            const baseName = object.Key.split("/").pop();

            if (!baseName) continue;

            if (candidates.has(baseName)) {
                const command = new GetObjectCommand({
                    Bucket: bucket,
                    Key: object.Key,
                });

                return await getSignedUrl(
                    s3,
                    command,
                    {
                        expiresIn,
                    }
                );
            }
        }

        continuationToken = response.NextContinuationToken;

    } while (continuationToken);

    return null;
}