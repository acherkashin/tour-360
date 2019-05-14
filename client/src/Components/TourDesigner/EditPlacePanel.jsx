import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ConnectionList from './ConnectionList';
import { EditImage } from './../';
import SoundEditor from './SoundEditor';
import { WidgetList, IconEditor } from './../Common';
import { intlShape, injectIntl } from 'react-intl';

const styles = theme => ({
    root: {
        flex: 1,
        padding: theme.spacing.unit * 2,
    },
    panelItem: {
        marginTop: theme.spacing.unit,
    },
    markerEditor: {
        marginTop: theme.spacing.unit,
    }
});

const EditPlacePanel = observer(class EditPlacePanel extends React.Component {
    constructor(props) {
        super(props);
        this._handleNameChanged = this._handleNameChanged.bind(this);
        this._handleSoundChanged = this._handleSoundChanged.bind(this);
        this._handleSoundRemoved = this._handleSoundRemoved.bind(this);
        this._handleChangeImage360Click = this._handleChangeImage360Click.bind(this);
        this._handleViewImage360Click = this._handleViewImage360Click.bind(this);
        this._handlePreviewClick = this._handlePreviewClick.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._handleConnectionClick = this._handleConnectionClick.bind(this);
        this._handleViewConnectionClick = this._handleViewConnectionClick.bind(this);
        this._handleRemoveConnectionClick = this._handleRemoveConnectionClick.bind(this);
        this._handleEditConnectionClick = this._handleEditConnectionClick.bind(this);
        this._handleDescriptionChanged = this._handleDescriptionChanged.bind(this);
        this._handleWidgetClick = this._handleWidgetClick.bind(this);
        this._handleRemoveWidgetClick = this._handleRemoveWidgetClick.bind(this);
    }

    get _canDelete() {
        return this.props.onDeleteClick != null;
    }

    _handleNameChanged(e) {
        this.props.onNameChanged({ origin: this, name: e.target.value });
    }

    _handleSoundChanged(e) {
        this.props.onSoundChanged({ origin: this, place: this.props.place, file: e.file });
    }

    _handleSoundRemoved(e) {
        this.props.onSoundRemoved({ origin: this, place: this.props.place });
    }

    _handleChangeImage360Click(e) {
        this.props.onChangeImage360Click({ origin: this, place: this.props.place });
    }

    _handleViewImage360Click(e) {
        this.props.onViewImage360Click({ origin: this, place: this.props.place });
    }

    _handlePreviewClick(e) {
        this.props.onPreviewClick({ origin: this, place: this.props.place });
    }

    _handleDeleteClick(e) {
        this.props.onDeleteClick && this.props.onDeleteClick({ origin: this, place: this.props.place });
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

    _handleDescriptionChanged(e) {
        this.props.onDescriptionClick({ origin: this });
    }

    _handleWidgetClick(e) {
        this.props.onWidgetClick && this.props.onWidgetClick({ origin: this, widget: e.widget });
    }

    _handleRemoveWidgetClick(e) {
        this.props.onRemoveWidgetClick({ origin: this, widget: e.widget });
    }

    render() {
        const { classes, place, showConnections, showWidgets } = this.props;
        const { messages, formatMessage } = this.props.intl;

        return <div className={classes.root}>
            <TextField
                label={formatMessage(messages.editPlacePanelPlaceName)}
                value={place.name}
                onChange={this._handleNameChanged}
                margin="normal"
                fullWidth
                autoFocus
            />
            <EditImage
                name={place.name}
                hasImage={place.hasImage}
                imageUrl={place.mapImage360Url}
                onImageChangeClick={this._handleChangeImage360Click}
            />
            <IconEditor
                className={classes.markerEditor}
                onEditClick={(e) => console.log(e)}
                onClearClick={(e) => console.log(e)}
            />
            {showConnections && <ConnectionList
                className={classes.panelItem}
                connections={place.connections}
                onClick={this._handleConnectionClick}
                onRemoveClick={this._handleRemoveConnectionClick}
                onViewClick={this._handleViewConnectionClick}
                onEditClick={this._handleEditConnectionClick}
            />}
            <SoundEditor
                soundUrl={place.soundUrl}
                classNames={{
                    changeSound: classes.panelItem,
                    editor: classes.panelItem
                }}
                onSoundChanged={this._handleSoundChanged}
                onSoundRemoved={this._handleSoundRemoved}
            />
            {showWidgets && <WidgetList
                widgets={place.widgets}
                onClick={this._handleWidgetClick}
                onRemoveClick={this._handleRemoveWidgetClick}
            />}
            <Button fullWidth variant="text" color="primary" className={classes.selectImage} onClick={this._handleChangeImage360Click} >
                {formatMessage(messages.editPlacePanelChangePano)}
            </Button>
            <Button fullWidth variant="text" color="primary" onClick={this._handleViewImage360Click}>
                {formatMessage(messages.open)}
            </Button>
            <Button fullWidth variant="text" color="primary" onClick={this._handlePreviewClick}>
                {formatMessage(messages.preview)}
            </Button>
            {this._canDelete && <Button fullWidth variant="text" color="primary" onClick={this._handleDeleteClick}>
                {formatMessage(messages.delete)}
            </Button>}
            <Button fullWidth variant="text" color="primary" onClick={this._handleDescriptionChanged}>
                {formatMessage(messages.editPlacePanelEditDescription)}
            </Button>
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
    onSoundChanged: PropTypes.func.isRequired,
    onSoundRemoved: PropTypes.func.isRequired,
    onViewImage360Click: PropTypes.func.isRequired,
    onPreviewClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func,
    onDescriptionClick: PropTypes.func.isRequired,

    showConnections: PropTypes.bool.isRequired,
    onConnectionClick: PropTypes.func,
    onViewConnectionClick: PropTypes.func,
    onRemoveConnectionClick: PropTypes.func,
    onEditConnectionClick: PropTypes.func,

    showWidgets: PropTypes.bool.isRequired,
    onWidgetClick: PropTypes.func,
    onRemoveWidgetClick: PropTypes.func,

    intl: intlShape.isRequired,
}

export default withStyles(styles)(injectIntl(EditPlacePanel));
