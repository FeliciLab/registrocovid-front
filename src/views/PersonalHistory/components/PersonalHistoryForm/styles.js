import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    maxWidth: '864px',
  },
}));

export default useStyles;
