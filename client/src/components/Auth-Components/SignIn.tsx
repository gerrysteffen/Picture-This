import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../UI-Components/Copyright';
import APIs from '../../APIServices/index';
import { useDispatch } from 'react-redux';
import { setAlert, setAuth, setUser, setIsExisting } from '../../Redux/actions';

const theme = createTheme();

export default function SignIn() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [loadingButton, setLoadingButton] = useState(false);

  const dispatch = useDispatch()

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.currentTarget;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoadingButton(true);
    const res = await APIs.login(state);
    if (res.error) {
      setLoadingButton(false);
      dispatch(setAlert(true, 'error', res.message));
    } else {
      dispatch(setUser(res));
      dispatch(setAuth(true));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={state.email}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={state.password}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              loading={loadingButton}
              onClick={() => {
                handleSubmit();
              }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => {
                    alert('too bad');
                  }}
                  variant='body2'
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    dispatch(setIsExisting(false));
                  }}
                  variant='body2'
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
