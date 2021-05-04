import React, { Component } from 'react';
import api from '../../service/service';
import createPreview, {downloadPdf, setPdfData} from './templatePdf'

export default class DetailsPlanejamento extends Component {
  
  async componentDidMount () {                           
    const { id } = this.props.match.params;                  
    const response = await api.get(`/Planejamento/${id}`); 
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
      <h1>Relatorio</h1>
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