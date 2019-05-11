import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { intlShape, injectIntl } from 'react-intl';
import { TextField, Button } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import TextWidgetShape from './TextWidgetShape';
import { HEIGHT, WIDTH } from '../utils';
import { ColorPicker } from '../../Common';
import { TextWidget as TextWidgetModel } from "./../../../../../backend/src/models/interfaces";

const styles = createStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
}));

interface TextWidgetEditPanelProps extends WithStyles<typeof styles> {
    widget: TextWidgetModel,
    intl: any;
    onXChanged: (event: { origin: TextWidgetEditPanel, widget: TextWidgetModel, x: number }) => void;
    onYChanged: (event: { origin: TextWidgetEditPanel, widget: TextWidgetModel, y: number }) => void;
    onContentChanged: (event: { origin: TextWidgetEditPanel, widget: TextWidgetModel, content: string }) => void;
    onTextColorChanged: (event: { origin: TextWidgetEditPanel, widget: TextWidgetModel, color: string }) => void;
    onTextBackgroundColorChanged: (event: { origin: TextWidgetEditPanel, widget: TextWidgetModel, color: string }) => void;
    onDeleteClick: (event: { origin: TextWidgetEditPanel, widget: TextWidgetModel }) => void;
}

class TextWidgetEditPanel extends React.Component<TextWidgetEditPanelProps> {
    constructor(props) {
        super(props);

        this.state = {
            isTextColorPickerActive: false,
            isTextBackgroundColorPickerActive: false,
            theme: null,
        };

        this._handleXChanged = this._handleXChanged.bind(this);
        this._handleYChanged = this._handleYChanged.bind(this);
        this._handleContentChanged = this._handleContentChanged.bind(this);
        this._handleChangeTextColor = this._handleChangeTextColor.bind(this);
        this._handleChangeTextBackgroundColor = this._handleChangeTextBackgroundColor.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
    }

    static propTypes = {
        widget: TextWidgetShape,
        onDeleteClick: PropTypes.func.isRequired,
        onXChanged: PropTypes.func.isRequired,
        onYChanged: PropTypes.func.isRequired,
        onContentChanged: PropTypes.func.isRequired,
        onTextBackgroundColorChanged: PropTypes.func.isRequired,
        onTextColorChanged: PropTypes.func.isRequired,

        intl: intlShape,
    };

    _handleXChanged(e) {
        this.props.onXChanged({
            origin: this,
            x: parseInt(e.target.value),
            widget: this.props.widget,
        });
    }

    _handleYChanged(e) {
        this.props.onYChanged({
            origin: this,
            y: parseInt(e.target.value),
            widget: this.props.widget,
        });
    }

    _handleContentChanged(e) {
        this.props.onContentChanged({
            origin: this,
            content: e.target.value,
            widget: this.props.widget,
        });
    }

    _handleChangeTextColor(e) {
        this.props.onTextColorChanged({
            origin: this,
            color: e.color,
            widget: this.props.widget,
        });
    }

    _handleChangeTextBackgroundColor(e) {
        this.props.onTextBackgroundColorChanged({
            origin: this,
            color: e.color,
            widget: this.props.widget,
        });
    }

    _handleDeleteClick(e) {
        this.props.onDeleteClick({
            origin: this,
            widget: this.props.widget,
        });
    }

    render() {
        const classes: any = this.props.classes;
        const { widget } = this.props;
        const { messages, formatMessage } = this.props.intl;

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
                label="Content"
                value={widget.content}
                onChange={this._handleContentChanged}
                margin="normal"
                fullWidth
            />
            <ColorPicker
                label="Text Color"
                onChanged={this._handleChangeTextColor}
                color={widget.color}
            />
            <ColorPicker
                label="Text Background Color"
                onChanged={this._handleChangeTextBackgroundColor}
                color={widget.backgroundColor}
            />
            <Button fullWidth variant="text" color="primary" onClick={this._handleDeleteClick}>
                {formatMessage(messages.delete)}
            </Button>
        </div>;
    }
}

export default withStyles(styles)(injectIntl(observer((TextWidgetEditPanel))));
