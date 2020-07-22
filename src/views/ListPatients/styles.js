import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4)
  },
  fieldNumProntuario: {
    margin: theme.spacing(1),
    width: '300px'
  },
  table: {
    marginTop: theme.spacing(4)
  }
}));

export default useStyles;
