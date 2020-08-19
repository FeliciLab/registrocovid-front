import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  fieldTesteRapido:{
    marginTop: theme.spacing(2)
  }
}));

export default useStyles;
