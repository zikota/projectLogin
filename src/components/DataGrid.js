import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../contexts/auth';
import { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 250,
    editable: false,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 250,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: false,
  },
  {
    field: 'verified',
    headerName: 'Verified',
    type: 'boolean',
    width: 110,
    editable: false,
  },
  {
    field: 'funds',
    headerName: 'Funds',
    type: 'number',
    width: 140,
    editable: false,
  },
];

export default function DataGridDemo() {
  const { authTokens, setTokens } = useContext(AuthContext);
  const [ rows, setRows ] = useState([]);
  const [ selectedIDs, setSelectedIDs ] = useState([]);
  const [ message, setMessage ] = useState("");


  React.useEffect(() => {
    getUsers();
  }, [])


  const getUsers = () => {
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
  }

  React.useEffect(()=>{
    //console.log(selectedIDs);
  }, [selectedIDs])

  const verifyUsers = async () => {
    console.log(selectedIDs);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authTokens}`);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    await selectedIDs.map(async(id) => {
      fetch("http://localhost:8000/api/verify/" + id, requestOptions)
      .then(response => response.text())
      .then((result) => {
        //alert(JSON.parse(result).message);
      })
      .catch(error => console.log('error', error));
    })
    setMessage("Selected users are verified!");
    setTimeout(() => { setMessage("")}, 3000);
    getUsers();
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <Typography textAlign="center" sx={{fontSize: '25px'}}>All Users</Typography>
    {
      message !== "" ? 
      <Alert variant="outlined" severity={"success"}>
        {message}
      </Alert> : ""
    }
    
    <br/>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        isRowSelectable={(params) => params.row.verified === 0}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(ids) => {
          const vselectedIDs = new Set(ids);
          setSelectedIDs(Array.from(vselectedIDs));
        }}
      />
      <br/><br/>
      <Button variant="contained" onClick={verifyUsers}> Verify selected users </Button>
    </Box>
  );
}