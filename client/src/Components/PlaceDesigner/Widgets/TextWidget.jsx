import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getScreenCoordinates } from '../utils';
import TextWidgetShape from "./TextWidgetShape";

const styles = theme => ({
    root: {
        position: 'absolute',
        cursor: 'pointer',
    },
    isSelected: {
        backgroundColor: 'rgba(255,255,255, 0.3)',
        border: '1px dashed rgba(255,0,0, 0.3)',
    },
});

const TextWidget = observer(class TextWidget extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(e) {
        e.stopPropagation();
        this.props.onClick({ origin: this, widget: this.props.widget })
    }

    render() {
        const { classes, isSelected, widget: { x, y, content } } = this.props;
        const { left, top } = getScreenCoordinates(x, y);

        const className = classNames({
            [classes.root]: true,
            [classes.isSelected]: isSelected,
        })

        return <span
            className={className}
            onClick={this._handleClick}
            style={{
                left,
                top,
            }}>{content}</span>;
    }
});

TextWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    isSelected: PropTypes.bool,
    widget: TextWidgetShape,
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(TextWidget);