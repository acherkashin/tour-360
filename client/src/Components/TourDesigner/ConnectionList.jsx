import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import ConnectionItem from './ConnectionItem';
import { List, ListSubheader, ListItem, ListItemText, ListItemIcon, IconButton } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class ConnectionList extends React.Component {
    render() {
        const { classes, connections, onClick, onViewClick, onRemoveClick } = this.props;

        return (
            <List className={classes.root} subheader={<ListSubheader>Connections</ListSubheader>} >
                {(connections || []).map(connection => <ConnectionItem
                    key={connection.id}
                    connection={connection}
                    onClick={onClick}
                    onViewClick={onViewClick}
                    onRemoveClick={onRemoveClick}
                />)}
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
};
