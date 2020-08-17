import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    // alignItems: 'center'
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
  actionSection: {
    display: 'flex',
  },
  paperDataCadastro: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  paperNumProntuario: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  patienteInfo: {
    marginRight: theme.spacing(1),
  },
  buttonSave: {
    width: '258px',
    // height: '48px',
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  dateField: {
    marginTop: theme.spacing(1),
  },
  radioGroup: {
    marginTop: theme.spacing(1),
  }
}));

export default useStyles;
