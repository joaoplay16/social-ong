import React, { Component } from 'react';
import Header from '../planejamentoCoordenador/header';
import Insert from '../planejamentoCoordenador/cadastro/insertPlanejamento';
import Lista from '../planejamentoCoordenador/index/indexPlanejamento';
import Detalhes from '../planejamentoCoordenador/detailsPlanejamento/detailsPlanejamento';
import Deletar from '../planejamentoCoordenador/deletePlanejamento/index';
import Update from '../planejamentoCoordenador/updatePlanejamento/index';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class index extends Component {
  render() {
    return (
      <div>
        <Router>
          <header>
            <Header />
          </header>

          <section>
            <Switch>
              <Route path="/profile/planejamentoCoordenador/lista" component={Lista} />
              <Route path="/profile/planejamentoCoordenador/cadastro" component={Insert} />
              <Route path="/profile/planejamentoCoordenador/detalhes/:id" component={Detalhes} />
              <Route path="/profile/planejamentoCoordenador/atualizar/:id" component={Update} />
              <Route path="/profile/planejamentoCoordenador/remover/:id" component={Deletar} />
            </Switch>
          </section>
        </Router>
      </div>
    );
  }
}


