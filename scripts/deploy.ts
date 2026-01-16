import {cp, mkdir, readdir, rm} from 'node:fs/promises'
import {resolve} from 'node:path'

const getTargetDir = (): string => {
    const [, , argTarget] = process.argv
    const target = argTarget || process.env.TARGET
    if (!target) {
        throw new Error('TARGET directory is required. Pass as arg or set TARGET env.')
    }
    return target
}

const emptyDir = async (dir: string) => {
    const entries = await readdir(dir, {withFileTypes: true})
    await Promise.all(entries.map((entry) => {
        const fullPath = resolve(dir, entry.name)
        return rm(fullPath, {recursive: true, force: true})
    }))
}

const copyDir = async (from: string, to: string) => {
    await cp(from, to, {recursive: true})
}

const main = async () => {
    const targetDir = resolve(getTargetDir())
    const distDir = resolve('dist')

    await mkdir(targetDir, {recursive: true})
    await emptyDir(targetDir)
    await copyDir(distDir, targetDir)
}

main().catch((error) => {
    console.error('deploy failed', error)
    process.exit(1)
})
