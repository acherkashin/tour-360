import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getScreenCoordinates } from './utils';

const styles = theme => ({
    root: {
        position: 'absolute',
        cursor: 'pointer',
    }
});

class TextWidget extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(e) {
        this.props.onClick({ origin: this, widget: this.props.widget })
    }

    render() {
        const { classes, widget: { x, y, content } } = this.props;

        const { left, top } = getScreenCoordinates(x, y);

        return <span
            className={classes.root}
            onClick={this._handleClick}
            style={{
                left,
                top,
            }}>{content}</span>;
    }
}

TextWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    isSelected: PropTypes.bool,
    widget: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(TextWidget);