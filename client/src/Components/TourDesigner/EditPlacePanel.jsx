import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const styles = theme => ({
    root: {
        flex: 1,
        padding: theme.spacing.unit * 2,
    },
});

const EditPlacePanel = observer(class EditPlacePanel extends React.Component {
    constructor(props) {
        super(props);
        this._handleNameChanged = this._handleNameChanged.bind(this);
    }

    _handleNameChanged(e) {
        this.props.onNameChanged({ origin: this, name: e.target.value });
    }

    render() {
        const { classes, place } = this.props;

        return <div className={classes.root}>
            <TextField
                label="Place Name"
                value={place.name}
                onChange={this._handleNameChanged}
                margin="normal"
                fullWidth={true}
                autoFocus
            />
        </div>;
    }
});

EditPlacePanel.propTypes = {
    classes: PropTypes.object.isRequired,
    place: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    onNameChanged: PropTypes.func.isRequired,
    onChangeImage360Click: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditPlacePanel);
