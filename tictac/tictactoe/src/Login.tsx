import { Button, TextField, Stack, Box } from '@mui/material';
import  { getSession }  from './Tools';


//Katso mallia Game.tsx:sta ja siirrä tämä Login-koodi omaan tiedostoonsa harjoituksessa 2
function Login(props : any) 
{
	let config = props.config;
	let email : string = "";
	let pass : string = "";
	return(
      <Box className="perus" 
          sx={{
          height:700,
          width:500,
          borderRadius:5,
          }}>
      <Stack sx={{
         display:'flex',
         boxSizing:'border-box',
         padding:'40px',
         marginTop:'30%',
         width:'100%',
         height:'100%',
         flexDirection:'column',
         gap:'4px',
         backdropFilter:'brightness(0.6)',
         color:'white',
         }}>
      <TextField 
         onChange={e => {email=e.target.value;}}
         label="Sähköposti"
         variant="filled"
         sx={{
               background: 'rgba(255,255,255,0.4)',
               color:'white',
               border:'none',
               text:'white',
               textAlign:'center',
               borderRadius:'5px',
               label: {color:'white'},
               
            }} 
      />
		<TextField 
         id="passu"
         label="Salasana"
         type="password"
         variant="filled"
         onChange={e => {pass=e.target.value;}}
         sx={{
               background: 'rgba(255,255,255,0.4)',
               color:'white',
               border:'none',
               text:'white',
               textAlign:'center',
               borderRadius:'5px',
               label: {color:'white'},
            }}
      />
		<Button
         variant="contained"
         onClick={e => getSession(e, email, pass, config.serviceroot, config.login)}
         sx={{
            background:'linear-gradient(0deg, rgba(34,71,195,0.4) 0%, rgba(45,209,253,0.9) 100%)',
            height:50,
            width:'100%',
            padding:3,
            border:'none',
            marginBottom:'20px'
            }}>
      Kirjaudu
      </Button>
      </Stack>
      </Box>
      );
}

export default Login;