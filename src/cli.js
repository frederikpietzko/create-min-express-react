#!/usr/bin/env node

const program = require("commander");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
var mkdirp = require("mkdirp");

const VERSION = require("../package").version;
var TEMPLATE_DIR = path.join(__dirname, "..", "templates");
var MODE_0666 = parseInt("0666", 8);
var MODE_0755 = parseInt("0755", 8);

program
  .name("create-min-express-react")
  .version(VERSION, "    --version")
  .usage("[options] [dir]")
  .parse(process.argv);

main();

function createApplication(name, dir) {
  // package.json
  const pkg = {
    name,
    version: "1.0.0",
    private: true,
    description: "TODO: add description",
    main: "src/index.js",
    scripts: {
      start: "node src/index.js",
      server: "nodemon src/index.js",
      client: "npm run start --prefix client",
      dev: 'concurrently "npm run server" "npm run client"'
    },
    dependencies: {
      express: "^4.17.1"
    },
    devDependencies: {
      nodemon: "^2.0.2",
      concurrently: "5.1.0"
    }
  };
  // create file structure
  if (dir !== ".") mkdir(dir, ".");
  mkdir(dir, "src");

  write(path.join(dir, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
  copy("index.js", dir + "/src/index.js");
  copy("gitignore", dir + "/.gitignore");
  console.log("   running create-react-app... this may take a while");
  child = exec(
    "npx create-react-app client",
    { cwd: dir },
    (error, stdout, stderr) => {
      var prompt = launchedFromCmd() ? ">" : "$";

      if (dir !== ".") {
        console.log();
        console.log("   change directory:");
        console.log("     %s cd %s", prompt, dir);
      }

      console.log();
      console.log("   install dependencies:");
      console.log("     %s npm install", prompt);
      console.log();
      console.log("   run the app:");
      console.log("   npm run start");
      console.log();
      console.log("   run in dev mode:");
      console.log("   npm run dev");
      console.log();
    }
  );

  child.stdout.on("data", data => {
    console.log(data);
  });
}

function copy(from, to) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), "utf-8"));
}

function createAppName(pathName) {
  return path
    .basename(pathName)
    .replace(/[^A-Za-z0-9.-]+/g, "-")
    .replace(/^[-_.]+|-+$/g, "")
    .toLowerCase();
}

function launchedFromCmd() {
  return (
    (process.platform === "win32" || process.platform === "win64") &&
    process.env._ === undefined
  );
}

function emptyDirectory(dir, fn) {
  fs.readdir(dir, (err, files) => {
    if (err && err.code !== "ENOENT") throw err;
    fn(!files || !files.length);
  });
}

function mkdir(base, dir) {
  var loc = path.join(base, dir);

  console.log("   \x1b[36mcreate\x1b[0m : " + loc + path.sep);
  mkdirp.sync(loc, MODE_0755);
}

function write(file, str, mode) {
  fs.writeFileSync(file, str, { mode: mode || MODE_0666 });
  console.log("   \x1b[36mcreate\x1b[0m : " + file);
}

function error(msg) {
  console.error(`   error: ${msg}`);
}

function main() {
  const destinationPath = program.args.shift() || ".";
  const appName = createAppName(path.resolve(destinationPath));

  emptyDirectory(destinationPath, empty => {
    if (empty) createApplication(appName, destinationPath);
    else {
      error("destination not empty. aborting...");
      process.exit(1);
    }
  });
}
