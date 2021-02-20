import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../template/style.css';

export default class header extends Component {
  render () {
    return (
      <ul className="nav nav-pills nav-fill ulIdex">
        <li className="nav-item">
          <Link to="/profile/planejamento/lista">  <a className="nav-link botIndex" href="#">Lista Planejamento</a></Link>
        </li>
        <li className="nav-item">
          <Link to="/profile/planejamento/cadastro">  <a className="nav-link botIndex" href="#">Cadastro Planejamento</a></Link>
        </li>
        <li className="nav-item">
          <Link to="/profile/planejamento/relatorios"> <a className="nav-link botIndex" href="#">Relatorios</a></Link>
        </li>
      </ul>
    )
  }
}