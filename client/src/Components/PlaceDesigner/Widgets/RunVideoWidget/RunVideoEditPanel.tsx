import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { intlShape, injectIntl } from 'react-intl';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { PositionEditor } from './../../../Common';
import RunVideoShape from "./RunVideoShape";
import { RunVideoWidget } from "../../../../../../backend/src/models/interfaces";

const styles = createStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    slider: {
        padding: '16px 12px',
    },
    thumb: {
        width: 20,
        height: 20,
    }
}));

interface RunVideoEditPanelProps extends WithStyles<typeof styles> {
    //TODO: install typings for react-intl
    intl: any;
    widget: RunVideoWidget;
    onNameChanged: (e: { origin: RunVideoEditPanel, value: string }) => void;
    onVolumeChanged: (e: { origin: RunVideoEditPanel, value: number }) => void;
    onXChanged: (e: { origin: RunVideoEditPanel, value: number }) => void;
    onYChanged: (e: { origin: RunVideoEditPanel, value: number }) => void;
}

class RunVideoEditPanel extends React.Component<RunVideoEditPanelProps> {
    constructor(props: RunVideoEditPanelProps) {
        super(props);
    }

    static propTypes = {
        widget: RunVideoShape,
        intl: intlShape,
        onNameChanged: PropTypes.func.isRequired,
        onVolumeChanged: PropTypes.func.isRequired,
        onXChanged: PropTypes.func.isRequired,
        onYChanged: PropTypes.func.isRequired,
    };

    render() {
        const classes: any = this.props.classes;
        const { widget } = this.props;
        const { messages, formatMessage } = this.props.intl;
        const volume = widget.volume * 100;

        return <div className={classes.root}>
            <PositionEditor
                x={widget.x}
                y={widget.y}
                onXChanged={(e) => {
                    this.props.onXChanged({
                        origin: this,
                        value: e.value,
                    });
                }}
                onYChanged={(e) => {
                    this.props.onYChanged({
                        origin: this,
                        value: e.value,
                    });
                }}
            />
            <div style={{ overflow: 'none' }}>
                <Typography>{formatMessage(messages.volume)}</Typography>
                <Slider
                    classes={{ container: classes.slider, thumb: classes.thumb }}
                    value={volume}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(e, value) => {
                        this.props.onVolumeChanged({
                            origin: this,
                            value: value / 100,
                        });
                    }}
                />
                <Typography variant="caption" align="right">{volume}</Typography>
            </div>
        </div>
    }
}

export default withStyles(styles)(injectIntl(observer((RunVideoEditPanel))));
