import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  fieldFormDefault: {
    marginTop: theme.spacing(2),
  },
  fieldFormDefaultFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  formLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defaultFormGroup: {
    width: '100%',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  defaultFormLabelSubtitle: {
    marginTop: '13px',
    marginBottom: '5px',
    display: 'block',
  },
}));

export default useStyles;
