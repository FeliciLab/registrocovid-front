import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: '#fff',
    width: 864,
    minHeight: 800,
    marginTop: 40,
    paddingLeft: 40,
    paddingTop: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
}));

export default useStyles;
