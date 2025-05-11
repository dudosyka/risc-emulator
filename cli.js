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
            const regs = res.registers
            console.log(`Result:\n`)
            console.log("Regs:")
            for (let i = 0; i < 8; i++) {
                console.log(`x${i}: ${regs[i]}, x${i + 8}: ${regs[i + 8]}, x${i + 16}: ${regs[i + 16]}, x${i + 24}: ${regs[i + 24]}`)
            }
            console.log("\nOutput:")
            console.log(output)
        }).catch(err => {
            console.log("Errors: \n", err)
        })
    } catch (err) {
        console.error('Error reading file:', err.message);
        process.exit(1);
    }
})()
