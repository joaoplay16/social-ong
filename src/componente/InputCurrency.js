import React from 'react'
import IntlCurrencyInput from "react-intl-currency-input"

const InputCurrency = (props) => {
    const currencyConfig = {
        locale: "pt-BR",
        formats: {
          number: {
            BRL: {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          },
        },
      }


      return (
        <IntlCurrencyInput 
        className="form-control config-input"
        currency="BRL" 
        config={currencyConfig}
        {...props}
       />
      )
}



export default InputCurrency