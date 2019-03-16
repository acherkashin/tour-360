import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemIcon, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    coordinateItem: {
        color: grey[700],
        lineHeight: 1,
    },
});

class ConnectionItem extends React.Component {
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
        this._handleViewClick = this._handleViewClick.bind(this);
        this._handleRemoveClick = this._handleRemoveClick.bind(this);
    }

    _handleClick(e) {
        e.stopPropagation();
        this.props.onClick({ origin: this, connection: this.props.connection });
    }

    _handleViewClick(e) {
        e.stopPropagation();        
        this.props.onViewClick({ origin: this, connection: this.props.connection });
    }

    _handleRemoveClick(e) {
        e.stopPropagation();
        this.props.onRemoveClick({ origin: this, connection: this.props.connection });
    }

    render() {
        const { classes, connection } = this.props;

        return (
            <ListItem
                button
                alignItems="flex-start"
                onClick={this._handleClick}>
                {/* <ListItemIcon> */}
                    <IconButton onClick={this._handleViewClick}>
                        <VisibilityIcon />
                    </IconButton>
                {/* </ListItemIcon> */}
                <ListItemText
                    primary={connection.name}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" variant="caption" className={classes.coordinateItem}>
                                Latitude: {connection.latitude}
                            </Typography>
                            <Typography component="span" variant="caption" className={classes.coordinateItem}>
                                Longitude: {connection.longitude}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <IconButton onClick={this._handleRemoveClick}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        );
    }
}

export default withStyles(styles)(ConnectionItem);

ConnectionItem.propTypes = {
    classes: PropTypes.object.isRequired,
    connection: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onViewClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
};
