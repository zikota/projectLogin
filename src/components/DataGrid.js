import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../contexts/auth';
import { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 250,
    editable: true,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 250,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  {
    field: 'verified',
    headerName: 'Verified',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'funds',
    headerName: 'Funds',
    type: 'number',
    width: 140,
    editable: true,
  },
];

export default function DataGridDemo() {
    const { authTokens, setTokens } = useContext(AuthContext);
    const [ rows, setRows ] = useState([]);

  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authTokens}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("http://localhost:8000/api/users", requestOptions)
    .then(response => response.text())
    .then((result) => {
        var res = JSON.parse(result);
        console.log(res);
        setRows(res.data);
    })
    .catch(error => console.log('error', error));
  }, [])

  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <Typography textAlign="center" sx={{fontSize: '25px'}}>All Users</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}