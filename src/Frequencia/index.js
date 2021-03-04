import React, { Component } from 'react';
import IndexFrequencia from './indexFrequencia';
import InsertFrequencia from './insertFrequencia';
import RegisterFrequencia from './insertFrequencia/insert';
import DetailFrequencia from './detailFrequencia';
import UpdateFrequencia from './updateFrequencia';



import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Frequencia extends Component {
  render() {
    return (
      <Router>
            <Switch>
              <Route path="/profile/frequencia" component={IndexFrequencia} />
              <Route exact path="/profile/nova-frequencia" component={InsertFrequencia} />
              <Route path="/profile/nova-frequencia/:id" component={RegisterFrequencia} />
              <Route path="/profile/detalhes-frequencia" component={DetailFrequencia} />
              <Route path="/profile/atualizar-frequencia" component={UpdateFrequencia} />
            </Switch>
        </Router>
      );
    }
  }
  
  
  
  
  
  