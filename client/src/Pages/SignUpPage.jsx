import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {}
});

class SingUpPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return <div className={classes.root}>Sign Up Page</div>;
    }
}

SingUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SingUpPage);