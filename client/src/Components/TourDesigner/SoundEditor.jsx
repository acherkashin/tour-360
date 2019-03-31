import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    List,
    Button,
    ListSubheader,
    ListItem,
    ListItemText,
    IconButton,
    ListItemIcon,
    ListItemAvatar,
    ListItemSecondaryAction,
} from '@material-ui/core';
import {
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    PlayCircleOutline
} from '@material-ui/icons';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});

class SoundEditor extends React.Component {
    constructor(props) {
        super(props);

        this._handleSoundChanged = this._handleSoundChanged.bind(this);
        this._handleSoundRemoved = this._handleSoundRemoved.bind(this);
    }

    _handleSoundChanged(e) {
        this.props.onSoundChanged({ origin: this });
    }

    _handleSoundRemoved(e) {
        this.props.onSoundRemoved({ origin: this });
    }

    render() {
        const { soundName, soundUrl, classes } = this.props;

        if (!soundName || !soundUrl) {
            return <Button variant="text" component="label" color="primary">
                Change Sound
                <input type="file" style={{ display: "none" }} onChange={this._handleChangeSoundClick} />
            </Button>;
        }

        return <List
            component="nav"
            subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
            className={classes.root}
        >
            <ListItem>
                <IconButton>
                    <PlayCircleOutline />
                </IconButton>
                <ListItemText primary={soundName} />
                <ListItemSecondaryAction>
                    <IconButton onClick={this._handleSoundRemoved}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    }
}

SoundEditor.propTypes = {
    soundName: PropTypes.string,
    soundUrl: PropTypes.string,

    onSoundChanged: PropTypes.func.isRequired,
    onSoundRemoved: PropTypes.func.isRequired,
};

export default withStyles(styles)(SoundEditor);