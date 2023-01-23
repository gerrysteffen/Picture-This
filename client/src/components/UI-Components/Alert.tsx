import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function NavAlert(props: any) {
  return (
    <Box sx={{ position:'absolute', top:props.verticalPosition, width: '100%', display:'flex', justifyContent: 'center' }}>
      <Alert sx={{ width: '50%' }} severity={props.alertContent.severity}>
        {props.alertContent.message}
      </Alert>
    </Box>
  );
}
