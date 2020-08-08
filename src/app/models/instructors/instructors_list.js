// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    showInstructorsList(callback) {
        const query = `
            SELECT * FROM instructors
            ORDER BY name ASC
        `
        
        db.query(query, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback(results.rows)
        })
    }
}