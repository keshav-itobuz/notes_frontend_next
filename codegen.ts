import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_APP_BASE_URL,
  documents: "./src/**/*.ts",
  generates: {
    "src/graphql/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
