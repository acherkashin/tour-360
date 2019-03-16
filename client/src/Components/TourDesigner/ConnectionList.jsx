import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class ConnectionList extends React.Component {
    constructor(props) {
        super(props);
    }

    _renderItem(connection) {
        const { classes } = this.props;

        return (
            <ListItem key={connection.id} alignItems="flex-start">
                {/* <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar> */}
                <ListItemText
                    primary={connection.name}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                Latitude:
                            </Typography>
                            {connection.latitude}
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                Longitude:
                            </Typography>
                            {connection.longitude}
                        </React.Fragment>
                    }
                />
            </ListItem>
        );
    }

    render() {
        const { classes, connections } = this.props;

        return (
            <List className={classes.root}>
                {(connections || []).map(connection => this._renderItem(connection))}
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
};
