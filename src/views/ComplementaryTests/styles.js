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
  actionSection: {
    display: 'flex',
  },
  titleWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSave: {
    width: '200px',
    height: '48px',
  },
  content: {
    padding: theme.spacing(2),
    maxWidth: '864px',
  },
}));

export default useStyles;
