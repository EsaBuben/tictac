import {  Stack, Button } from '@mui/material'
import { Page } from './TicTacToe'

const TopBar = () => {

  return(
  <Stack 
  sx={{
    position:'fixed',
    top:0,
    left:'15%',
    alignContent:'center',
    background:'rgba(0,0,0,0.7)',
    display:'flex',
    boxSizing:'border-box',
    padding:'15px',
    margin:0,
    borderRadius:'0 0 200px 200px',
    width:'70%',
    height:'10%',
    flexDirection:'row',
    justifyContent:'space-between',
    gap:'4px',
  }}>
    <Button variant="text"
    onClick={e => Page("login")}
    >
TikkiTakkiToe -peli
    </Button>
    <Button
         variant="contained"
          onClick={e => Page("register") }
         sx={{
            background:'linear-gradient(0deg, rgba(34,71,195,0.4) 0%, rgba(45,209,253,0.9) 100%)',
            height:10,
            width:'30%',
            padding:1.5,
            border:'none',
            marginBottom:'20px'
            }}>
            Register
      </Button>
  </Stack>
  )
}


export default TopBar