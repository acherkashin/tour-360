import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { getIcon, createError } from './utils';
import { injectIntl } from 'react-intl';

const styles = (theme) => ({
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

class MapEditModeBar extends React.Component {
    getDescription(MapEditMode) {
        const { messages, formatMessage } = this.props.intl;

        switch (MapEditMode) {
            case 'addPlace':
                return formatMessage(messages.mapEditModeBarAddPlace)
            case 'removePlace':
                return formatMessage(messages.mapEditModeBarRemovePlace)
            case 'addConnection':
                return formatMessage(messages.mapEditModeBarAddConnection)
            case 'dragMap':
                return formatMessage(messages.mapEditModeBarDragMap)
            default: 
                throw createError(MapEditMode)
        }
    }

    renderItem(item) {
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

MapEditModeBar.propTypes = {
    mapEditModes: PropTypes.array.isRequired
};

export default withStyles(styles)(injectIntl(MapEditModeBar));