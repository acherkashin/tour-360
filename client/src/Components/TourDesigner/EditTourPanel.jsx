import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { observer } from 'mobx-react';

const styles = theme => ({
    root: {
        flexBasis: 400,
        backgroundColor: grey[100],
        borderLeft: `1px solid ${grey[300]}`,
        padding: theme.spacing.unit * 2,
    }
});

const EditTourPanel = observer(class EditTourPanel extends React.Component {
    constructor(props) {
        super(props);

        this._handleNameChanged = this._handleNameChanged.bind(this);
    }

    _handleNameChanged(e) {
        this.props.onNameChanged({ origin: this, name: e.target.value });
    }

    render() {
        const { classes, tour } = this.props;

        return (<div className={classes.root}>
            <TextField
                label="Tour Name"
                value={tour.name}
                onChange={this._handleNameChanged}
                margin="normal"
                fullWidth={true}
                autoFocus
            />
        </div>);
    }
});

EditTourPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    tour: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    onNameChanged: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditTourPanel);
