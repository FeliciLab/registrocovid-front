import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    maxWidth: '860px',
  },
  heading: {
    display: 'flex',
    alignItems: 'center'
  },
  headingLabel: {
    marginRight: theme.spacing(1),
  },
  accordionDetails: {
    display: 'flex',
  },
  fieldData: {
    marginTop: theme.spacing(1),
  }
}));

export default useStyles;
