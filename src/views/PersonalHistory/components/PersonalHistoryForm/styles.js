import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSave: {
    width: '258px',
    height: '48px',
  },
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
