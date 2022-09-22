import { Container, TextField, Button, Stack, Box, Alert } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import axios from 'axios';

const Search = () => {
  const [search, setSearch] = useState('')
  const [upline, setUpline] = useState({});
  const [user, setUser] = useState({});
  const [downline, setDownline] = useState([]);
  const [error, setError] = useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'Nomor ID'
    },
    {
      field: 'name',
      headerName: 'Nama'
    },
    {
      field: 'address',
      headerName: 'Alamat'
    },
    {
      field: 'phone',
      headerName: 'No Telepon'
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_URL, { search })
         .then((data) => {
           setUser(data.data.user);
           setUpline(data.data.Upline);
           setDownline(data.data.Downline);
           setError(false);
         }).catch((err) => {
           setError(true);
           setUser({});
           setUpline({});
           setDownline([]);
         })
  }

  return (
    <Container>
      {
      error && (
        <Alert severity='success' color="info">
            Not Found
        </Alert>
      )
      }
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
        <TextField label="ID/PHONE/NAME" variant="standard" onChange={(e) => {setSearch(e.target.value)}} />
        <Button variant="contained" type="submit">Search...</Button>
      </form>
      <Container>
        <Stack>
          <h1>User :</h1>
          <Box>
            { user !== null ?
(

            <Stack>
              <h5>Name : {user.name}</h5>
              <h5>Phone : {user.phone}</h5>
              <h5>Address : {user.address}</h5>
            </Stack>
)
              :
            (
              <h1>Unavailable</h1>
            )}
          </Box>
          <h1>Upline</h1>
          <Box>
            {
            upline !== null ?
(

            <Stack>
              <h5>Name : {upline.name}</h5>
              <h5>Phone : {upline.phone}</h5>
              <h5>Address : {upline.address}</h5>
            </Stack>
)
                :
              <h1>Unavailable</h1>
            }
          </Box>
          <h1>Downline</h1>
    <div style={{ height: '400px', width: '100%' }}>
    <DataGrid rows={downline} columns={columns} />
          </div>
        </Stack>
      </Container>
    </Container>
  )
}

export default Search
