import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getScreenCoordinates } from './utils';

const styles = theme => ({
    root: {
        position: 'absolute',
    }
});

class TextWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, options: { x, y, content } } = this.props;

        const { left, top } = getScreenCoordinates(x, y);

        return <div className={classes.root} style={{
            left,
            top,
        }}>{content}</div>;
    }
}

TextWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
    }),
}

export default withStyles(styles)(TextWidget);