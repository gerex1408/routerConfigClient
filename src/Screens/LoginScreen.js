import { Typography, FormControl, InputLabel, OutlinedInput,InputAdornment,IconButton,Button } from '@mui/material'
import {React,useState} from 'react'
import {Visibility,VisibilityOff} from "@mui/icons-material"
import AuthService from '../Services/AuthService'

export const Auth = new AuthService();


function LoginScreen() {

    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleChangePassword=(event)=>{
        setPassword(event.target.value)
    }
    const handleClickShowPassword=()=>{
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword=(event)=>{
        event.preventDefault()
    }
    const submitPassword =()=>{
        Auth.login(password)
    }

  return (
    <div className='LoginScreen'>
        <div className='FormContainer'>
            <Typography variant='h4' color={"#000"}>Enter the router password</Typography>
            <FormControl sx={{ m: 1, width: "100%",marginTop:"30px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChangePassword}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <div className='FlexCenter' style={{marginTop:"20px"}}>
                <Button onClick={submitPassword} variant="contained">SUBMIT</Button>
            </div>
            
        </div>   

    </div>
  )
}

export default LoginScreen