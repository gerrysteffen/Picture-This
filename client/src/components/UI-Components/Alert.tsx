import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function AlertMessage(props: any) {
  return (
    <Box sx={{ position:'absolute', top:props.verticalPosition, width: '100%', display:'flex', justifyContent: 'center' }}>
      <Alert sx={{ width: '90%' }} severity={props.alertContent.severity}>
        {props.alertContent.message}
      </Alert>
    </Box>
  );
}
