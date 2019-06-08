import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { WidgetType } from '../../../../backend/src/models/interfaces';
import { getIcon, createError } from './Widgets/utils';
import { intlShape, injectIntl } from 'react-intl';
import ToolBar, { ToolbarItem } from './../Common/Toolbar';

const styles: StyleRulesCallback = (theme: Theme) => ({
});

export const WidgetTypeShape = PropTypes.oneOf(['text', 'run-video', 'hint']);

export interface WidgetBarProps extends WithStyles<typeof styles> {
    intl: any;
    selectedWidget: WidgetType;
    onWidgetClick: (e: { origin: WidgetBar, type: WidgetType }) => void;
}

class WidgetBar extends React.Component<WidgetBarProps> {
    static propTypes = {
        intl: intlShape,
        selectedWidget: WidgetTypeShape,
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

    render() {
        const { selectedWidget } = this.props;
        const widgets = (['text', 'run-video', 'hint'] as WidgetType[]).map(item => ({
            id: item,
            icon: getIcon(item),
            isSelected: item === selectedWidget,
            title: this.getDescription(item),
        }) as ToolbarItem);

        return <ToolBar
            items={widgets}
            onItemClick={(e) => this.props.onWidgetClick({ origin: this, type: e.item.id as WidgetType })}
        />;
    }
}

export default withStyles(styles)(injectIntl(WidgetBar));