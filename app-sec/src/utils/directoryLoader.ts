import fs from 'fs'
import path from 'path'

export async function loadDirectoryModules<T>(pathToDirectory: string, exclude: string[]): Promise<T[]> {
    const modulePromises = fs.readdirSync(pathToDirectory)
        .filter(filename => !exclude.includes(filename))
        .map(filename => import('./' + path.relative(__dirname, path.join(pathToDirectory, filename))))

    const modules = await Promise.all(modulePromises)
    return modules.map(module => module.default)
}
