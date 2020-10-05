import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    marginRight: 10,
    height: '52px',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
