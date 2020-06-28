import React  from 'react';
import {  useHistory } from 'react-router-dom';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Col, Form, FormGroup, Label, Input} from 'reactstrap';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import validateUser from '../controllers/validateUser'


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



const initialFormData = Object.freeze({
  username: "",
  password: "",
  nick:"",
});


const Home = () => {

 
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


  const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e:any) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };
  const history = useHistory()
  const handleSubmit = async (e:any) => {
    
    e.preventDefault()
    console.log(formData.username, formData.password);
    const params = {
                      email: formData.username,
                      password: formData.password
                  }
                  console.log( params )
    const url = `/api/auth/login`
    const user = await axios.post( url, params )
    console.log( 'user', user )
    if( await user.status === 200 ){
      const username = formData.username

      localStorage.setItem('username', username)
      localStorage.setItem('status_'+username, '1')
      localStorage.setItem('nickname_'+username, user.data.userDB.nickname)
      localStorage.setItem('birth_'+username, user.data.userDB.birth)
      localStorage.setItem('name_'+username, user.data.userDB.name)



      // return history.push( `/search/` )

    }
  };

  const handleRegister = async ( e:any ) => {
    e.preventDefault()
    console.log(formData.username, formData.password, formData.nick);
    const url = `api/auth/signup`
    const params = {
      email: formData.username,
      password: formData.password,
      name: formData.nick,
    }
    const user = await axios.post( url, params )
    console.log( user )
    if ( user.status !== 200 ) return
    const username = localStorage.getItem('username')
		localStorage.clear()
    const newUsername = formData.username

    localStorage.setItem('username', newUsername)
    localStorage.setItem('status_'+newUsername, '1')
    localStorage.setItem('name_'+newUsername, formData.nick)

    return history.push( `/search/` )

  }

  const activedUser = validateUser()
    return(
      <div className="App">

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <header className="App-header">
              <img src='' />
              <h1>A LOT OF GAMES</h1>
            </header>
          </Grid>
          <Grid item xs={6}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Registro" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
            {!activedUser &&
              <Form className="form">
                <Col>
                  <FormGroup>
                    <Label>Usuario</Label>
                    <Input
                      type="email"
                      name="username"
                      id="exampleEmail"
                      placeholder="email@alotofgames.com"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Contraseña</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="********"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
              </Form>
            }
            {activedUser &&  
            <Button variant="contained" color="secondary" href="/search">
              Enjoy!
            </Button>}
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Form className="form">
                <Col>
                <FormGroup>
                    <Label>Nickname</Label>
                    <Input
                      name="nick"
                      id="nick"
                      placeholder="user21"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Usuario</Label>
                    <Input
                      type="email"
                      name="username"
                      id="exampleEmail"
                      placeholder="email@alotofgames.com"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Contraseña</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="********"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Button variant="outlined" onClick={handleRegister}>REGISTRAR</Button>
              </Form>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    );

//  return(   
// <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper >xs=12</Paper>
//         </Grid>
//       </Grid>
//     </div>
//  )  


}

export default Home;