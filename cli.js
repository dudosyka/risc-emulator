import { reloadAndRun, loadSources } from "./main.js";
import fs from 'fs'
import path from 'path'

const filePath = process.argv[2];
const libPath = process.argv[3]

if (!filePath) {
  console.error('Please provide a file path as the first argument');
  process.exit(1);
}

const absolutePath = path.resolve(filePath);

function loadLib(libPath) {
    if (!libPath) return ""
    try {
        return fs.readFileSync(path.resolve(libPath), 'utf-8')
    } catch (e) {
        console.error('Error reading file:', err.message);
        process.exit(1);
    }
}

(async () => {
    try {
        const data = fs.readFileSync(absolutePath, 'utf8');
        const lib = loadLib(libPath)
        const sources = `${data}\n\n${lib}`
        loadSources(sources)
        reloadAndRun().then(res => {
            const output = res.output
            const x22 = res.x22
            console.log(`Output[x22 = ${x22}]:\n${output}`)
        }).catch(err => {
            console.log("Errors: \n", err)
        })
    } catch (err) {
        console.error('Error reading file:', err.message);
        process.exit(1);
    }
})()
