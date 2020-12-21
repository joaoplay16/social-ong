import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/service';//import url base

import Tabela from './tabela'


class IndexTurmas extends Component {

    constructor() {
        super()
        this.state = {
            Turmas: []
        }
    }

    async loadTurmas() {
        const response = await api.get(`/Turma`); //buscar dos dados no banco
        const { docs: turmas, ...info } = response.data
        this.setState({
            Turmas: turmas
        })
    }

    componentDidMount(){
        this.loadTurmas()
    }

    componentDidUpdate(){
        console.log(this.state.Turma);
    }

    render() {
        return (
            <>
                <h2 className="text-center">Nova frequência</h2>
                <Tabela rows={filtro(this.state.Turmas)} />
            </>
        )
    }
}

function filtro(props) {
    var t = []
    for (var i = 0; i < props.length; i++) {
        t.push(props[i]);
        t[i]["nome"] = props[i]["nome"]
        t[i]["frequencia"] = 
            <Link className="btn btn-outline-primary" 
                  to={`/profile/educacao/cadastro-frequencia/${props[i]._id}`} >Nova frequência</Link>
    }
    return t;
}

export default IndexTurmas;