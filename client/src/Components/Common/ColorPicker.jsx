import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ClickAwayListener,
} from '@material-ui/core';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        position: 'relative',
    },
    colorPickerLayer: {
        position: 'absolute',
        top: '100%',
        right: 0,
        zIndex: 1,
    },
});

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTextColorPickerActive: false,
        };

        this._handleTextColorButtonClick = this._handleTextColorButtonClick.bind(this);
        this._handleChangeTextColor = this._handleChangeTextColor.bind(this);
    }

    _handleChangeTextColor(color) {
        this.props.onChanged({ origin: this, color: color.hex });
    }

    _handleTextColorButtonClick() {
        const { isTextColorPickerActive } = this.state;
        this.setState({ isTextColorPickerActive: !isTextColorPickerActive })
    }

    render() {
        const { isTextColorPickerActive } = this.state;
        const { classes, color, label } = this.props;

        return <div className={classes.root}>
            <Button
                style={{ backgroundColor: color }}
                color="inherit"
                fullWidth
                onClick={this._handleTextColorButtonClick}
            >
                {label}
            </Button>
            {isTextColorPickerActive &&
                <ClickAwayListener onClickAway={() => this.setState({ isTextColorPickerActive: false })}>
                    <ChromePicker
                        color={color}
                        onChange={this._handleChangeTextColor}
                        className={classes.colorPickerLayer}
                        disableAlpha
                    />
                </ClickAwayListener>
            }
        </div>;
    }
}

ColorPicker.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChanged: PropTypes.func.isRequired,
}

export default withStyles(styles)(ColorPicker);