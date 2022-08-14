import '../App.css';
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DataGrid from './DataGrid';

export const AdminPage = () => {
    return (
      <div>
        <Container fixed >
          <br/>
          <DataGrid/>
        </Container>
      </div>
    );
  }