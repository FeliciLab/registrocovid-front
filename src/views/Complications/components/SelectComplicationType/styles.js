import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  buttonAddType: {
    width: '258px',
    height: '50px',
  },
}));

export default useStyles;
