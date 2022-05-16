import {React,useEffect,useState} from 'react'
import SideBar from "../Components/SideBar";
import AuthService from '../Services/AuthService'
import { Navigate } from "react-router-dom";
import Dhcp from '../Components/Dhcp';
import IpTables from '../Components/IpTables';
import Forwarding from '../Components/Forwarding';
import ReenviamentPorts from '../Components/ReenviamentPorts';

export const Auth = new AuthService();

export default function DashboardScreen() {


  const [backendData, setBackendData] = useState("")
  const [firstTab,setFirstTab] = useState(true)
  const [secondTab,setSecondTab] = useState(false)
  const [thirdTab,setThirdTab] = useState(false)
  const [fourthTab,setFourthTab] = useState(false)



  const setAllFalse = () =>{
    setFirstTab(false)
    setSecondTab(false)
    setThirdTab(false)
    setFourthTab(false)
  }

  const handleChangeTab = (i) =>{
    setAllFalse()
    switch (i){
      case 0:
        setFirstTab(true)
      case 1:
        setSecondTab(true)
      case 2:
        setThirdTab(true)
      case 3:
        setFourthTab(true)
      break
    }
  }

  return (
    Auth.loggedIn() ? (
        <div className="App">
          <SideBar changeTab={handleChangeTab}/>
          {
            firstTab ? (
              <Dhcp/>
            ):secondTab ? (
              <IpTables/>
            ):thirdTab ? (
              <Forwarding/>
            ): fourthTab && (
              <ReenviamentPorts/>
            )
          }
      </div>
    ):(
      <Navigate to="/login" />
    )
    
  )
}
