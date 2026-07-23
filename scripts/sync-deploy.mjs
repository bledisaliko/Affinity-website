import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(process.cwd())
const output = join(root, '.output', 'public')
const deploy = join(root, 'deploy')

if (!existsSync(output)) {
  throw new Error('Cannot synchronize deploy: .output/public does not exist. Run the approved generate command first.')
}

if (deploy !== join(root, 'deploy')) {
  throw new Error('Refusing to synchronize an unexpected deploy path.')
}

rmSync(deploy, { recursive: true, force: true })
mkdirSync(deploy, { recursive: true })
cpSync(output, deploy, { recursive: true, force: true })
console.log(`Synchronized ${output} to ${deploy}.`)
