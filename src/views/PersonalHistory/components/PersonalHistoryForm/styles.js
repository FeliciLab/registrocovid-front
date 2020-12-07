import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: '#fff',
    maxWidth: '864px',
  },
  formGroup: {
    marginBottom: 24,
  },
}));

export default useStyles;
