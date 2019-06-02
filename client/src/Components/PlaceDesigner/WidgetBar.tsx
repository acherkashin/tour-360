import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { WidgetType } from '../../../../backend/src/models/interfaces';
import { getIcon, createError } from './Widgets/utils';
import { intlShape, injectIntl } from 'react-intl';

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

export interface WidgetItem {
    type: WidgetType;
}

export interface WidgetBarProps extends WithStyles<typeof styles> {
    intl: any;
    widgets: WidgetItem[];
    onWidgetClick: (e: { origin: WidgetBar, type: WidgetType }) => void;
}

class WidgetBar extends React.Component<WidgetBarProps> {
    static propTypes = {
        intl: intlShape,
        widgets: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
        })).isRequired,
        onWidgetClick: PropTypes.func.isRequired,
    };

    getDescription(widgetType: WidgetType) {
        const { messages, formatMessage } = this.props.intl;

        if (widgetType === 'text') {
            return formatMessage(messages.widgetBarText);
        } else if (widgetType === 'run-video') {
            return formatMessage(messages.widgetBarRunVideo);
        } else if (widgetType === 'hint') {
            return formatMessage(messages.widgetBarHint);
        }

        throw createError(widgetType);
    }

    renderItem(item: WidgetItem) {
        return <div
            key={item.type}
            title={this.getDescription(item.type)}
            className={this.props.classes.item}
            onClick={(e) => this.props.onWidgetClick && this.props.onWidgetClick({ origin: this, type: item.type })}
        >
            <IconButton>{getIcon(item.type)}</IconButton>
        </div>;
    }

    render() {
        const { classes, widgets } = this.props;

        return <div className={classes.root}>
            {widgets.map((widget) => this.renderItem(widget))}
        </div>;
    }
}

export default withStyles(styles)(injectIntl(WidgetBar));