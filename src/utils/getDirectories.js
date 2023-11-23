import { readdir } from 'fs/promises'

// Função que lista os diretorios locais existentes
export const getDirectories = async (source) => {
    return (await readdir(source, { withFileTypes: true })) .filter(dirent => dirent.isDirectory()).map(dirent => ({title: dirent.name}))
}