import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = theme => ({
    root: {
        flex: 1,
        padding: theme.spacing.unit * 2,
    },
});

const EditConnectionPanel = observer(class EditConnectionPanel extends React.Component {
    constructor(props) {
        super(props);

        this._handleStartPlacePositionChanged = this._handleStartPlacePositionChanged.bind(this);
        this._handleEndPlacePositionChanged = this._handleEndPlacePositionChanged.bind(this);
    }

    _handleStartPlacePositionChanged(e) {
        console.log(e);
        this.props.onStartPlacePositionChanged({
            origin: this,
        })
    }

    _handleEndPlacePositionChanged(e) {
        console.log(e);
        this.props.onEndPlacePositionChanged({
            origin: this,
        });
    }

    render() {
        const { classes, connection } = this.props;

        return <div className={classes.root}>
            <TextField
                label="Start Place Position"
                value={connection.startPlacePosition}
                onChange={this._handleStartPlacePositionChanged}
                margin="normal"
                fullWidth={true}
                type={'number'}
                autoFocus
            />
            <TextField
                label="End Place Position"
                value={connection.endPlacePosition}
                onChange={this._handleEndPlacePositionChanged}
                margin="normal"
                fullWidth={true}
                type={'number'}
            />

        </div>;
    }
});

EditConnectionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    connection: PropTypes.shape({
        id: PropTypes.string.isRequired,
        startPlacePosition: PropTypes.number.isRequired,
        endPlacePosition: PropTypes.number.isRequired,
    }).isRequired,
    onStartPlacePositionChanged: PropTypes.func.isRequired,
    onEndPlacePositionChanged: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditConnectionPanel);
