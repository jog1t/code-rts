const fs = require("fs");
const path = require("path");

async function* walk(dir, ignore = []) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory() && !ignore.some((pattern) => pattern.test(d.name))) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

/*
  Traverse recursively through `packages/template` and read all files
  Generate JSON with all the files and their source codes.
 */
async function main() {
  const files = {};

  const mainPath = path.join(__dirname, "../template");

  for await (const filePath of walk(mainPath, [/node_modules/])) {
    const content = await fs.promises.readFile(filePath, "utf8");
    const pathName = filePath.replace(mainPath, "");

    files[pathName] = content;
  }

  await fs.promises.writeFile(
    path.join(__dirname, "../app/src/files.json"),
    JSON.stringify(files)
  );
}

main();
