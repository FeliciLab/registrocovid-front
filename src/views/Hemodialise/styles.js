import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  titleWrapper: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionSection: {
    display: 'flex',
  },
  buttonSave: {
    width: '200px',
    height: '48px',
  },
  HemodialiseContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(6),
  },
}));
export default useStyles;
