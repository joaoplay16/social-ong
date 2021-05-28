 function removeSymbols(value){
    return value.toString().replace(/\D/g, '')
  }

  export default removeSymbols