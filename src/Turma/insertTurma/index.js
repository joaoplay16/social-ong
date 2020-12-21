import React, { Component } from 'react';
import {API_ADDRESS} from '../../service/service';//import url base
import Turmas from '../indexTurma'
import './insert.css';

class CriarTurma extends Component {
    constructor() {
        super();

        this.state = {
            Turma: {
                nome: ''
            },
            saveFeedBack: '',
        }
    }
    render() {
        const { saveFeedBack } = this.state;

        return (
            <div className='container'>
                <h2 className="text-center">Cadastro de turma</h2>
                <div className="col-6 mt-5">
                    {saveFeedBack &&
                        <div className="alert alert-success aler" role="alert">
                            <p>{saveFeedBack}</p>
                        </div>}

                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name='nome'
                            onChange={this.handleInputChange}
                            placeholder="Nome da turma" />
                        <button className='btn btn-success ml-2' type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        )
    }

    // Metodo para atualizar o estado do campo
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;     //pega o nome do camo atravez do target
        const value = target.value;   //pega o valor do camo atravez do target

        this.setState(prevState => ({
            Turma: { ...prevState.Turma, [name]: value } //atualizando o estado do campo com o value
        }));

    };

    //metodo para salvar os dados
    handleSubmit = event => {
        fetch(`${API_ADDRESS}/Turma`, {
            method: "post",
            body: JSON.stringify(this.state.Turma),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {     //vereficar os dados
                this.setState({
                    saveFeedBack: data.ok ? 'sucesso' : 'falha'
                });

            })
        event.preventDefault();
    }  
   
}
export default CriarTurma;