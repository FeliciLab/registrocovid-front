import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
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
