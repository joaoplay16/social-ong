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
        content: [
            {
                columns: [
                    { width: 'auto', text: [{ text: 'Aceitacao: ', bold: true }, planejamento.atividade] },
                    { width: 'auto', text: [{ text: 'Peso: ', bold: true }, 'planejamento.peso' + ' kg',] },
                    { width: 'auto', text: [{ text: 'Raça: ', bold: true }, 'planejamento.raca',] },
                    { width: 'auto', text: [{ text: 'Altura: ', bold: true }, 'planejamento.altura',] },
                ],
                style: ['label', 'columnStyle'],
            },        

        ],

        // 	footer: getFooter(),

        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'left',
                margin: [0, 40, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 0],
            },
            label: {
                fontSize: 15
            },
            columnStyle: {
                columnGap: 20,
                margin: [0, 10, 0, 0]
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

