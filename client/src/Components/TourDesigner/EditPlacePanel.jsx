import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ConnectionList from './ConnectionList';
import { EditImage } from './../';

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
        this._handleChangeImage360Click = this._handleChangeImage360Click.bind(this);
        this._handleViewImage360Click = this._handleViewImage360Click.bind(this);
        this._handleConnectionClick = this._handleConnectionClick.bind(this);
        this._handleViewConnectionClick = this._handleViewConnectionClick.bind(this);
        this._handleRemoveConnectionClick = this._handleRemoveConnectionClick.bind(this);
        this._handleEditConnectionClick = this._handleEditConnectionClick.bind(this);
    }

    _handleNameChanged(e) {
        this.props.onNameChanged({ origin: this, name: e.target.value });
    }

    _handleChangeImage360Click(e) {
        this.props.onChangeImage360Click({ origin: this, place: this.props.place });
    }

    _handleViewImage360Click(e) {
        this.props.onViewImage360Click({ origin: this, place: this.props.place });
    }

    _handleConnectionClick(e) {
        this.props.onConnectionClick({ origin: this, connection: e.connection });
    }

    _handleViewConnectionClick(e) {
        this.props.onViewConnectionClick({ origin: this, connection: e.connection });
    }

    _handleRemoveConnectionClick(e) {
        this.props.onRemoveConnectionClick({ origin: this, connection: e.connection });
    }

    _handleEditConnectionClick(e) {
        this.props.onEditConnectionClick({ origin: this, connection: e.connection });
    }

    render() {
        const { classes, place, } = this.props;

        return <div className={classes.root}>
            <TextField
                label="Place Name"
                value={place.name}
                onChange={this._handleNameChanged}
                margin="normal"
                fullWidth={true}
                autoFocus
            />
            <EditImage hasImage={place.hasImage} imageUrl={place.mapImage360Url} name={place.name} onImageChangeClick={this._handleChangeImage360Click} />
            <Button fullWidth variant="text" color="primary" className={classes.selectImage} onClick={this._handleChangeImage360Click} >
                Change Image 360
            </Button>
            <Button fullWidth variant="text" color="primary" onClick={this._handleViewImage360Click}>
                Open
            </Button>
            <ConnectionList
                connections={place.connections}
                onClick={this._handleConnectionClick}
                onRemoveClick={this._handleRemoveConnectionClick}
                onViewClick={this._handleViewConnectionClick}
                onEditClick={this._handleEditConnectionClick}
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
    onViewImage360Click: PropTypes.func.isRequired,
    onConnectionClick: PropTypes.func.isRequired,
    onViewConnectionClick: PropTypes.func.isRequired,
    onRemoveConnectionClick: PropTypes.func.isRequired,
    onEditConnectionClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditPlacePanel);
