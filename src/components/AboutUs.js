import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Typography, Link, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import photo from '../I&N.jpeg'

const mdTheme = createTheme();

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: '#24292F',
    '&:hover': {
        backgroundColor: 'black',
    },
}));

function AboutUs() {


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: '#FFF3EB',
                        flexGrow: 1,
                        minHeight: '83vh',
                        overflow: 'visible',
                    }}
                >
                    <Container maxWidth="l"
                        sx={{
                            mt: 4,
                            mb: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Grid container spacing={1}>

                            <Grid item xs={6}
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Box
                                    sx={{
                                        alignContent: 'center'
                                    }}>
                                        <Container maxWidth={100}>
                                            <Avatar
                                                alt="Ivana&Natasa"
                                                src={photo}
                                                sx={{
                                                    width: '50vh',
                                                    height: '50vh',
                                                    marginLeft: '15vh',
                                                    marginTop: '10vh'
                                                }}
                                                
                                            />
                                    </Container>

                                </Box>
                            </Grid>



                            <Grid item xs={6}>
                                <Box>
                                    <Container fixed sx={{
                                        
                                        marginTop:'10vh'
                                    }}>
                                        <Typography mt={2}>
                                            <strong>Ivana Zivkovic</strong> is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor urna. Morbi tempor placerat nibh id consequat. Aliquam nec dolor dolor. Cras odio tortor, fermentum sed eros porta, faucibus faucibus elit. Integer nec eleifend nulla, nec tincidunt tellus. Pellentesque ultricies ut nisl vel mattis. In maximus consectetur mauris interdum venenatis. Pellentesque aliquet sagittis tincidunt. Duis auctor risus id vestibulum pretium. Curabitur sit amet mi in lectus fringilla tempor. Quisque imperdiet molestie orci eget placerat.
                                        </Typography>
                                        <ColorButton variant="contained" startIcon={<GitHubIcon />} href="https://github.com/zikota">
                                            Github
                                        </ColorButton>
                                        <Typography mt={2}><strong>Natasa Popovic</strong> is a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor urna. Morbi tempor placerat nibh id consequat. Aliquam nec dolor dolor. Cras odio tortor, fermentum sed eros porta, faucibus faucibus elit. Integer nec eleifend nulla, nec tincidunt tellus. Pellentesque ultricies ut nisl vel mattis. In maximus consectetur mauris interdum venenatis. Pellentesque aliquet sagittis tincidunt. Duis auctor risus id vestibulum pretium. Curabitur sit amet mi in lectus fringilla tempor. Quisque imperdiet molestie orci eget placerat.</Typography>
                                        <ColorButton variant="contained" startIcon={<GitHubIcon />} href="https://github.com/popovicnatasa">
                                            Github
                                        </ColorButton>
                                    </Container>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default AboutUs;