import { reloadAndRun, loadSources } from "./main.js";
import fs from 'fs'
import path from 'path'

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path as the first argument');
  process.exit(1);
}

const absolutePath = path.resolve(filePath);

(async () => {
    try {
        const data = fs.readFileSync(absolutePath, 'utf8');
        loadSources(data)
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
