import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core'

export const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button)

export const TitleTypography = withStyles({
    root: {
        color: '#616161'
    }
})(Typography)

export const CaptionTypoGraphy = withStyles({
    root: {
        color: '##424242'
    }
})(Typography)
