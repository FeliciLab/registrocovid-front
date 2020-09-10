import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  fieldFormNeurologic: {
    marginTop: theme.spacing(2),
  },
  fieldFormNeurologicFlex: {
    marginTop: theme.spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  formLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateField: {
    width: '90%',
  },
}));

export default useStyles;
