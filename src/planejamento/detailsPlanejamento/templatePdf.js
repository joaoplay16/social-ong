import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

var docDefinition = {}


function createLine() {
  return {
    canvas: [
      {
        type: 'rect',
        x: 0,
        y: 10,
        w: 520,
        h: 0,
        r: 8,
        lineWidth: 2,
        lineColor: '#CC5',
      },
    ]
  }
}

function createSignatureLine() {
  return {
    canvas: [
      {
        type: 'rect',
        x: 0,
        y: 10,
        w: 320,
        h: 0,
        r: 8,
        lineWidth: 1,
        lineColor: '#000000',
      },
    ],
    absolutePosition: { y: 799 },
    alignment: 'center'
  }
}


function getFooter() {
  return {
    
    columns: [
      { text: 'Assinatura: ', width: 'auto', margin: [40, 0, 0, 0] },
      { canvas: createSignatureLine(), width: 'auto' },
      
    ]
  }
}


export function setPdfData(planejamento) {
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
          widths: ['*', '*'],
          body: [
            [ {text: 'Data do planejamento', bold: true, fontSize: 14}, {text: 'Data da atividade', bold: true, fontSize: 14}],
            [ {text: new Date(planejamento.dataPlanejamento).toLocaleDateString(), bold: false, fontSize: 14},
               {text: new Date(planejamento.dataAtividade).toLocaleDateString(), bold: false, fontSize: 14}],
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

