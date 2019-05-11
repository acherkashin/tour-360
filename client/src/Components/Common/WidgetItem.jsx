import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import {
    ListItem,
    ListItemText,
    IconButton,
    ListItemIcon,
} from '@material-ui/core';
import {
    Title as TitleIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
    }
});

class WidgetItem extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
        this._handleRemoveClick = this._handleRemoveClick.bind(this);
    }

    _handleClick() {
        this.props.onClick && this.props.onClick({ origin: this, widget: this.props.widget });
    }

    _handleRemoveClick(e) {
        e.stopPropagation();
        this.props.onRemoveClick && this.props.onRemoveClick({ origin: this, widget: this.props.widget });
    }

    render() {
        const { title } = this.props;

        return (
            <ListItem
                button
                onClick={this._handleClick}>
                <ListItemIcon>
                    <TitleIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
                <IconButton onClick={this._handleRemoveClick}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        );
    }
}

WidgetItem.propTypes = {
    title: PropTypes.string.isRequired,
    widget: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
}

export default withStyles(styles)(injectIntl(WidgetItem));
