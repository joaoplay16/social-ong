import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

var docDefinition = {}

export function setPdfData(frequencias) {
  var rows = [["Data", "Turma", "Aluno", "Presente"]]
  frequencias.map((frequencia) =>
    rows.push([
      frequencia.data,
      frequencia.turma.nome,
      frequencia.aluno.nome,
      frequencia.presente ? 'sim' : 'não',
    ])
  )

  docDefinition = {
    content: [
      { text: "Relatorio de frequencia", style: "header" },

      {
        style: "tableExample",
        table: {
          widths: [100, "*", 100, 100],
          body: rows,
        },
      },
    ],
  }
}

export function downloadPdf() {
  pdfMake.createPdf(docDefinition).download("relatorio-de-frequencia.pdf")
}
export default function createPreview() {
  const pdfDocGenerator = pdfMake.createPdf(docDefinition)
  pdfDocGenerator.getBlob((blob) => {
    let iframe = document.querySelector("iframe")
    iframe.src = URL.createObjectURL(blob)
  })
}
