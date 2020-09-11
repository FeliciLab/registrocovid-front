import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fieldFormUTI: {
    marginTop: theme.spacing(2),
  },
  fieldFormUTIFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '20px',
    marginBottom: '20px',
  },
  formLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateField: {
    width: '95%',
  },
  UTIFormLabelSubtitle: {
    marginTop: '13px',
    marginBottom: '5px',
    display: 'block',
  },
  selectFieldLabel: {
    marginBottom: '10px',
  },
}));

export default useStyles;
