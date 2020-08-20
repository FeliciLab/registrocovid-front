import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4)
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
    actionsWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    fieldNumProntuario: {
        width: '362px',
        height: '48px',
        marginRight: theme.spacing(3),
    },
    buttonAddPatient: {
        width: '258px',
        height: '48px',
    },
    tableWrapper: {
        display: 'flex',
    },
    notPatients: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(10),
    },
    buttonSave: {
        width: '258px',
        height: '48px',
        marginLeft: theme.spacing(3),
    },
    patientWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableRowExamDate: {
        '&:hover':{
            cursor: 'pointer',
            backgroundColor: '#E6E6E6'
        } 
    }
}));

export default useStyles;