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
    display: 'flex',
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
  headerCardLabel: {
    width: '40%',
  },
  headerCardDeleteButton: {
    width: '30%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formControl: {
    width: '100%',
    display: 'flex',
    paddingBottom: theme.spacing(4),
  },
  formControlContainer: {
    display: 'flex',
  },
  formLabel: {
    paddingBottom: '20px',
  },
  formSubtitle: {
    paddingBottom: '10px',
  },
  formInputDate: {
    width: '100%',
  },
}));

export default useStyles;
