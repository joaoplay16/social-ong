import removeSymbols from './removeSymbols'
 
 function maskCpf(value){
   return removeSymbols(value) // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')// captura o segundo grupo de 3 e o terceiro de 1, apos capturar o segundo grupo ele adiciona um ponto antes do terceiro grupo de numero
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2') //captura o terceiro grupo de 3 e o quarto de 1 ou 2, apos capturar o terceiro grupo ele adiciona um traço antes do quarto grupo de numero         
}



export default maskCpf