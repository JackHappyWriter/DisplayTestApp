import { makeStyles } from '@mui/styles';
 
const styles = (theme) => ({
    
    container: {
        flexDirection: 'column !important',
        display: 'flex',
    },

    control: {
        width: '100%',
        height: '40px',
        '&.MuiFormControl-root': {
            display: 'flex',
        },
    },

    label: {
        '&.MuiFormLabel-root': {
            display: 'flex',
            fontSize: '12px',
            lineHeight: '20px',
            height: '28px',
            fontWeight: 'bold',
            alignItems:' center',
            margin: '0px',
            color: '#0C0644',
            fontFamily: 'GothamRounded-Book',
            marginBottom: '2px',
            whiteSpace: 'wrap',
            

            [theme.breakpoints.down('xs')]: {
                height: 'auto',
                marginBottom: '4px',
            },
         },
    },

    select: ({ error }) => {

        function getBorderColor () {
            if (error) {
                return '#B3261E';
            }
            return '#DEDDDF';
        }

        const style = {
            height: '40px',
            fontSize: '12px',
            fontFamily: 'GothamRounded-Book',
    
            '&.MuiInputBase-root': {
                '&:hover fieldset': { 
                    borderColor: '#536DFE', 
                },
    
                '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#536DFE',
                        
                    },  
                },
    
                '&.Mui-error': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#B3261E',
                    }
                },
            },
    
            '& fieldset': {
                borderRadius: '8px',
                borderColor: getBorderColor(),
                height: '40px',
                '& legend': {
                    display: 'none !important',
                },
            },
    
            '& .MuiSelect-select': {
                height: '24px !important',
                paddingBottom: '0px',
                paddingTop: '0px',
                marginTop: '0px',
                textAlign: 'middle',
                fontSize: '12px',
                fontFamily: 'GothamRounded-Book',
                color: !error ? '#0C0644' : '#B3261E99' ,
            },
    
            '& .MuiSvgIcon-root': {
                top: 'calc(50% - 14px)',
                fill: '#1D1B20',
            },
        };

        return style;
    }, 

    helperError: ({helperText}) => {
        function getDisplay () {
            if (!helperText) {
                return {
                    display: 'none',
                };
            }
            return {
                display: 'flex',
            };
        };

        const style = {
            '&.MuiFormHelperText-root': {
                ...getDisplay(),
                color: '#B3261E',
                fontFamily: 'GothamRounded-Book',
                fontWeight: 'bold',
                fontSize: '10px',
                height: '22px',
            },
        };

        return style;
    },

    menuItem:{
        height: '40px',

        '&.MuiMenuItem-root': {
            fontSize: '12px',
            fontFamily: 'GothamRounded',
        },
    },

});

export default styles;
export const useStyles = makeStyles(styles);
