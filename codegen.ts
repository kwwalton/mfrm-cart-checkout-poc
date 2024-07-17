import { CodegenConfig } from "@graphql-codegen/cli";
import { existsSync } from "fs";
import { resolve } from "path";

// NOTE: you can get schema from bedhub url or from local file (c/p from proposal), change boolean value below as needed
const useEndpoint = true;


const config: CodegenConfig = {
  overwrite: true,
  config: {
    avoidOptionals: true,
    scalars: {
      DateTime: "string",
      HexColorCode: "string",
      LocalDate: "string",
      LocalDateTime: "string",
      Long: "number",
      PositiveFloat: "number",
      PositiveInt: "number",
      NonNegativeFloat: "number",
      NonNegativeInt: "number",
      URL: "string",
      UUID: "string",
      ZipCode: "string",
    },
  },
  generates: {
    "src/gql/__generated__/types.ts": {
      schema: [
        "https://bedhub-dev.azurewebsites.net/graphql",
      ],
      plugins: ["typescript"],
    },
    bedhub: {
      schema: "https://bedhub-dev.azurewebsites.net/graphql",
      documents: "src/gql/queries/*.bedhub.gql",
      plugins: ["typescript-operations", "typed-document-node"],
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "~@/gql/__generated__/types",
      },
    },
  },
};

export default config;

// NOTE: yarn graphql-codegen
