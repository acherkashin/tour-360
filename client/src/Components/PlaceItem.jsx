import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, IconButton } from '@material-ui/core';
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
} from '@material-ui/icons';

const styles = theme => ({
});

class PlaceItem extends React.Component {
    constructor(props) {
        super(props);

        this._handleViewClick = this._handleViewClick.bind(this);
        this._handleEditClick = this._handleEditClick.bind(this);
    }

    _handleViewClick() {
        this.props.onViewClick && this.props.onViewClick({ origin: this });
    }

    _handleEditClick() {
        this.props.onEditClick && this.props.onEditClick({ origin: this });
    }

    render() {
        const { place } = this.props;

        return <ListItem>
            <IconButton onClick={this._handleViewClick}>
                <VisibilityIcon />
            </IconButton>
            <ListItemText primary={place.name} />
            <IconButton onClick={this._handleEditClick}>
                <EditIcon />
            </IconButton>
        </ListItem>;
    }
}

PlaceItem.propTypes = {
    classes: PropTypes.object.isRequired,
    place: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onViewClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(PlaceItem);
