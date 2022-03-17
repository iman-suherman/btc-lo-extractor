const fs = require("fs");
const npath = require("path");
const { nanoid } = require("nanoid");

const generate_key_handler = ({ verbose }) => {
    if (verbose) console.log("[DEBUG] Read File .env")
    let envFile = fs.existsSync(".env");
    if (envFile) {
        console.error("[ERROR] .env File Already Exist.!")
        process.exit(1)
    }

    if (verbose) console.log("[DEBUG] Read File .env.example")

    let envFileExample = fs.existsSync(".env.example");
    if (!envFileExample) {
        console.error("[ERROR] .env.example Doesn't Exist.!")
        process.exit(1)
    }

    let envExample = fs.readFileSync(".env.example").toString();

    if (verbose) console.log("[DEBUG] Generated APP_KEY")

    const shouldReplace = ["APP_KEY"];
    shouldReplace.map((val) => {
        const randomData = nanoid(32);
        envExample = envExample.replace(`${val}=`, `${val}=${randomData}`)
    })

    const fileLocation = npath.join(".env")
    if (verbose) console.log("[DEBUG] Success Generated APP_KEY, Save to " + fileLocation)

    fs.writeFileSync(fileLocation, envExample);

    if (verbose) console.log("[DEBUG] Success Save to " + fileLocation)
}

const generate_key = {
    command: "generate:env",
    describe: "Generate Default ENV with APP Key",
    handler: generate_key_handler,
};

module.exports = { generate_key }