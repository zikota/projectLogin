import '../App.css';
import * as React from 'react';
import Container from '@mui/material/Container';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/auth';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';


export const UsersPage = () => {
    const { authTokens, setTokens } = useContext(AuthContext);
    const [ instruments, setInstruments ] = useState([]);

    useEffect(() => {
      var axios = require('axios');

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${authTokens}`);
  
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/instrument',
        headers: myHeaders
      };
  
      axios(config)
        .then(function (response) {
  
          const transformedData = response.data.data.data.map((instrument) => {
            var imageURL = instrument.photo.split('/assets/');

  
            return { id: instrument.id, name: instrument.name, image: imageURL[0] + ":8000/assets/" + imageURL[1], description: instrument.description, price: instrument.price }
          });
          setInstruments(transformedData);
        })
  
        .catch(function (error) {
          console.log(error);
        });
  
    }, []);

    useEffect(() =>{
        console.log(instruments);
    }, [instruments])

    return (
      <div>
        <Container  >
          <Typography variant='h2'  align="center"> Instruments </Typography>
          <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ textAlign: "center" }}>
            
            {
                instruments.map((instrument) => { return (
                  <Grid item xs={12} md={7} lg={4}>
                    <Grid item> 
                        <Card sx={{ maxWidth: 300,minHeight:300 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={instrument.image}
                                    alt={instrument.name}
                                    height="200"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {instrument.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {instrument.description}
                                    </Typography>
                                    <Typography variant="h5" color="text.secondary">
                                        {instrument.price + "$"}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                  </Grid>
                )
                })
            }
            </Grid>
            <br/><br/>
        </Container>
      </div>
    );
  }