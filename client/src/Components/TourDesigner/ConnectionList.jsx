import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ConnectionItem from './ConnectionItem';
import { List, ListSubheader, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class ConnectionList extends React.Component {
    render() {
        const { classes, connections, onClick, onViewClick, onRemoveClick, onEditClick } = this.props;
        const hasConnections = connections && connections.length > 0;
        return (
            <List className={classes.root} subheader={<ListSubheader>Connections</ListSubheader>} >
                {hasConnections && (connections || []).map(connection => <ConnectionItem
                    key={connection.id}
                    connection={connection}
                    onClick={onClick}
                    onViewClick={onViewClick}
                    onRemoveClick={onRemoveClick}
                    onEditClick={onEditClick}
                />)}
                {!hasConnections && <Typography align="center" variant="caption" color="textPrimary">No connecions</Typography>}
            </List>
        );
    }
}

export default withStyles(styles)(ConnectionList);

ConnectionList.propTypes = {
    classes: PropTypes.object.isRequired,
    connections: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    })).isRequired,
    onClick: PropTypes.func.isRequired,
    onViewClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
};
