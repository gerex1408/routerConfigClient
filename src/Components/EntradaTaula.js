import {React,useState} from 'react'
import {FormControl,InputLabel,OutlinedInput,Select,MenuItem,Button,TextField} from "@mui/material"
import Swal from 'sweetalert2'
import Axios from "axios"
import AuthService from '../Services/AuthService'

export const Auth = new AuthService();

function EntradaTaula(props) {
    const [origen,setOrigen] = useState("")
    const [desti,setDesti] = useState("")
    const [interficie, setInterficie] = useState("")        
    
    const handleChangeDesti=(event)=>{
        setDesti(event.target.value)
    }
    const handleChangeOrigen=(event)=>{
        setOrigen(event.target.value)
    }
    const handleChangeInterficie=(event)=>{
        setInterficie(event.target.value)
    }

    const postEntry= async ()=>{
        if(origen!==desti){
          const body={
            origen:origen,
            desti:desti,
            interficie:interficie
          }
          try{
            await Axios.post("/ipTables",body,{
              headers:{
                "x-access-token": Auth.getToken()
              },
            })
            Swal.fire({
              icon: 'success',
              title: 'Configuració enviada',
              text: "El router s'ha configurat correctament!",
            })
            props.changeToggle(!props.toggle)
          }catch(err){
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
            title: "Error en els camps",
            text: "L'origen i el destí no poden ser els mateixos",
          })
        }
        
    } 

    return (
        <div className='FlexStart'>
            <FormControl focused={origen!==""} sx={{ width: "300px",marginTop:"30px" }} variant="outlined">
                <TextField
                value={origen}
                label="Xarxa origen"
                onChange={handleChangeOrigen}
                placeholder='0.0.0.0/0'
                >
                </TextField>
            </FormControl>

            <FormControl focused={origen!==""} sx={{ width: "300px",marginTop:"30px",marginLeft:"50px" }} variant="outlined">
                <TextField
                value={desti}
                onChange={handleChangeDesti}
                label="IP destí"
                placeholder='0.0.0.0'
                >
                </TextField>
            </FormControl>

            <FormControl sx={{ width: "150px",marginTop:"30px",marginLeft:"50px" }} variant="outlined">
            <InputLabel htmlFor="input3">Interfície</InputLabel>
            <OutlinedInput
                id="input3"
                value={interficie}
                onChange={handleChangeInterficie}
                label="Interfície"
                >
            </OutlinedInput>
            </FormControl>
            <Button sx={{marginTop:"30px",marginLeft:"50px"}} disabled={interficie==="" || desti==="" || origen===""} onClick={postEntry} variant="contained">ENVIAR</Button>
        </div>
    ) 
}

export default EntradaTaula