import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  errorLoginMessage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorLoginMessageLabel: {
    marginLeft: theme.spacing(1),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  contentForm: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    display: 'flex',
    height: '100%',
    maxHeight: 200,
  },
  divImage: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 100,
    marginLeft: 100,
  },
  viewForm: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 500,
  },
}));

export default useStyles;
