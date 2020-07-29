// Convertendo Versão Abreviada de Gênero para Versão por Extenso

module.exports = {
    genderConverter(gender) {
        let extendedGender= ""
        gender == "M" ? extendedGender = "Masculino" : extendedGender = "Feminino"

        return extendedGender
    }
}