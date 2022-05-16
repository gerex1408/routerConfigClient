import {React,useEffect} from "react";
import {Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import {DataArray, Dns, FormatAlignCenter, Forward, CompareArrows, VpnLock } from "@mui/icons-material"

const drawerWidth = 260;

export default function SideBar(props){
    return(
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          
          <ListItem disablePadding >
            <ListItemButton onClick={()=> props.changeTab(0)}>
              <ListItemIcon>
                <Dns />
              </ListItemIcon>
              <ListItemText primary={"DHCP"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding >
            <ListItemButton onClick={()=> props.changeTab(1)}>
              <ListItemIcon>
                <FormatAlignCenter />
              </ListItemIcon>
              <ListItemText primary={"IP Tables"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding >
            <ListItemButton onClick={()=> props.changeTab(2)}>
              <ListItemIcon>
                <Forward />
              </ListItemIcon>
              <ListItemText primary={"Forwarding"} />
            </ListItemButton>
          </ListItem>  

          <ListItem disablePadding >
            <ListItemButton onClick={()=> props.changeTab(3)}>
                <ListItemIcon>
                  <CompareArrows />
                </ListItemIcon>
                <ListItemText primary={"Reenviament de ports"} />
            </ListItemButton>
          </ListItem>  
        </List>
        <Divider />
      </Drawer>
    )
}