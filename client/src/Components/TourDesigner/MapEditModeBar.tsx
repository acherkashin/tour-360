import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { getIcon, createError } from './utils';
import { injectIntl } from 'react-intl';

const styles: StyleRulesCallback = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: grey[100],
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        padding: 5,
        border: `1px solid ${grey[300]}`,
    }
});

export interface MapEditModeBarItem {
    mode: MapEditMode;
}

export type MapEditMode = 'addPlace' | 'removePlace' | 'addConnection' | 'dragMap';

interface MapEditModeBarProps extends WithStyles<typeof styles> {
    intl: any;
    mapEditModes: MapEditModeBarItem[];
    onModeChanged: (e: {}) => void;
}

class MapEditModeBar extends React.Component<MapEditModeBarProps> {
    static propTypes = {
        mapEditModes: PropTypes.array.isRequired
    };

    getDescription(mode: MapEditMode) {
        const { messages, formatMessage } = this.props.intl;

        switch (mode) {
            case 'addPlace':
                return formatMessage(messages.mapEditModeBarAddPlace)
            case 'removePlace':
                return formatMessage(messages.mapEditModeBarRemovePlace)
            case 'addConnection':
                return formatMessage(messages.mapEditModeBarAddConnection)
            case 'dragMap':
                return formatMessage(messages.mapEditModeBarDragMap)
            default:
                throw createError(mode)
        }
    }

    renderItem(item: { mode: MapEditMode }) {
        return <div
            key={item.mode}
            title={this.getDescription(item.mode)}
            className={this.props.classes.item}
            onClick={(e) => this.props.onModeChanged && this.props.onModeChanged({ origin: this, mode: item.mode })}
        >
            <IconButton>{getIcon(item.mode)}</IconButton>
        </div>;
    }

    render() {
        const { classes, mapEditModes } = this.props;

        return <div className={classes.root}>
            {mapEditModes.map((widget) => this.renderItem(widget))}
        </div>;
    }
}

export default withStyles(styles)(injectIntl(MapEditModeBar));