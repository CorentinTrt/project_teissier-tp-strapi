import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  console.log(env("INSTANCE_UNIX_SOCKET"));

  const connections = {
    postgres: {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "pg",
            host: env("INSTANCE_UNIX_SOCKET"),
            database: env("DB_NAME"),
            user: env("DB_USER"),
            password: env("DB_PASS"),
          },
          options: {},
        },
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db"),
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
