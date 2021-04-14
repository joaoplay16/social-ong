import React, { Component } from 'react';
import api from '../../service/service';//import url base
import { Link } from 'react-router-dom';
import Tabela from './tabela'
import Moment from 'react-moment'

export default class indexplanejamento extends Component {
    
    state = {
        planejamento: [], //dados da tabela
        planejamentoInfo: {},  //informações necessarias para paginação e apresentação dos dados
        page: 1           //pagina inicial
    };
    componentDidMount() { // metodo executa automatico quando inicia a aplicação
        this.loadplanejamento();
    }
    
    loadplanejamento = async (page = 1) => {
        const response = await api.get('/planejamento'); //buscar dos dados no banco
        const { docs, ...planejamentoInfo } = response.data; //armazenando lista do banco em um documento
        this.setState({planejamento: docs,planejamentoInfo, page }); // setando o estado de Pu.At. com informações da lista do banco 
    }
    
    render() {
        const {planejamento} = this.state; // definir variaveis em seu estado atual, carregadas com a lista
        return (
            <>
            <h2 className="text-center">Lista de planejamentos</h2>
            <Tabela rows={filtro(planejamento)}/>
            </>
            );
        }
    }
    
    function filtro (props) {
        var t = []
        for (var i = 0; i < props.length; i++) {
            t.push(props[i]);
            t[i]["servidor"] = <p>{props[i]["usuario"]}</p>
            t[i]["planejamento"] = <Moment utc='GMT-3' format="DD/MM/YYYY" date={props[i]["dataPlanejamento"]}></Moment>
            t[i]["Atividade"] = <Moment utc='GMT-3' format="DD/MM/YYYY" date={props[i]["dataAtividade"]}></Moment>
            t[i]["detalhes"] = <Link to={`/profile/planejamento/detalhes/${props[i]["_id"]}`}>Detalhes</Link>
            t[i]["atualizar"] = <Link to={`/profile/planejamento/atualizar/${props[i]["_id"]}`}>Atualizar</Link>
            t[i]["remover"] = <Link to={`/profile/planejamento/remover/${props[i]["_id"]}`}>Remover</Link>
        }
        return t;
    }
    