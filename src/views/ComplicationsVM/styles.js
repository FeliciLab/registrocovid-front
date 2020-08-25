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
  rightContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSave: {
    width: '258px',
    height: '48px',
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  form: {
    backgroundColor: '#fff',
    width: 864,
    minHeight: 800,
    marginTop: 40,
    paddingLeft: 40,
    paddingTop: 24
  },
  formGroup: {
    marginBottom: 24,
    width: '100%'
  },
  cardInfo: {
    padding: 16,
    width: 570,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    // color: theme.palette.primary.main,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    fontSize: 16
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 4
  },
  description: {
    fontSize: 14
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  panels: {
    width: '50%',
    marginBottom: 24,
  },
  dateField: {
    marginTop: theme.spacing(1)
  },
  deleteIcon: {
    transform: 'rotate(180deg)'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralPaper: {
    width: 864,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
  },
  headerForm: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  selectField: {
    height: '48px',
    marginRight: theme.spacing(1),
  },
  accordionDetails: {
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
    }
  },
  fullWidth: {
    width: '100%'
  }
}));

export default useStyles;
