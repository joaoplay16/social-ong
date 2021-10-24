import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import api, { API_ADDRESS } from '../../service/service';
import jwt_decode from 'jwt-decode';

class UpdatePlanejamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planejamento: {
                usuario: "",
                miniProjeto: "",
                objetivoGeral: "",
                objetivoEspecifico: "",
                metodologia: "",
                observacao: "",
                dataObjetivoGeral: "",
                dataPlanejamento: ""
            },
            redirect: false,
        }
    }

    async componentDidMount() {
        this.setUser()

        const { id } = this.props.match.params;
        const response = await api.get(`/planejamentoCoord/${id}`); 
        this.setState({ 
            planejamento: response.data 
        }) 
	 }

     setUser(){
        const token = localStorage.usertoken
		if (token) {        
		  const decoded = jwt_decode(token)
		 this.setState({
		   usuario:  decoded.nome
		 })
		}
     }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return (
                <div className="alert alert-success aler" role="alert">
                    <p>Os dados foram atualizados com sucesso</p>
                </div>)
        } else {
            return (

                <form className="tituloForm" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend align="center">Atualizar Planejamento</legend>
                        <div className="card textForm">
                            <h3 align="center">Dados Pessoais</h3>
                           
                            <div className="card-body">

                            <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="miniProjeto">Mini projeto:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="miniProjeto"
                                            name="miniProjeto"
                                            required
                                            value={this.state.planejamento.miniProjeto}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="objetivoGeral">Objetivo geral:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="objetivoGeral"
                                            name="objetivoGeral"
                                            required
                                            value={this.state.planejamento.objetivoGeral}
                                            onChange={this.handleInputChange} />
                                    </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="objetivoEspecifico">Objetivo específico:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="objetivoEspecifico"
                                            name="objetivoEspecifico"
                                            required
                                            value={this.state.planejamento.objetivoEspecifico}
                                            onChange={this.handleInputChange} />
                                    </div>
                                    </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="aceitacao">Metodologia:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="metodologia"
                                            name="metodologia"
                                            required
                                            value={this.state.planejamento.metodologia}
                                            onChange={this.handleInputChange} />
                                    </div>
                                    </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="observacao">Observação:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="observacao"
                                            name="observacao"
                                            required
                                            value={this.state.planejamento.observacao}
                                            onChange={this.handleInputChange} />
                                    </div>
                                    </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-4">
                                        <label htmlFor="dataObjetivoGeral">Data do objetivo geral:</label>
                                        <input
                                            className="form-control config-input"
                                            type="Date"
                                            id="dataObjetivoGeral"
                                            name="dataObjetivoGeral"
                                            required
                                            value={this.state.planejamento.dataObjetivoGeral.substring(0, 10)}
                                            onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg float-right">Atualizar</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            )
        }
    }


     // Metodo para atualizar o estado do campo
     handleInputChange = event => {
        const target = event.target;
        const name = target.name;     //pega o nome do camo atravez do target
        const value = target.value;   //pega o valor do camo atravez do target

        this.setState(prevState => ({
            planejamento: { ...prevState.planejamento, [name]: value } //atualizando o estado do campo com o value
        }));

    };

    //metodo para salvar os dados
    handleSubmit = event => {
        event.preventDefault();
        const { id } = this.props.match.params;


        fetch(`${API_ADDRESS}/planejamentoCoord/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.planejamento),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {     //vereficar os dados
                if (data.ok) {
                    this.setState({ redirect: true });
                }
            })
    }

}

export default UpdatePlanejamento;