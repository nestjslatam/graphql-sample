import React, { useContext } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { gql, useQuery } from '@apollo/client';

import { AppGlobalContext } from '../context';
import CrudCommands from '../components/layout/command';

const columns = [
  { field: 'id', headerName: 'Id', width: 300, editable: false },
  { field: 'key', headerName: 'Key', width: 200, editable: false },
  { field: 'name', headerName: 'Name', width: 300, editable: false },
  { field: 'status', headerName: 'Status', width: 100, editable: false }
];

const TAGS_QUERY = gql`
  {
    tags {
      id
      key
      name
      status
    }
  }
`;

const Tags = () => {
  const { data, loading, error } = useQuery(TAGS_QUERY);

  const context = useContext(AppGlobalContext);

  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setTags(data.tags);
    }
  }, [data, loading, error]);

  return (
    <>
      <CrudCommands />
      <div style={{ height: 800 }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={tags}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(e) => {
            context.data.id = e.id;
          }}
        />
      </div>
    </>
  );
};

export default Tags;
