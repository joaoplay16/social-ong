import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { API_ADDRESS} from '../../service/service'
import jwt_decode from 'jwt-decode';
import './index.css'

class CriaPA extends Component {
    constructor() {

        super();

        this.state = {
            planejamento: {
                usuario: "",
                rotina: "",
                atividade: "",
                aceitacao: "",
                observacao: "",
                dataAtividade: Date,
                dataPlanejamento: new Date()

            },
            redirect: false,
        }

    }

    componentDidMount() {
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
            return <Redirect to="/" />,
                <div className="alert alert-success aler" role="alert">
                    <p>Os dados foram salvos com sucesso</p>
                </div>
        } else {
            return (

                <form className="tituloForm" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend align="center">Cadastro de Planejamento</legend>
                        <div className="card textForm">
                            <h3 align="center">Dados Pessoais</h3>
                           
                            <div className="card-body">

                            <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="rotina">Rotina:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="rotina"
                                            name="rotina"
                                            required
                                            value={this.state.planejamento.rotina}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="atividade">Atividade:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="atividade"
                                            name="atividade"
                                            required
                                            value={this.state.planejamento.atividade}
                                            onChange={this.handleInputChange} />

                                            

                                    </div>
                                    </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="aceitacao">Aceitação:</label>
                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            type="text"
                                            id="aceitacao"
                                            name="aceitacao"
                                            required
                                            value={this.state.planejamento.aceitacao}
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
                                        <label htmlFor="dataAtividade">Data da Atividade:</label>
                                        <input
                                            className="form-control config-input"
                                            type="Date"
                                            id="dataAtividade"
                                            name="dataAtividade"
                                            required
                                            value={this.state.planejamento.dataAtividade}
                                            onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg float-right">Cadastrar</button>
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
        fetch(`${API_ADDRESS}/planejamento`, {
            method: "post",
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
        event.preventDefault();
    }

}

export default CriaPA;