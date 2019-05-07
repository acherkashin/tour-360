import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import {
    List,
    ListSubheader,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { WidgetItem } from './';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${grey[300]}`,
    }
});

class WidgetList extends React.Component {
    _getTitle(widget) {
        if (widget.type === 'text') {
            return widget.content;
        } else {
            throw new Error('Unknown widget type');
        }
    }

    render() {
        const { widgets, classes, onClick, onRemoveClick } = this.props;
        const { messages, formatMessage } = this.props.intl;
        const hasWidgets = widgets && widgets.length > 0;

        return <List className={classes.root} subheader={<ListSubheader>{formatMessage(messages.widgets)}</ListSubheader>}>
            {hasWidgets && (widgets || []).map(widget =>
                <WidgetItem
                    key={widget.id}
                    title={this._getTitle(widget)}
                    widget={widget}
                    onClick={onClick}
                    onRemoveClick={onRemoveClick}
                />
            )}
            {!hasWidgets && <Typography align="center" variant="caption" color="textPrimary">{formatMessage(messages.noWidgets)}</Typography>}
        </List>;
    }
}

WidgetList.propTypes = {
    widgets: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(WidgetList));
