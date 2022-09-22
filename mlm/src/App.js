import './App.css';
import Register from './components/register';
import Search from './components/search';
import { Box, Tabs, Tab  } from '@mui/material';
import { useState } from 'react';
import TabPanel from './components/tabpanel';

function App() {

  const [value,setValue] = useState(0)

  const handleChange = (e, val) => {
    setValue(val);
  }

  return (
    <>
    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label='Register' />
        <Tab label='Search...' />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <Register />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <Search/>
    </TabPanel>
    </>
  );
}

export default App;
