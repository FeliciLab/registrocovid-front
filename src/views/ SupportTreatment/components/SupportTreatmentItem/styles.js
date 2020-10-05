import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    maxWidth: '860px',
  },
  formWraper: {
    display: 'flex',
  },
  fieldWraper: {
    marginTop: theme.spacing(1),
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
  },
  headingLabel: {
    marginRight: theme.spacing(1),
  },
  accordionDetails: {
    display: 'flex',
  },
  field: {
    marginTop: theme.spacing(1),
  },
  fieldData: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
