import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '864px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formWraper: {
    display: 'flex',
  },
  fieldWraper: {
    marginTop: theme.spacing(1),
  },
  field: {
    marginTop: theme.spacing(1),
  },
  formLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
