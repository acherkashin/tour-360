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
        this.props.onStartPlacePositionChanged({
            origin: this,
            value: parseInt(e.target.value) || 0,
        })
    }

    _handleEndPlacePositionChanged(e) {
        this.props.onEndPlacePositionChanged({
            origin: this,
            value: parseInt(e.target.value) || 0,
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
                inputProps={{
                    min: 0,
                    max: 359
                }}
                autoFocus
            />
            <TextField
                label="End Place Position"
                value={connection.endPlacePosition}
                onChange={this._handleEndPlacePositionChanged}
                margin="normal"
                fullWidth={true}
                type={'number'}
                inputProps={{
                    min: 0,
                    max: 359
                }}
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
