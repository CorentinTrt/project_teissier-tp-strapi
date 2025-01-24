export default ({ env }) => {
  if (env("NODE_ENV") === "production") {
    const BUCKET_NAME = env("BUCKET_NAME");
    return {
      upload: {
        config: {
          provider:
            "@strapi-community/strapi-provider-upload-google-cloud-storage",
          providerOptions: {
            bucketName: BUCKET_NAME,
            publicFiles: true,
            uniform: true,
            basePath: "",
          },
        },
      },
    };
  }
};
