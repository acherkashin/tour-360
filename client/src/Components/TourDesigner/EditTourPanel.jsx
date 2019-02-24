import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
        this._handleChangeImageMapClick = this._handleChangeImageMapClick.bind(this);
    }

    _handleNameChanged(e) {
        this.props.onNameChanged({ origin: this, name: e.target.value });
    }

    _handleChangeImageMapClick(e) {
        this.props.onChangeImageMapClick({ origin: this });
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
            <Button fullWidth variant="text" color="primary" className={classes.selectImage} onClick={this._handleChangeImageMapClick} >
                Change Image
            </Button>
        </div>);
    }
});

EditTourPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    tour: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    onNameChanged: PropTypes.func.isRequired,
    onChangeImageMapClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditTourPanel);
