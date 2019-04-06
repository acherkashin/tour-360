import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, CircularProgress } from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'relative',
    },
    signInProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
});

class LoadingButton extends React.Component {
    render() {
        const { classes, style, disabled = false, onClick, isLoading = false, children } = this.props;

        return <div className={classes.root} style={style || {}}>
            <Button
                fullWidth={true}
                disabled={disabled}
                color="primary"
                onClick={onClick}
            >
                {children}
            </Button>
            {isLoading && <CircularProgress size={24} className={classes.signInProgress} />}
        </div>;
    }
}

LoadingButton.propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoadingButton);