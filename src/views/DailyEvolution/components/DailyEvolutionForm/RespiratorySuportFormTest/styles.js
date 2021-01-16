import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  date: {
    display: 'flex',
    marginLeft: theme.spacing(2),
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
