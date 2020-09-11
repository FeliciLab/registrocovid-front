import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  headerCard: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    height: '60px',
  },
  headerCardDate: {
    color: 'rgba(0, 0, 0, 0.54)',
    width: '30%',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  headingLabel: {
    width: '30%',
    marginRight: '15px',
  },
  headerCardDeleteButton: {
    width: '30%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formControlContainer: {
    display: 'flex',
  },
  formText: {
    paddingBottom: '20px',
  },
  formSubtitle: {
    paddingBottom: '10px',
  },
  formInputDate: {
    width: '90%',
  },
  textField: {
    width: '100%',
  },
  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldData: {
    marginTop: theme.spacing(1),
  },
  gridContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: '10px',
    flexDirection: 'column',
  },
}));

export default useStyles;
