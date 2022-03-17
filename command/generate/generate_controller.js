const fs = require("fs");
const path = require("path");

const generate_controller_handler = ({ verbose, origin, customPath, type, name, force }) => {
    if (verbose) console.log("[DEBUG] Generate Controller: " + name)
    if (verbose) console.log("[DEBUG] Check Type Controller: " + type)

    const nameTargetFile = `${name}Controller.ts`;
    const indexTargetFile = `index.ts`;

    // set default origin path
    const srcPath = path.join(__dirname, "../../src");
    const originPath = path.join(__dirname, "../../", origin);
    const targetPath = customPath ? path.join(originPath, customPath) : originPath;
    const targetPathFile = path.join(targetPath, nameTargetFile);
    const targetPathFileIndex = path.join(targetPath, indexTargetFile);
    const targetLib = path.join(srcPath, "lib");
    const targetLibIndex = path.join(targetLib, "index.ts");
    const targetLibBaseController = path.join(targetLib, "baseController.ts");

    // default asset
    const baseControllerAssetPath = path.join(__dirname, `../assets/controller-base.stub`);
    const controllerAssetPath = path.join(__dirname, `../assets/controller-${type}.stub`);

    if (verbose) console.log("[DEBUG] Src Path at " + srcPath)
    if (verbose) console.log("[DEBUG] Origin/Default Path at " + originPath)
    if (verbose) console.log("[DEBUG] Target Path at " + targetPath)
    if (verbose) console.log("[DEBUG] Target Library at " + targetLib)
    if (verbose) console.log("[DEBUG] Target Library Index at " + targetLibIndex)
    if (verbose) console.log("[DEBUG] Target Library BaseController at " + targetLibBaseController)
    if (verbose) console.log("[DEBUG] Controller Asset at " + controllerAssetPath)

    if (verbose) console.log("[DEBUG] Check Lib Directory If Exist Or Not")
    if(!fs.existsSync(targetLib)) {
        fs.mkdirSync(targetLib)
    }

    if (verbose) console.log("[DEBUG] Check Base Controller If Exist Or Not")
    if(!fs.existsSync(targetLibBaseController)) {
        fs.copyFileSync(baseControllerAssetPath, targetLibBaseController)
        fs.writeFileSync(targetLibIndex, `export * from "./BaseController";`);
    }

    if(customPath) {
        if (verbose) console.log("[DEBUG] Check Folder Target Controller")
        if(!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
        }
    }

    if (verbose) console.log("[DEBUG] Check File Target Controller")
    const targetPathCheck = fs.existsSync(targetPathFile);
    if (targetPathCheck && !force) {
        console.log("[ERROR] Target File Already Exist")
        console.log("[DEBUG] Use Option: --force / -f to Overwrite")
        process.exit(1)
    } else if (targetPathCheck && force) {
        console.log("[DEBUG] Force Delete Exiting File..!!")
        fs.unlinkSync(targetPathFile);
        console.log("[DEBUG] Success Force Delete Exiting File..!!")
    }

    if (verbose) console.log("[DEBUG] Check File Controller Asset")
    const controllerAssetCheck = fs.existsSync(controllerAssetPath);
    if (!controllerAssetCheck) {
        console.log("[ERROR] Controller Asset File Not Found")
        process.exit(1)
    }

    if (verbose) console.log("[DEBUG] Read File Controller Asset")
    let controllerAssetFile = fs.readFileSync(controllerAssetPath).toString();

    if (verbose) console.log("[DEBUG] Replace Controller Name")
    controllerAssetFile = controllerAssetFile.replace(/NAME/g, name);

    if (verbose) console.log("[DEBUG] Write New File Controller")
    fs.writeFileSync(targetPathFile, controllerAssetFile)

    if (verbose) console.log("[DEBUG] Success Create New File Controller")

    if (verbose) console.log("[DEBUG] Register Controller to index.ts")
    let newIndex;
    const indexFileRegister = `export * from "./${nameTargetFile.replace(".ts", "")}";`;

    if (verbose) console.log("[DEBUG] Check File index.ts")
    const indexControllerCheck = fs.existsSync(targetPathFileIndex);

    if (indexControllerCheck) {
        let indexFile = fs.readFileSync(targetPathFileIndex).toString();
        newIndex = indexFile + "\n" + indexFileRegister;
    } else {
        newIndex = indexFileRegister;
    }

    if (verbose) console.log("[DEBUG] Save Controller to index.ts")
    fs.writeFileSync(targetPathFileIndex, newIndex);

    if (verbose) console.log("[DEBUG] Success Save Controller to index.ts")
}

const generate_controller = {
    command: "generate:controller",
    describe: "Generate CRUD Controller",
    builder: (yargs) => {
        return yargs
            .option("origin", {
                demandOption: false,
                alias: "o",
                type: "string",
                description: "Original/Default Path Controller",
                default: "src/controller"
            })
            .option("customPath", {
                demandOption: false,
                alias: "p",
                type: "string",
                description: "Custom Path Controller, Example: admin/auth",
            })
            .option("type", {
                demandOption: true,
                alias: "t",
                type: "string",
                description: "Controller Type",
                choices: ["crudnew", "crud", "blank"],
                default: "crudnew",
            })
            .option("name", {
                demandOption: true,
                alias: "n",
                type: "string",
                description: "Name of Controller",
            })
            .option("force", {
                demandOption: false,
                alias: "f",
                type: "boolean",
                description: "Force Replace Exiting Controller",
            })
    },
    handler: generate_controller_handler,
};

module.exports = { generate_controller }