import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { StateType } from '../../types';

function AlertMessage(props: any) {
  return (
    <Box sx={{ position:'absolute', top:'80px', width: '100%', display:'flex', justifyContent: 'center' }}>
      <Alert sx={{ width: '90%' }} severity={props.alertContent.severity}>
        {props.alertContent.message}
      </Alert>
    </Box>
  );
}

const mapStateToProps = (state: StateType) => {
  return {
    alertContent: state.alertContent,
  };
};

export default connect(mapStateToProps)(AlertMessage);
