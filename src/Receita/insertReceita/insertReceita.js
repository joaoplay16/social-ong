import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './insert.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import $ from 'jquery';
import { API_ADDRESS } from '../../service/service';
import InputCurrency from '../../componente/InputCurrency'

class CriaReceita extends Component {
    constructor() {
        super();

        this.state = {
            Receita: {
                receita: "",
                descricao: "",
                valor: 0,
                data: new Date().toISOString().substring(0, 10)
            },
            redirect: false,
        }
    }
    render () {
        const { redirect } = this.state;
        if (redirect) {
            return (
                <Redirect to="/page26" />,
                <div className="alert alert-success aler" role="alert">
                    <p>Os dados foram salvos com sucesso</p>
                </div>
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend align="center">Enserir Receita</legend>
                        <div className="card textForm">
                            <h3 align="center">Receita</h3>
                            <div className="card-body">
                                <div className="form-row">
                                    <div className="form-group col-sm-4">
                                        <label htmlFor="receita">Receita</label>
                                        <input 
                                          className="form-control config-input"
                                            id="receita"
                                            name="receita"
                                            onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group col-sm-3">
                                        <label htmlFor="valor">Valor</label>
                                        <InputCurrency
                                            id="valor"
                                            name="valor"
                                            required
                                         value={this.state.Receita.valor}
                                            onChange={this.handleMoneyChange} />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="descricao">descricao:</label>
                                        <textarea
                                            row="3"
                                            className="form-control config-input"
                                            type="text"
                                            id="descricao"
                                            name="descricao"
                                            required
                                            onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group col-sm-3">
                                        <label htmlFor="data">data:</label>
                                        <input
                                            className="form-control config-input"
                                            type="Date"
                                            id="data"
                                            defaultValue={this.state.Receita.data}

                                            onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-outline-primary btn-lg float-right" >Cadastrar</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            )
        }
    }

    // Metodo para atualizar o estado do campo
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;     //pega o nome do camo atravez do target
        const value = target.value;   //pega o valor do camo atravez do target

        this.setState(prevState => ({
            Receita: { ...prevState.Receita, 
                [name]: value

            } //atualizando o estado do campo com o value
        }));


    };

 
    handleMoneyChange = (event, currencyValue, maskedValue) => {
        const target = event.target;
        const name = target.name; 
        this.setState(prevState => ({
            Receita: { ...prevState.Receita, 
                [name]: currencyValue
            } 
        }));
    }

    //metodo para salvar os dados
    handleSubmit = event => {
        fetch(`${API_ADDRESS}/Receita`, {
            method: "post",
            body: JSON.stringify(this.state.Receita),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {     //vereficar os dados
                if (data.ok) {
                    this.setState({ redirect: true });
                }
            })
        event.preventDefault();
    }
}

export default CriaReceita;

