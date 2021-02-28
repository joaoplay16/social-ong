import React, { Component } from "react"
import { Link } from "react-router-dom"
import api from "../../service/service" //import url base

import Tabela from "./tabela"

class IndexTurmaAluno extends Component {
  constructor() {
    super()
    this.state = {
      Frequencia: [],
    }
  }

  componentDidMount() {
    this.loadFrequencia()
  }

  async loadFrequencia() {
    const response = await api.get(`/Frequencia`) //buscar dos dados no banco
    const { data: frequencia } = response
    console.log("LOAD F", frequencia)
    this.setState({
      Frequencia: frequencia,
    })
  }

  render() {
    return (
      <div>
        <Link to="/profile/educacao/cadastro-frequencia">
          <button className="btn-lg btn-outline-primary my-4">
            Nova frequencia
          </button>
        </Link>
        <Link to="/profile/educacao/relatorio-frequencia">
          <button className="btn-lg btn-outline-info my-4">Relatorio</button>
        </Link>
        <Tabela rows={filtro(this.state.Frequencia)} />
      </div>
    )
  }
}

function filtro(rows) {
  let t = rows.map((f) => {
  console.log("F", f.data)

    let updateFrequencia = {
      pathname: `/profile/educacao/update-frequencia`,
      state: {
        idTurma: f.turma._id,
        data: f.data,
      },
    }

    let detailFrequencia = Object.assign({}, updateFrequencia, {
      pathname: `/profile/educacao/detalhes-frequencia`,
    })

    return {
      detalhes: <Link to={detailFrequencia}> Detalhes</Link>,
      data: f.data,
      turma: f.turma.nome,
      idTurma: f.turma._id,
    }
  })
  return t
}

export default IndexTurmaAluno
