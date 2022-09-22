import { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem } from "@mui/material";
import axios from 'axios';

const Register = () => {
  const [ name,setName ] = useState('');
  const [ address,setAddress ] = useState('');
  const [ phone,setPhone ] = useState('');
  const [ upline_id,setUplineId ] = useState('');
  const [ multipleUplineId, setMultipleUplineId ] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      address: address,
      phone: phone,
      upline_id: upline_id
    }

    axios.post(process.env.REACT_APP_URL + '/register', data)
         .then((data) => {
           if( data.status === 200 ) {
             console.log('success');
           }
         }).catch((err) => {
           console.log(err);
         }).then(() => {
           setName('');
           setAddress('');
           setPhone('');
           setUplineId('');
         })
  }

  const checkUplineId = (e) => {
    if( e.target.value !== '' ) {
    axios.get(process.env.REACT_APP_URL + `/${e.target.value}`)
         .then((data) => {
           if( data.data.length > 1 ) {
             setUplineId(0);
             setMultipleUplineId(data.data);
           } else {
             setUplineId(e.target.value);
           }
         }).catch((err) => {
           console.log(err)
         })
    }
  }

  return (
    <Container>
      <form style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }} onSubmit={handleSubmit}>
        <TextField label="Name" variant="standard" onChange={(e) => {setName(e.target.value)}} />
        <TextField label="Address" variant="standard" onChange={(e) => {setAddress(e.target.value)}} />
        <TextField label="Phone" variant="standard" onChange={(e) => {setPhone(e.target.value)}} />
        { multipleUplineId.length > 0
          ?
          (
            <Select value={upline_id} onChange={(e) => setUplineId(e.target.value)}>
            {multipleUplineId.map((data) => {
              return ( data != null && <MenuItem value={data.id}>{data.name} - {data.id}</MenuItem>)
            })}
            </Select>
          )
          :
        <TextField label="Upline Id" variant="standard" onChange={checkUplineId} />
        }
        <Button variant="contained" type="submit" >Register</Button>
      </form>
    </Container>
  )
}

export default Register
