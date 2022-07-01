import files from "./files.json";

export const FILES = Object.fromEntries(
  Object.entries(files).map(([name, config]) => {
    if (!name.includes("programs")) {
      return [name, { code: config, hidden: true }];
    }
    return [name, config];
  })
);

const packageJson = JSON.parse(files["/package.json"]);

export const TEMPLATE = {
  dependencies: packageJson.dependencies,
  devDependencies: packageJson.devDependencies,
  entry: "/index.tsx",
  main: "/bots/000-start.ts",
  environment: "create-react-app",
} as const;
