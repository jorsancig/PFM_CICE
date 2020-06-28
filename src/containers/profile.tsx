import React from 'react';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import AppNav from '../components/AppNav';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';



const username:string = localStorage.getItem('username')!
const name:string = localStorage.getItem('name_' + username)!
const nickname:string = localStorage.getItem('nickname_' + username)!
const birth:string = localStorage.getItem('birth_' + username)!
let formBirth
try {
  formBirth = birth !== 'null' ? new Date( birth ) : new Date()
} catch (error) {
  formBirth = new Date()
}

console.log( 'birth', birth )
console.log( 'birth', formBirth )

const initialFormData = Object.freeze({
  nickName:nickname !== 'null' ? nickname : 'foolUser',
  name:name !== 'null' ? name: 'Fool User',
  birth: formBirth,
  username: username !== 'null' ? username : 'fooluser@alotofgames.com',
  currentPassword: "",
  newPassword1: "",
  newPassword2: "",
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}




const SettingView =() => {
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e:any) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
    
  };

  const handleCalendarChange = (e:any) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      birth: new Date(e.valueOf()) // UNIX
    });
    console.log( formData.birth )
  };

  const handleSubmit = async (e:any) => {
    
    e.preventDefault()
      console.log(formData);
      console.log(99);

    const params = {
      currentUsername: localStorage.getItem( 'username' ),
      newUsername: formData.username,
      currentPass: formData.currentPassword,
      newPassword: formData.newPassword1,
      name: formData.name,
      nickname: formData.nickName,
      birth: formData.birth,

    }
    try {
      const url = `http://localhost:8000/api/auth/update`
      const user = await axios.post( url, params )

      console.log('user', user.status )
      const username = formData.username
      localStorage.setItem('username', username)
      localStorage.setItem('status_'+username, '1')
      localStorage.setItem('nickname_'+username, formData.nickName)
      localStorage.setItem('birth_'+username, formData.birth.toString())
      localStorage.setItem('name_'+username, formData.name)


      if( user.status === 200) return setOpen(true);
    } catch (error) {
      return setOpenError(true);

    }


    
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [openError, setOpenError] = React.useState(false);



  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  

  console.log( username,name,nickname,birth )
  console.log( localStorage )
  return(
    <>
      <AppNav />
      <Form className="form" >
        <Grid container spacing={0}>
            <Grid item xs={6}>
              <FormGroup>
              {/* nickname */}
              <Label>Nickname</Label>
                <Input
                  name="nickName"
                  id="nickName"
                  placeholder="user21"
                  value={formData.nickName !== 'null' ? formData.nickName : 'foolUser'}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
              {/* Name */}
              <Label>Nombre</Label>
                <Input
                  name="name"
                  id="name"
                  placeholder="Nombre Apellido"
                  value={formData.name !== 'null' ? formData.name : 'Fools User'}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
              {/* Birth */}
              <Label>Fecha de nacimiento</Label>
                <Calendar onChange={handleCalendarChange} value={formData.birth}/>
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
            <FormGroup>
              {/* nickname */}
              <Label>Email</Label>
                <Input
                  type='email'
                  name="username"
                  id="username"
                  placeholder="user@alotofgames.com"
                  value={formData.username !== 'null' ? formData.username : 'user@alotofgames.com'}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
              <Label>Contraseña actual</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="********"
                  onChange={handleChange}
                />
                <FormGroup>
              <Label>Nueva contraseña</Label>
                <Input
                  type="password"
                  name="newPassword1"
                  id="newPassword1"
                  placeholder="********"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
              <Label>Repetir nueva contraseña</Label>
                <Input
                  type="password"
                  name="newPassword2"
                  id="newPassword2"
                  placeholder="********"
                  onChange={handleChange}
                />
              </FormGroup>
              </FormGroup>
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AccountCircleIcon />}
                  onClick={handleSubmit}
                >
                  Actualizar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar usuario
                </Button>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">
                    Usuario actualizado correctamente
                  </Alert>
                </Snackbar> 
                <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error">
                    No se ha podido actualizar el usuario
                  </Alert>
                </Snackbar>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Form>



    </>
  );

}

export default SettingView;