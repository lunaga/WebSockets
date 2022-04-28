const fs = require('fs')
const { title } = require('process')

module.exports = class Contenedor {

    static id = 0 //Contador del Contenedor

    constructor(archivo) {

        this.save = function (object) {
            try {

                const tempFile = fs.readFileSync(archivo, 'utf-8')

                Contenedor.id++
                object.price = Number(object.price)
                let newObject = { ...object, id: Contenedor.id } // Objeto Construido (con Id)
                let newFile = []
                newFile.push(newObject) // Array Construido

                if (tempFile === '') { // Si el archivo está vacío se le crea el array

                    fs.appendFileSync(archivo, JSON.stringify(newFile, null, 2))
                }
                else { // Si ya tiene información se toma sus valores existentes y se le agrega el objeto, heredando el formato array

                    let parseFile = JSON.parse(tempFile) // Lo convertimos en Array

                    parseFile.forEach(n => { // Revisamos que el id no exista, de existir modificar el valor del contador
                        if (Contenedor.id <= n.id) {
                            Contenedor.id = n.id + 1
                            newFile[0].id = Contenedor.id
                        }
                    })
                    parseFile = [...parseFile, ...newFile] // Agregamos data nueva   
                    fs.writeFileSync(archivo, JSON.stringify(parseFile, null, 2))

                    // console.log(parseFile) // Muestreo de buen funcionamiento
                }
            }
            catch (err) {
                throw new Error('No se pudo guardar')
            }
        }

        this.getById = async function (number) {
            try {
                const tempFile = await fs.promises.readFile(archivo, 'utf-8')

                let parseFile = JSON.parse(tempFile)
                let findOut = parseFile.find((n) => n.id === number)

                // console.log(findOut || null) // muestreo de buen funcionamiento
                return (findOut)
            }
            catch (err) {
                throw new Error('No hay resultados')
            }
        }

        this.getAll = async function () {
            try {
                const tempFile = await fs.promises.readFile(archivo, 'utf-8')
                let parseFile = JSON.parse(tempFile)
                return parseFile // Para devolver a la pantalla
            }
            catch (err) {
                throw new Error('No hay resultados')
            }

        }

        this.deleteById = async function (number) {
            try {
                const tempFile = await fs.promises.readFile(archivo, 'utf-8')
                let parseFile = JSON.parse(tempFile)

                const toDelete = parseFile.findIndex((n) => n.id === number)

                if (toDelete >= 0) {
                    parseFile.splice(toDelete, 1)
                    await fs.promises.writeFile(archivo, JSON.stringify(parseFile, null, 2))
                    console.log('Producto eliminado')
                } else {
                    console.log('Id inexistente')
                }

            }
            catch (err) {
                throw new Error('Id no encontrado')
            }
        }

        this.deleteAll = async function () {
            try {
                await fs.promises.writeFile(archivo, '')
                console.log('Información del archivo borrada correctamente')
            }
            catch (err) {
                throw new Error('Archivo inexistente')
            }
        }

        this.modifyById = async function (values) {
            try {
                const tempFile = await fs.promises.readFile(archivo, 'utf-8')
                values.id = Number(values.id)
                let parseFile = JSON.parse(tempFile)
                let found = parseFile.find(n => n.id === values.id)
                if (found) {
                    found.title = values.title
                    found.price = Number(values.price)
                    found.thumbail = values.thumbail
                    // console.log(parseFile)
                    fs.writeFileSync(archivo, JSON.stringify(parseFile, null, 2))
                } else { console.log('no se halló') }
            }
            catch (err) {
                throw new Error('No se pudo guardar')
            }
        }
    }
}