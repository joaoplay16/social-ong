import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

var docDefinition = {}

export function setPdfData(frequencias) {
  var rows = [["Aluno", "Presente"]]
  frequencias.map((frequencia) =>
    rows.push([
      frequencia.aluno.nome,
      frequencia.presente ? 'sim' : 'não',
    ])
  )

  docDefinition = {
    content: [
      { text: `${frequencias[0].data}`, style: "header" },
      { text: `Relatorio de frequencia da turma "${frequencias[0].turma.nome}"`, style: "header" },

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
