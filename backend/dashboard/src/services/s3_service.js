require("dotenv").config();

const {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  // If running on EC2 with an instance profile, you can omit credentials and let the role supply them
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
    : undefined,
});

async function putObject({ Bucket, Key, Body, ContentType, CacheControl }) {
  await s3.send(new PutObjectCommand({ Bucket, Key, Body, ContentType, CacheControl }));
  return { Bucket, Key };
}

async function listByPrefix({ Bucket, Prefix }) {
  const out = await s3.send(new ListObjectsV2Command({ Bucket, Prefix }));
  return out.Contents || [];
}

async function deleteMany({ Bucket, Keys }) {
  if (!Keys.length) return;
  await s3.send(new DeleteObjectsCommand({
    Bucket,
    Delete: { Objects: Keys.map(Key => ({ Key })) },
  }));
}

async function presignGet({ Bucket, Key, expiresIn = 60 }) {
  const cmd = new PutObjectCommand({ Bucket, Key }); // Wrong for GET; use GetObjectCommand
}

module.exports = {
  s3,
  putObject,
  listByPrefix,
  deleteMany,
};