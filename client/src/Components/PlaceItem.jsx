import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, IconButton } from '@material-ui/core';
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';

const styles = theme => ({
});

class PlaceItem extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
        this._handleViewClick = this._handleViewClick.bind(this);
        this._handleEditClick = this._handleEditClick.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
    }

    _handleClick(e) {
        e.stopPropagation();
        this.props.onClick && this.props.onClick({ origin: this, place: this.props.place });
    }

    _handleViewClick(e) {
        e.stopPropagation();
        this.props.onViewClick && this.props.onViewClick({ origin: this, place: this.props.place });
    }

    _handleEditClick(e) {
        e.stopPropagation();
        this.props.onEditClick && this.props.onEditClick({ origin: this, place: this.props.place });
    }

    _handleDeleteClick(e) {
        e.stopPropagation();
        this.props.onDeleteClick && this.props.onDeleteClick({ origin: this, place: this.props.place });
    }

    render() {
        const { place, canDelete, canClick } = this.props;

        return <ListItem
            button={canClick}
            onClick={this._handleClick}
        >
            <IconButton onClick={this._handleViewClick}>
                <VisibilityIcon />
            </IconButton>
            <ListItemText primary={place.name} />
            <IconButton onClick={this._handleEditClick}>
                <EditIcon />
            </IconButton>
            {canDelete && <IconButton onClick={this._handleDeleteClick}>
                <DeleteIcon />
            </IconButton>}
        </ListItem>;
    }
}

PlaceItem.propTypes = {
    classes: PropTypes.object.isRequired,
    place: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    canDelete: PropTypes.bool.isRequired,
    canClick: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onViewClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func,
};

export default withStyles(styles)(PlaceItem);
