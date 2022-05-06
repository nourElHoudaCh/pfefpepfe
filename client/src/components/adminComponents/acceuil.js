import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTheme } from '@mui/material/styles';
import MainCard from '../responsabledeventeComponents/dashboard/Default/cards/MainCard';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button } from '@mui/material';
  import React,{useEffect,useState, useRef} from 'react';
  import { Grid, MenuItem, TextField, Typography, List, ListItem, ListItemAvatar, ListItemText,  } from '@mui/material';
  import'./acceuil.css'
  import axios from 'axios'
// react plugin used to create charts
import {
  AreaChart,
 Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// reactstrap components
import {
  
  CardHeader,
 
  CardFooter,
  Card, CardTitle,CardBody,
  Row,
  Col,
} from "reactstrap";
const CardWrapper = styled(MainCard)(({ theme }) => ({ 
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
      position: 'relative',
      zIndex: 5
  },
  '&:after': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: theme.palette.primary[800],
      borderRadius: '50%',
      zIndex: 1,
      top: -85,
      right: -95,
      [theme.breakpoints.down('sm')]: {
          top: -105,
          right: -140
      }
  },
  '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      width: 210,
      height: 210,
      background: theme.palette.primary[800],
      borderRadius: '50%',
      top: -125,
      right: -15,
      opacity: 0.5,
      [theme.breakpoints.down('sm')]: {
          top: -155,
          right: -70
      }
  }
}));
function Home( a) {
  const theme = useTheme();
  const [usersnbr,setusersnbr]=useState([]) 
  async function getusersnbr() {
    axios.get("http://localhost:5000/facturation/allusersnombres").then(function(response) {
      setusersnbr(response.data)
  
    })}
  async function getusers() {
    axios.get("http://localhost:5000/facturation/allusers").then(function(response) {
      setusers(response.data)
  
    })}
    const [users,setusers]=useState([]) 
    useEffect(()=>{
     getusers() ;getusersnbr();
     },[])
    
  return (
    <>
    
      <div className="content">
        <br></br>
        <br></br>
        <div className='gridadminacceuil'>
          <div className='grid1'>
        <CardWrapper border={false} content={false}     sx={{
                                           
                                           backgroundColor: theme.palette.primary.light
                                         
                                       }}>
                    <Box sx={{ p: 0.25 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.light
                                        }}
                                    >
                                        <PersonOutlineIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color:'#FFFFFF',
                                                
                                            }}
                                        >
                                          Nombre des clients
                                        </Typography>
                                    }
                                    secondary={usersnbr.filter(datas => datas._id=='client' ).map((data) =>    <><Typography variant="h4" sx={{
                                        color: theme.palette.grey[500],
                                        mt: 0.5
                                    }}>{data.count}</Typography></>)}
                                   
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper></div>
                <div className='grid1'>
                <CardWrapper border={false} content={false}     sx={{
                                           
                                           backgroundColor: theme.palette.secondary.light
                                         
                                       }}>
                    <Box sx={{ p: 0.25 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.secondary.dark,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        <PersonOutlineIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color:'#FFFFFF',
                                                
                                            }}
                                        >
                                          Nombre des resonsables de ventes
                                        </Typography>
                                    }
                                    secondary={usersnbr.filter(datas => datas._id=='Responsable Ventes' ).map((data) =>    <><Typography variant="h4" sx={{
                                        color: theme.palette.grey[500],
                                        mt: 0.5
                                    }}>{data.count}</Typography></>)}
                                   
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
                </div>
                <div className='grid1'>
                <CardWrapper border={false} content={false}     sx={{
                                           
                                           backgroundColor: theme.palette.secondary.main
                                         
                                       }}>
                    <Box sx={{ p: 0.25 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.secondary.light,
                                            color: theme.palette.secondary.main
                                        }}
                                    >
                                        <PersonOutlineIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color:'#FFFFFF',
                                                
                                            }}
                                        >
                                          Nombre des Responsables de  Réglement
                                        </Typography>
                                    }
                                    secondary={usersnbr.filter(datas => datas._id=='Responsable Réglement' ).map((data) =>    <><Typography variant="h4" sx={{
                                        color: theme.palette.grey[500],
                                        mt: 0.5
                                    }}>{data.count}</Typography></>)}
                                   
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
                </div>  <div className='grid1'>
                <CardWrapper border={false} content={false}     sx={{
                                           
                                           backgroundColor: theme.palette.secondary.dark
                                         
                                       }}>
                    <Box sx={{ p: 0.25 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.secondary.light,
                                            color: theme.palette.secondary.dark
                                        }}
                                    >
                                        <PersonOutlineIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color:'#FFFFFF',
                                                
                                            }}
                                        >
                                          Nombre des Responsables de  Depot
                                        </Typography>
                                    }
                                    secondary={usersnbr.filter(datas => datas._id=='Responsable Depot' ).map((data) =>    <><Typography variant="h4" sx={{
                                        color: theme.palette.grey[500],
                                        mt: 0.5
                                    }}>{data.count}</Typography></>)}
                                   
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
                </div></div>
              <br></br> <br></br>
                
                <MainCard>
                    <Grid container >
                        <Grid item xs={15}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Nombre d'utilisateurs:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3"> 7 Dérniers ajout</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
              <AreaChart
          width={1000}
          height={280}
          data={users}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
            
          }}
        
        >

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend  />
          <Area
            type="monotone"
            dataKey="count"
            name="nombre d'utilisateurs"
            stroke={theme.palette.primary.dark} 
            fill={theme.palette.primary.dark} 
            strokeWidth="5"
            dot={{fill:"rgb(21, 101, 192)",stroke:"rgb(21, 101, 192)",strokeWidth: 1,r:1}} activeDot={{fill:'#1565c0',stroke:"#8884d8",strokeWidth: 5,r:7}}
          
           
          />
         
        </AreaChart>
        </Grid>
                    </Grid>
                </MainCard>
            
       
      </div>
    </>
  );
}

export default Home;
