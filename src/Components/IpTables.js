import {React,useEffect,useState} from 'react'
import Swal from 'sweetalert2'
import Axios from "axios"
import AuthService from '../Services/AuthService'
import EntradaTaula from './EntradaTaula'
import { Button,TableContainer, Table,TableHead,TableBody, TableCell, TableRow, Paper, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Auth = new AuthService();

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function IpTables() {
  const [entrades,setEntrades]=useState([])
  const [toggle,setToggle]=useState(false)

  useEffect(()=>{
    Axios.get("/ipTables",{
      headers:{
        "x-access-token": Auth.getToken()
      },
    }).then(res=>{
      setEntrades(res.data.entrades)
    })
  },[toggle])

  const removeEntry=async()=>{
    try{
        await Axios.delete("/ipTables",{
        headers:{
            "x-access-token": Auth.getToken()
        },
        })
        Swal.fire({
        icon: 'success',
        title: 'ConfiguraciĆ³ enviada',
        text: "El router s'ha configurat correctament!",
        })
        setToggle(!toggle)
    }catch(err){
        Swal.fire({
        icon: 'error',
        title: 'Error innesperat del servidor',
        text: 'El servidor no ha fet el que havia de fer... molt malament!',
        })
    }

  }

  

  return (
    <div className='tabContainer'>
      <h2>ConfiguraciĆ³ de les IP tables</h2>
      <div className='FormContainer'>
        {
          entrades[0]!==""&&(
            <div>
              <ThemeProvider theme={darkTheme}>
                <TableContainer component={Paper} >
                  {
                    entrades.map((entrada,i)=>(
                      <p style={{fontSize:"20px"}} key={i}>{entrada}</p>
                    ))
                  }
                  
                </TableContainer>
              </ThemeProvider>
              <Button sx={{marginTop:"30px"}} onClick={removeEntry} color="error" variant="contained">ELIMINAR TOTES LES ENTRADES</Button>
              </div>
          )
        }
        <EntradaTaula changeToggle={setToggle} toggle={toggle} />
      </div>
    </div>
  )
}

export default IpTables