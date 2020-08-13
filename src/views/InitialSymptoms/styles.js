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
  patientWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label:{
    fontSize: '24px',
    fontStyle: 'bold',
    marginBottom: theme.spacing(2)
  },
  paper:{
    padding: theme.spacing(3)
  },
  control: {
    marginBottom: theme.spacing(3)
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  fixWidthSize: {
    width: '300px'
  }
}));

export default useStyles;
