import React from 'react';
import { MDBDataTable, MDBFooter } from 'mdbreact';

const DatatablePage = (props) => {

  const data = {
    columns: [
      {
        label: 'Atividade',
        field: 'atividade',
        sort: 'asc',
        width: 270,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Atividade',
        },
      },
      {
        label: 'Data Planejamento',
        field: 'Planejamento',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Data Atividade',
        field: 'Atividade',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Detalhes',
        field: 'detalhes',
        sort: 'asc',
        width: 200
      },
    ],
    rows: props.rows
  };

  return <MDBDataTable
    striped
    bordered
    medium
    data={data}
    hover
    entriesOptions={[5, 10, 15, 20, 25, 30]}
    entries={15}
    pagesAmount={4}
    noBottomColumns
  />
}


export default DatatablePage