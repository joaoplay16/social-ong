import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

var docDefinition = {}

export function setPdfData(planejamento) {

  const dAtividade = new Date(planejamento.dataAtividade)
  const dPlanejamento = new Date(planejamento.dataPlanejamento)

  const dataAtividade = `${dAtividade.getUTCDate()}/${dAtividade.getUTCMonth()+1}/${dAtividade.getUTCFullYear()}`
  const dataPlanejamento = `${dPlanejamento.getUTCDate()}/${dPlanejamento.getUTCMonth()+1}/${dPlanejamento.getUTCFullYear()}`

  docDefinition = {
    info: {
      title: 'awesome Document',
      author: 'john doe',
      subject: 'subject of document',
      keywords: 'keywords for document',
    },
    // playground requires you to assign document definition to a variable called dd
    
    content: [
      {
        text: 'Planejamento',
        style: 'header',
        alignment: 'center'
      },
      {
        table: {
          widths: ['*'],
          body: [
            [ {text: 'Servidor', bold: true, fontSize: 14}],
            [ {text: planejamento.usuario, bold: false, fontSize: 14}],
          ]
        },
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [ {text: 'Data do planejamento', bold: true, fontSize: 14}, {text: 'Data da atividade', bold: true, fontSize: 14}],
            [ {text: dataPlanejamento, bold: false, fontSize: 14}, {text: dataAtividade, bold: false, fontSize: 14}],
          ]
        },
      },
      {
        table: {
          widths: ['*'],
          body: [
            [{text: 'Atividade', bold: true, fontSize: 14}],
            [{text: planejamento.atividade, bold: false, fontSize: 14}],
            [{text: 'Rotina', bold: true, fontSize: 14}],
            [{text: planejamento.rotina, bold: false, fontSize: 14}],
            [{text: 'Aceitação', bold: true, fontSize: 14}],
            [{text:  planejamento.aceitacao, bold: false, fontSize: 14}],
            [{text: 'Observação', bold: true, fontSize: 14}],
            [{text:  planejamento.observacao, bold: false, fontSize: 14}],
          ]
        }
      },
      
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: 'justify',
        marginBottom: 15
      },
    }
  }
}

export function downloadPdf() {
  pdfMake.createPdf(docDefinition).open()
}
export default function createPreview() {
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getBlob((blob) => {
    let iframe = document.querySelector('iframe')
    iframe.src = URL.createObjectURL(blob)
  });
}

