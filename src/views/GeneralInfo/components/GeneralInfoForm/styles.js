import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  titleWrapper: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSave: {
    width: '258px',
    height: '48px',
  },
  card: {
    padding: theme.spacing(2),
  },
}));

export default useStyles;
