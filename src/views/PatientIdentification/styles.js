import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    // alignItems: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'column'
  },
  titleWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  dateField: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
