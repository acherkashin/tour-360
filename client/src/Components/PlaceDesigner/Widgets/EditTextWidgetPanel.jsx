import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextWidgetShape from './TextWidgetShape';
import { HEIGHT, WIDTH } from './../utils';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
});

const TextWidgetEditPanel = observer(class TextWidgetEditPanel extends React.Component {
    constructor(props) {
        super(props);

        this._handleXChanged = this._handleXChanged.bind(this);
        this._handleYChanged = this._handleYChanged.bind(this);
        this._handleContentChanged = this._handleContentChanged.bind(this);
    }

    _handleXChanged(e) {
        this.props.onXChanged({ origin: this, x: parseInt(e.target.value) });
    }

    _handleYChanged(e) {
        this.props.onYChanged({ origin: this, y: parseInt(e.target.value) });
    }

    _handleContentChanged(e) {
        this.props.onContentChanged({ origin: this, content: e.target.value });
    }

    render() {
        const { classes, widget } = this.props;

        return <div className={classes.root}>
            <TextField
                label="Position X"
                value={widget.x}
                onChange={this._handleXChanged}
                type="number"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    max: WIDTH / 2,
                    min: - WIDTH / 2,
                    step: 25,
                }}
                fullWidth
                autoFocus
            />
            <TextField
                label="Position Y"
                value={widget.y}
                onChange={this._handleYChanged}
                type="number"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    max: HEIGHT / 2,
                    min: - HEIGHT / 2,
                    step: 25,
                }}
                fullWidth
            />
            <TextField
                lable="Content"
                value={widget.content}
                onChange={this._handleContentChanged}
                margin="normal"
                fullWidth
            />
        </div>;
    }
});

TextWidgetEditPanel.propTypes = {
    widget: TextWidgetShape,
    onXChanged: PropTypes.func.isRequired,
    onYChanged: PropTypes.func.isRequired,
    onContentChanged: PropTypes.func.isRequired,
};

export default withStyles(styles)(TextWidgetEditPanel);
