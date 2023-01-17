import './App.css';
import sky2 from "./sky2.jpg";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import Map from './components/map';
import {useState, useEffect} from 'react';
import axios from 'axios';


function App() {
  const matches = useMediaQuery('(min-width:600px)');
  const matches2 = useMediaQuery('(min-width:1000px)');
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState(0.1278);
  const [latitude, setLatitude] = useState(51.5074);

  useEffect(()=>{
    getLocation()
  },[]);
  
  const getLocation = async ()=>{
    setLoading(true);
    const res = await axios.get('http://api.open-notify.org/iss-now.json', {method:'GET', mode:'no-cors', headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }, })

    const {longitude, latitude} = await res.data.iss_position;
    setLongitude(parseFloat(longitude));
    setLatitude(parseFloat(latitude));
    setLoading(false);
    setTimeout(getLocation,15000)

  }

  return (
    <body className='App-logo' style={{backgroundImage: `url(${sky2})`}}>
      <Grid container sx={{p:5, display:'flex', justifyContent:'center',alignContent:'center', flexDirection:'column'}}>
        <Grid item sx={12}>
          <Box sx={{display:'flex', justifyContent:'center',color: 'white', fontFamily:'sans-serif', fontSize:matches? 50 : 30, mr: matches2?17:0}}>
            <h1>ISS Tracker</h1>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {!loading?
          <Box>
            <Map mapCenter={{lat:latitude, lng: longitude}}/>
          </Box>
          :<h1 style={{color: 'white'}}>Loading</h1>}
        </Grid>
      </Grid>
    </body>
  );
}

export default App;
