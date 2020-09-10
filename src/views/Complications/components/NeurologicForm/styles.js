import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    width: '100%',
  },
  fieldFormNeurologic: {
    marginTop: theme.spacing(2),
  },
  fieldFormNeurologicFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  formLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textField: {
    width: '100%',
    marginTop: '15px',
  },
  neurologicFormGroup: {
    width: '100%',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
}));

export default useStyles;
