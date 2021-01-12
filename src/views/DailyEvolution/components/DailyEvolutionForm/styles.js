const { makeStyles } = require('@material-ui/styles');

const useStyles = makeStyles(() => ({
  contentForm: {
    maxWidth: '684px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useStyles;
