import React, { Component } from 'react';
import api from '../../service/service';//import url base
import { Link } from 'react-router-dom';
import Tabela from './tabela'
import jwt_decode from 'jwt-decode';
import Moment from 'react-moment'

export default class indexplanejamento extends Component {
    
    constructor() {

        super();
          this.state = {
        planejamento: [], //dados da tabela
        planejamentoInfo: {},  //informações necessarias para paginação e apresentação dos dados
        page: 1,           //pagina inicial
        user : { 
            nivelUser: 3,
            user:""
        }
    };
  this.user();
} 

    

    componentDidMount() { // metodo executa automatico quando inicia a aplicação

        this.loadplanejamento();

    }

    user(){

        const token = localStorage.usertoken
        const decoded = jwt_decode(token) 
        if(decoded.nivel == 2){
		 this.setState({
            user: {
                nivelUser: decoded.nivel,
                user: decoded.nome
            }
		 })

         return decoded;
        }else{
            return decoded;
        }
    }
    
    loadplanejamento = async (page = 1) => {
       const user = this.user();
            if(user.nivel == 2){
            const response  = await api.get(`/planejamentoCoord/${user.nome}`); //buscar dos dados no banco
            this.setState({planejamento: response.data})
            }else{
            const response  = await api.get('/planejamentoCoord'); //buscar dos dados no banco
            const {docs, ...planejamentoInfo } = response.data; //armazenando lista do banco em um documento
            this.setState({planejamento: docs, ...planejamentoInfo, page})
            }
   }
    
    render() {
        const {planejamento} = this.state; // definir variaveis em seu estado atual, carregadas com a lista
        console.log(this.state.user.user, this.state.user.nivelUser)
        return (
            <>
            <h2 className="text-center">Planejamentos pedagógicos</h2>
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
            t[i]["dataPlanejamento"] = <Moment utc='GMT-3' format="DD/MM/YYYY" date={props[i]["dataPlanejamento"]}></Moment>
            t[i]["dataObjetivoGeral"] = <Moment utc='GMT-3' format="DD/MM/YYYY" date={props[i]["dataObjetivoGeral"]}></Moment>
            t[i]["detalhes"] = <Link to={`/profile/planejamentoCoordenador/detalhes/${props[i]["_id"]}`}>Detalhes</Link>
            t[i]["atualizar"] = <Link to={`/profile/planejamentoCoordenador/atualizar/${props[i]["_id"]}`}>Atualizar</Link>
            t[i]["remover"] = <Link to={`/profile/planejamentoCoordenador/remover/${props[i]["_id"]}`}>Remover</Link>
        }
        return t;
    }
    