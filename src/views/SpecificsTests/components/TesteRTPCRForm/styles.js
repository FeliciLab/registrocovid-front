import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  fieldTesteRTPCR: {
    marginTop: theme.spacing(2),
  },
  formLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorMessage: {
    color:  theme.palette.secondary.main,
  },
}));

export default useStyles;
