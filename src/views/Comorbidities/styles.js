import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  header: {
    display: 'flex',
    flexDirection: 'column'
  },
  titleWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSave: {
    width: '258px',
    height: '48px',
    marginLeft: theme.spacing(3),
  },
  buttonAdd: {
    width: '124px',
    height: '48px',
    marginLeft: theme.spacing(1),
  },
  patientWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label:{
    fontSize: '24px',
    fontStyle: 'bold',
    marginBottom: theme.spacing(2),
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '-0.05px'
  },
  paper:{
    padding: theme.spacing(3),
    marginLeft: '25%',
    marginRight: '25%',
  },
  control: {
    marginBottom: theme.spacing(3)
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  textFieldWithButton: {
    display: 'flex',
    flex: 1,
  }
}));

export default useStyles;
