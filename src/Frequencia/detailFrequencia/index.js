import React, { Component } from 'react';
import api from '../../service/service';//import url base
import createPreview, {downloadPdf, setPdfData} from './templatePdf'

class DetailFrequencia extends Component {
  constructor(props) {
    super();
    this.state = {
      Turma: {
        nome: ''
      },
      Frequencia: [],
      saveFeedBack: null,
      data: new Date().toLocaleDateString().substr(0, 10)//TODO mudar para props
    }
  }


  handleClick() {
    downloadPdf()
  }

  componentDidMount() {
    this.loadTurma()
    this.loadFrequencia()
  }

  componentDidUpdate() {
    //console.log("ADT", this.state.Frequencia);
    const params = this.props;
    console.log("params", params);
  }

  async loadTurma() {
    const { idTurma, data } = this.props.location.state;
    const response = await api.get(`/Turma/${idTurma}`); //buscar dos dados no banco
    const turma = response.data

    this.setState({
      Turma: turma,
      data
    })
  }

  async loadFrequencia() {
    let { idTurma, data } = this.props.location.state;
    console.log("LOCATION STATE", data, idTurma)
    data = data.replace(/[/]+/g,"-")
    const response = await api.get(`/Frequencia/${idTurma}/${data}`);
    const { docs: frequencia } = response.data

    this.setState({
      Frequencia: frequencia
    })

    setPdfData(frequencia)
    createPreview()
  }

  render() {
    return (
      <scroll>
      <div className="container">
        <h1>Relatorio de frequencia da turma <b>{this.state.Turma.nome}</b></h1>
        <button className='btn btn-lg btn-outline-success mr-1' onClick={this.handleClick}>Download</button>
        <button className='btn btn-lg btn-outline-secondary mr-1' onClick={()=> {this.props.history.push('/profile/frequencia')}}>Voltar</button>
        <iframe
          frameborder="0"
          width="100%"
          height="700px"
        />
      </div>
    </scroll>
    )
  }

 
}

export default DetailFrequencia;