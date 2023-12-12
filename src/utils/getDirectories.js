import { readdir } from 'fs/promises'

// Function that lists existing local directories
export const getDirectories = async (source) => {
    return (await readdir(source, { withFileTypes: true })) .filter(dirent => dirent.isDirectory()).map(dirent => ({title: dirent.name}))
}
