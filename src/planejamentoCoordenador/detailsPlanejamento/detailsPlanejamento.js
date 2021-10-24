import React, { Component } from 'react';
import api from '../../service/service';
import createPreview, {downloadPdf, setPdfData} from './templatePdf'

export default class DetailsPlanejamento extends Component {
  
  async componentDidMount () {                           
    const { id } = this.props.match.params;                  
    const response = await api.get(`/planejamentoCoord/${id}`); 
    console.log(response.data);
    setPdfData(response.data)
    createPreview()
    
    console.log("PLANEJAMENTO",  response.data)
  }
  
  handleClick() {
    downloadPdf()
  }
  
  render () {
    
    return (<scroll>
      <div className="container">
      <h1>Relatório</h1>
      <button onClick={this.handleClick}>Download</button>
      <iframe
      frameborder="0"
      width="100%"
      height="700px"
      />
      </div>
      </scroll>
      );
    }
  }