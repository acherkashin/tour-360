import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    root: {
        flexShrink: 1,
        backgroundColor: grey[100],
        borderLeft: `1px solid ${grey[300]}`,
    }
});

class ViewTourPanel extends React.Component {
    render() {
        const { classes, isOpen, width } = this.props;
        const resultWidth = isOpen ? (width || '250px') : '0px';

        return (
            <div className={classes.root} style={{ width: resultWidth }}></div>
        );
    }
}

ViewTourPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    width: PropTypes.string,
};

export default withStyles(styles)(ViewTourPanel);