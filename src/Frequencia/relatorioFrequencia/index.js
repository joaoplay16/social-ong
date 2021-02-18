import React, { Component } from "react"
import { Link } from "react-router-dom"
import api from "../../service/service" //import url base
import createPreview, {downloadPdf, setPdfData} from './templatePdf'

import Tabela from "./tabela"

class RelatorioFrequencia extends Component {
  constructor() {
    super()
    this.state = {
      Frequencia: [],
    }
  }
  async componentDidMount() {
    const response = await api.get("/Frequencia")
    setPdfData(response.data.docs)

    createPreview()
  }

  handleClick() {
    downloadPdf()
  }

  render() {
    return (
      <scroll>
        <div className="container">
          <h1>Relatorio</h1>
          <button onClick={this.handleClick}>Download</button>
          <iframe
            src={this.state.urlData}
            frameborder="0"
            width="100%"
            height="700px"
          />
        </div>
      </scroll>
    )
  }
}

function filtro(rows) {
  let t = rows.map((f) => {
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
      atualizar: <Link to={updateFrequencia}> Atualizar</Link>,
      detalhes: <Link to={detailFrequencia}> Detalhes</Link>,
      data: f.data,
      presente: f.presente ? "sim" : "não",
      turma: f.turma.nome,
      aluno: f.aluno.nome,
    }
  })
  return t
}

export default RelatorioFrequencia
