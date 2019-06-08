import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { IconButton, Toolbar } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { getIcon, createError } from './utils';
import { injectIntl } from 'react-intl';

import ToolBar, { ToolbarItem } from './../Common/Toolbar';

const styles: StyleRulesCallback = (theme: Theme) => ({
});

export interface MapEditModeBarItem {
    mode: MapEditMode;
}

export type MapEditMode = 'addPlace' | 'removePlace' | 'addConnection' | 'dragMap';

interface MapEditModeBarProps extends WithStyles<typeof styles> {
    intl: any;
    selectedMode: MapEditMode;
    onModeChanged: (e: { origin: MapEditModeBar, mode: MapEditMode }) => void;
}

const modes: MapEditMode[] = ['dragMap', 'addPlace', 'removePlace', 'addConnection'];

class MapEditModeBar extends React.Component<MapEditModeBarProps> {
    static propTypes = {
        selectedMode: PropTypes.oneOf(modes).isRequired,
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

    render() {
        const items = modes.map(item => ({
            id: item,
            title: this.getDescription(item),
            icon: getIcon(item),
            isSelected: item === this.props.selectedMode,
        } as ToolbarItem));

        return <ToolBar
            items={items}
            onItemClick={(e) => this.props.onModeChanged({ origin: this, mode: e.item.id as MapEditMode })}
        />;
    }
}

export default withStyles(styles)(injectIntl(MapEditModeBar));