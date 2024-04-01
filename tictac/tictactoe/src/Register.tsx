import { Box, Stack, TextField, Button } from '@mui/material'
import { getSession } from './Tools'


// export function confirmSession(j : any)
// {

// 	if (j.success)
// 	{
//       alert("Rekisteröityminen onnistui");
//       Page("login");
// 	}
// 	else 
// 	{
// 		alert("Rekisteröityminen epäonnistui");
// 	}
// }

// function showError(e : any)
// {
// 	alert("Uuupsii... ei tainnut nyt onnistua se palvelimen kanssa keskustelu pidemmälle... tai sitten on JSON jotain omituista... Katsohan konsolia.");
// 	console.log(e);
// }

export function RegisterSession(event : any, m: string, p: string, p2:string, c : any)
{
   if(p === p2) {
   getSession(event, m, p, c.serviceroot, c.register);
   } else alert("Salasanat eivät täsmää");
}

function Register(props : any) 
{
	let config = props.config;
	let email : string = "";
	let pass : string = "";
   let repass : string = "";
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
         required
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
         required
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
      <TextField 
         required
         id="passu"
         label="Toista salasana"
         type="password"
         variant="filled"
         onChange={e => {repass=e.target.value;}}
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
         onClick={e => RegisterSession(e, email, pass, repass, config)}
         sx={{
            background:'linear-gradient(0deg, rgba(34,71,195,0.4) 0%, rgba(45,209,253,0.9) 100%)',
            height:50,
            width:'100%',
            padding:3,
            border:'none',
            marginBottom:'20px'
            }}>
      Rekisteröidy
      </Button>
      </Stack>
      </Box>
      );
}

export default Register