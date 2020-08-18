import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    display: 'flex',
    flexDirection: 'column',
  },
  spanButton: {
    fontSize: 10,
    letterSpacing: 1.25
  },
  strongButton: {
    fontSize: 16,
    letterSpacing: 1.25
  }
}));

export default useStyles;
