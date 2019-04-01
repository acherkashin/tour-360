import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    List,
    Button,
    ListSubheader,
    ListItem,
} from '@material-ui/core';
import { AudioPlayer } from '@blackbox-vision/mui-audio-player';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class SoundEditor extends React.Component {
    constructor(props) {
        super(props);

        this._handleSoundChanged = this._handleSoundChanged.bind(this);
        this._handleSoundRemoved = this._handleSoundRemoved.bind(this);
    }

    _handleSoundChanged(e) {
        const file = e.target.files[0];

        if (file) {
            this.props.onSoundChanged({
                file,
                origin: this,
            });
        }
    }

    _handleSoundRemoved(e) {
        this.props.onSoundRemoved({ origin: this });
    }

    render() {
        const { soundUrl, classes } = this.props;

        if (!soundUrl) {
            return <Button variant="text" component="label" color="primary" fullWidth>
                Change Sound
                <input type="file" style={{ display: "none" }} onChange={this._handleSoundChanged} />
            </Button>;
        }

        return <List
            component="nav"
            subheader={<ListSubheader component="div">Tour's sound</ListSubheader>}
            className={classes.root}
        >
            <ListItem>
                <AudioPlayer
                    src={soundUrl}
                    autoPlay={false}
                    rounded={null}
                    elevation={0}
                    showLoopIcon={false}
                    width="100%"
                />
            </ListItem>
        </List>
    }
}

SoundEditor.propTypes = {
    soundUrl: PropTypes.string,

    onSoundChanged: PropTypes.func.isRequired,
    onSoundRemoved: PropTypes.func.isRequired,
};

export default withStyles(styles)(SoundEditor);