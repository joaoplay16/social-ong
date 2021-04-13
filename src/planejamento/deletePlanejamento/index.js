import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api, {API_ADDRESS} from '../../service/service';

class DeletePlanejamento extends Component{
    constructor(props) {
        super(props);

        this.state = {
            planejamento: {},
            redirect: false
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/planejamento/${id}`);
        this.setState({ planejamento: response.data });
    }

    render() {
        const { Despesa, redirect } = this.state;
        if (redirect) {
            return <Redirect to="/profile/planejamento/lista"/>
        } else {
            return (
                <div className="container">
                <h2 className="text-center">Remover Planejamento</h2>
                <div className="row d-flex justify-content-center">
                    <p className="alert alert-danger">
                        Tem certeza que deseja remover este planejamento ?
                    </p>
                </div>
                <div className="row d-flex justify-content-center">
                    <button
                        className="btn btn-outline-danger btn-lg mr-2"
                        onClick={this.handleClick}>
                        Remover
                </button>
                    <button
                        className="btn btn-outline-secondary btn-lg"
                        onClick={this.props.history.goBack}>
                        Voltar
                </button>
                </div>
            </div >
            )
        }
    }


    handleClick = event => {
        event.preventDefault();
        const { id } = this.props.match.params;
        fetch(`${API_ADDRESS}/planejamento/${id}`, {
            method: "delete"
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true});
                }
            })
    }
}

export default DeletePlanejamento;