import {React,useState,useEffect} from 'react'
import {FormControl,InputLabel,OutlinedInput, Typography, Button,Backdrop,CircularProgress} from "@mui/material"
import Swal from 'sweetalert2'
import Axios from "axios"
import AuthService from '../Services/AuthService'

export const Auth = new AuthService();

function Dhcp() {
  const [ipXarxa,setIpXarxa] = useState("")
  const [mask,setMask] = useState("")
  const [iniciRangDHCP, setIniciRang] = useState("")
  const [finalRangDHCP, setFinalRang] = useState("")
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    Axios.get("/dhcp",{
      headers:{
        "x-access-token": Auth.getToken()
      },
    }).then(res=>{
      setIpXarxa(res.data.ip)
      setMask(res.data.mask)
      setIniciRang(res.data.inici)
      setFinalRang(res.data.final)
    }).catch(err=>console.log(err))
  },[])

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  const validarIP=(ip)=>{
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {  
      return true
    }  
    else return false
  }

  const  netmask2CIDR = (netmask) => {return (netmask.split('.').map(Number).map(part => (part >>> 0).toString(2)).join('')).split('1').length -1}

  const IPnumber = (IPaddress)=> {
    var ip = IPaddress.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if(ip) {
        return (+ip[1]<<24) + (+ip[2]<<16) + (+ip[3]<<8) + (+ip[4]);
    }
    return null;
  } 

  const IPmask = (netMask) => {
      return -1<<(32-netmask2CIDR(netMask))
  }

  const formaPartDelRang = (ip) =>{
    return (IPnumber(ip) & IPmask(mask)) === IPnumber(ipXarxa)
  }

  const validarInciRangIP = (ip) => {
    if(validarIP(ip) && formaPartDelRang(ip)){
      if(!validarIP(finalRangDHCP)){
        return true
      }
      else{
        if(IPnumber(iniciRangDHCP)>IPnumber(finalRangDHCP)) return false
        else return true
      }
    }
  }

  const validarFinalRangIp = (ip) => {
    if(validarIP(ip) && formaPartDelRang(ip)){
      if(!validarIP(iniciRangDHCP)){
        return true
      }
      else{
        if(IPnumber(iniciRangDHCP)>IPnumber(finalRangDHCP)) return false
        else return true
      }
    }
  }

  const handleOnChangeInciRangDHCP = (event) =>{
    setIniciRang(event.target.value)
  }
  const handleOnChangeFinalRangDHCP = (event) =>{
    setFinalRang(event.target.value)
  }

  const sendConfig = async () =>{
    if(validarIP(ipXarxa) && validarIP(mask) && validarInciRangIP(iniciRangDHCP) && validarFinalRangIp(finalRangDHCP)){
      const body = {
        ip : ipXarxa,
        mask : mask,
        inici : iniciRangDHCP,
        final : finalRangDHCP
      }
      try{
        handleToggle()
        let res = await Axios.post("/dhcp",body,{
          headers:{
            "x-access-token": Auth.getToken()
          },
        })
        await handleClose()
        await Swal.fire({
          icon: 'success',
          title: 'Configuració enviada',
          text: "El router s'ha configurat correctament!",
        })
      }catch(err){
        await handleClose()
        Swal.fire({
          icon: 'error',
          title: 'Error innesperat del servidor',
          text: 'El servidor no ha fet el que havia de fer... molt malament!',
        })
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error en algun dels camps',
        text: 'Comprova que tots els camps estiguin correctes',
      })
    }
  }

  return (
    <div className='tabContainer'>
      <h2>Configuració del DHCP</h2>
      <div className='FormContainer'>
        <Typography variant='h5' fontWeight={"bold"} color='#000'>Rang d'@IP de la xarxa</Typography>
        <div className='FlexStart'>
          <FormControl disabled sx={{ width: "300px",marginTop:"30px" }} variant="outlined">
              <InputLabel htmlFor="input1">Adreça IP de la xarxa</InputLabel>
              <OutlinedInput
                  id="input1"
                  type="text"
                  value={ipXarxa}
                  label="Adreça IP de la xarxa"
              />
          </FormControl>

          <FormControl disabled sx={{ width: "300px",marginTop:"30px",marginLeft:"50px" }} variant="outlined">
              <InputLabel htmlFor="input2">Màscara de la xarxa</InputLabel>
              <OutlinedInput
                  id="input2"
                  type="text"
                  value={mask}
                  label="Màscara de la xarxa"
              />
          </FormControl>
        </div>
        <Typography variant='h5' fontWeight={"bold"} color='#000' sx={{marginTop:"40px"}}>Rang d'@IP del DHCP</Typography>
        <div className='FlexStart'>
          <FormControl disabled={!validarIP(mask) || !validarIP(ipXarxa)} color={validarInciRangIP(iniciRangDHCP)&&"success"} focused={validarInciRangIP(iniciRangDHCP)} error={iniciRangDHCP!=="" && !validarInciRangIP(iniciRangDHCP)} sx={{ width: "300px",marginTop:"30px" }} variant="outlined">
              <InputLabel htmlFor="input3">Primera adreça del rang</InputLabel>
              <OutlinedInput
                  id="input3"
                  type="text"
                  value={iniciRangDHCP}
                  onChange={handleOnChangeInciRangDHCP}
                  label="Primera adreça del rang"
              />
          </FormControl>

          <FormControl disabled={!validarIP(mask) || !validarIP(ipXarxa)} color={validarFinalRangIp(finalRangDHCP)&&"success"} focused={validarFinalRangIp(finalRangDHCP)} error={finalRangDHCP!=="" && !validarFinalRangIp(finalRangDHCP)} sx={{ width: "300px",marginTop:"30px",marginLeft:"50px" }} variant="outlined">
              <InputLabel htmlFor="input3">Última adreça del rang</InputLabel>
              <OutlinedInput
                  id="input3"
                  type="text"
                  value={finalRangDHCP}
                  onChange={handleOnChangeFinalRangDHCP}
                  label="Última adreça del rang"
              />
          </FormControl>
        </div>
        <Button sx={{marginTop:"40px"}} onClick={sendConfig} variant="contained">SEND</Button>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Dhcp