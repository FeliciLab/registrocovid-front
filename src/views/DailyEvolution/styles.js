import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  rightContent: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonSave: {
    width: '258px',
    height: '48px',
  },
}));

export default useStyles;
