import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { observer } from 'mobx-react';
import { UploadImageDialog } from './../Dialogs';

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

        this.state = {
            isOpenedUploadImageDialog: false,
        };

        this._handleNameChanged = this._handleNameChanged.bind(this);
        this._handleUploadClick = this._handleUploadClick.bind(this);
        this._handleFileSelected = this._handleFileSelected.bind(this);
    }

    _handleNameChanged(e) {
        this.props.onNameChanged({ origin: this, name: e.target.value });
    }

    _handleUploadClick(e) {
        this.setState({ isOpenedUploadImageDialog: true });
    }

    _handleFileSelected(e) {
        this.props.onMapImageUploadClick({ origin: this, file: e.file, width: e.width, height: e.height })
            .then(() => {
                this.setState({ isOpenedUploadImageDialog: false });
            })
    }

    render() {
        const { classes, tour } = this.props;
        const { isOpenedUploadImageDialog } = this.state;

        return (<div className={classes.root}>
            <TextField
                label="Tour Name"
                value={tour.name}
                onChange={this._handleNameChanged}
                margin="normal"
                fullWidth={true}
                autoFocus
            />
            <Button fullWidth variant="text" color="primary" className={classes.selectImage} onClick={this._handleUploadClick} >
                Change Image
            </Button>

            <UploadImageDialog
                title="Upload new map"
                prompt="Upload map of your virtual tour. E.g.: floor plan, street plan..."
                isOpened={isOpenedUploadImageDialog}
                onFileSelected={this._handleFileSelected}
                onClose={() => this.setState({ isOpenedUploadImageDialog: false })}
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
    onMapImageUploadClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditTourPanel);
