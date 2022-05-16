import { Typography,Button } from '@mui/material'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import AuthService from '../Services/AuthService'
import Swal from 'sweetalert2'

export const Auth = new AuthService();

function Forwarding() {
  const [estatForwarding, setEstatForwarding] = useState(false)
  const [toggler, setToggler] = useState(false)

  useEffect(()=>{
    Axios.get("/forwarding",{
      headers:{
        "x-access-token": Auth.getToken()
      },
    }).then(res=>{
      if(res.data.state==1)setEstatForwarding(true)
      else setEstatForwarding(false)
    }).catch(err=>console.log(err))
  },[toggler])

  const canviarEstat=async ()=>{
    try{
      let state = estatForwarding?0:1
      const body={
        state:state
      }
      await Axios.post("/forwarding",body,{
        headers:{
          "x-access-token": Auth.getToken()
        },
      })
      Swal.fire({
        icon: 'success',
        title: 'Configuració enviada',
        text: "El router s'ha configurat correctament!",
      })
      setToggler(!toggler)
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
      <h2>Configuració del IP Forwarding</h2>
      <div className='FormContainer'>
        <Typography color="#000" variant="h6">Estat del IP Forwarding: <span style={estatForwarding?{color:"#5cb85c"}:{color:"#ff3333"}}>{estatForwarding?"Activatat":"Desactivat"}</span></Typography>
        <Button sx={{marginTop:"40px"}} onClick={canviarEstat} color={estatForwarding?"error":"success"} variant="contained">{estatForwarding?"DESACTIVAR":"ACTIVAR"}</Button>
      </div>
    </div>
  )
}

export default Forwarding