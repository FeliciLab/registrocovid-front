import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    pointerEvents: 'none',
    marginRight: 10,
    height: 48
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
