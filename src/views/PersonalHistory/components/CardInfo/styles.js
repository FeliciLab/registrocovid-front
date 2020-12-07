import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  cardInfo: {
    padding: theme.spacing(2),
    // maxWidth: 570,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 4,
  },
  description: {
    fontSize: 14,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
