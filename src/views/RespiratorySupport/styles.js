import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(4),
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleWrapper: {
    display: 'flex',
    width: '100%',
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
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
