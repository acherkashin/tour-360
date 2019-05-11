import { defineMessages } from 'react-intl';

// const en = defineMessages({
//  componentNameStringName: {
//      id: 'component-name.string-name',
//      defaultMessage: 'StringName',
//  }
// });

const en = defineMessages({
    yes: {
        id: 'common.yes',
        defaultMessage: 'Yes',
    },
    no: {
        id: 'common.no',
        defaultMessage: 'No',
    },
    delete: {
        id: 'common.delete',
        defaultMessage: 'Delete',
    },
    edit: {
        id: 'common.edit',
        defaultMessage: 'Edit',
    },
    view: {
        id: 'common.view',
        defaultMessage: 'View',
    },
    open: {
        id: 'common.open',
        defaultMessage: 'Open',
    },
    close: {
        id: 'common.close',
        defaultMessage: 'Close',
    },
    preview: {
        id: 'common.preview',
        defaultMessage: 'Preview'
    },
    save: {
        id: 'common.save',
        defaultMessage: 'Save',
    },
    doNotSave: {
        id: 'common.doNotSave',
        defaultMessage: "Don't save",
    },
    cancel: {
        id: 'common.cancel',
        defaultMessage: 'Cancel',
    },
    create: {
        id: 'common.create',
        defaultMessage: 'Create',
    },
    selectFile: {
        id: 'common.select-file',
        defaultMessage: 'Select File',
    },
    upload: {
        id: 'common.upload',
        defaultMessage: 'Upload',
    },
    width: {
        id: 'common.width',
        defaultMessage: 'Width',
    },
    height: {
        id: 'common.height',
        defaultMessage: 'Height',
    },
    latitude: {
        id: 'common.latitude',
        defaultMessage: 'Latitude',
    },
    longitude: {
        id: 'common.longitude',
        defaultMessage: 'Longitude',
    },
    connections: {
        id: 'common.connections',
        defaultMessage: 'Connections',
    },
    noConnections: {
        id: 'common.no-connections',
        defaultMessage: 'No connections',
    },
    here: {
        id: 'common.here',
        defaultMessage: 'here',
    },
    email: {
        id: 'common.email',
        defaultMessage: 'Email',
    },
    firstName: {
        id: 'common.first-name',
        defaultMessage: 'First name',
    },
    lastName: {
        id: 'common.last-name',
        defaultMessage: 'Last name',
    },
    password: {
        id: 'common.password',
        defaultMessage: 'Password',
    },
    confirmationPassword: {
        id: 'common.confirmation-password',
        defaultMessage: 'Repeat password',
    },
    language: {
        id: 'common.language',
        defaultMessage: 'Language',
    },
    fillOut: {
        id: 'common.fillOut',
        defaultMessage: 'please fill out this field',
    },
    widgets: {
        id: 'common.widgets',
        defaultMessage: 'Widgets',
    },
    noWidgets: {
        id: 'common.no-widgets',
        defaultMessage: 'No widgets',
    },

    headerTitle: {
        id: 'header.title',
        defaultMessage: 'Your virtual tours',
    },
    headerMyAccount: {
        id: 'header.my-account',
        defaultMessage: 'My account',
    },
    headerSignOut: {
        id: 'header.sign-out',
        defaultMessage: 'Sign out',
    },

    createTourDialogTitle: {
        id: 'create-tour-dialog.title',
        defaultMessage: 'Create Virtual Tour'
    },
    createTourDialogTourName: {
        id: 'create-tour-dialog.tour-name',
        defaultMessage: 'Tour Name',
    },
    createTourDialogMapType: {
        id: 'create-tour-dialog.title',
        defaultMessage: 'Map Type',
    },

    toursPageTourMap: {
        id: 'tours-page.tour-map',
        defaultMessage: 'Tour Map',
    },
    toursPageEarth: {
        id: 'tours-page.earth',
        defaultMessage: 'Earth',
    },
    toursPageImage: {
        id: 'tours-page.image',
        defaultMessage: 'Image',
    },

    placeDesignerSaveDialogTitle: {
        id: 'place-designer.save-dialog-title',
        defaultMessage: 'Save Place',
    },
    placeDesignerConfirmMessage: {
        id: 'place-designer.confirm-message',
        defaultMessage: 'You are about to close the designer. Do you want to save your changes?',
    },
    placeDesignerUploadPanoTitle: {
        id: 'place-designer.upload-pano-title',
        defaultMessage: 'Upload Pano',
    },
    placeDesignerUploadPanoPrompt: {
        id: 'place-designer.upload-pano-prompt',
        defaultMessage: 'Upload pano for your place',
    },

    toursPageUploadCoverDialogTitle: {
        id: 'tours-page.upload-cover-dialog-title',
        defaultMessage: 'Upload new photo',
    },
    toursPageUploadCoverDialogPrompt: {
        id: 'tours-page.upload-cover-dialog-prompt',
        defaultMessage: 'Upload cover of your virtual tour'
    },

    noPlacePlaceholderFirstPart: {
        id: 'no-place-placeholder.first-part',
        defaultMessage: 'This place doesn\'t have attached image. Click',
    },
    noPlacePlaceholderSecondPart: {
        id: 'no-place-placeholder.second-part',
        defaultMessage: 'to upload one.',
    },

    editConnectionPanelStartPlacePosition: {
        id: 'edit-connection-panel.start-place-position',
        defaultMessage: 'Start Place Position',
    },
    editConnectionPanelEndPlacePosition: {
        id: 'edit-connection-panel.end-place-position',
        defaultMessage: 'End Place Position',
    },

    editPlacePanelPlaceName: {
        id: 'edit-place-panel.place-name',
        defaultMessage: 'Place name',
    },
    editPlacePanelChangePano: {
        id: 'edit-place-panel.change-pano',
        defaultMessage: 'Change Image 360',
    },
    editPlacePanelEditDescription: {
        id: 'edit-place-panel.edit-description',
        defaultMessage: 'Edit description',
    },

    editTourPanelTourName: {
        id: 'edit-tour-panel.tour-name',
        defaultMessage: 'Tour name',
    },
    editTourPanelChangeMapImage: {
        id: 'edit-tour-panel.change-map-image',
        defaultMessage: 'Change Map Image',
    },
    editTourPanelStartPlace: {
        id: 'edit-tour-panel.start-place',
        defaultMessage: 'Start place',
    },
    editTourPanelIsPublic: {
        id: 'edit-tour-panel.is-public-tour',
        defaultMessage: 'Is public tour',
    },
    editTourPanelIsPublicDescription: {
        id: 'edit-tour-panel.is-public-tour-description',
        defaultMessage: 'Determines can unauthorized users see this tour',
    },
    
    soundEditorChangeSound: {
        id: 'sound-editor.change-sound',
        defaultMessage: 'Change sound',
    },
    soundEditorToursSound: {
        id: 'sound-editor.tours-sound',
        defaultMessage: 'Tour\'s sound',
    },

    tourDesignerMapTypeError: {
        id: 'tour-designer.map-type-error',
        defaultMessage: 'Map type is not defined',
    },
    tourDesignerUploadNewMap: {
        id: 'tour-designer.upload-new-map',
        defaultMessage: 'Upload new map',
    },
    tourDesignerUploadNewMapPrompt: {
        id: 'tour-designer.upload-new-map-prompt',
        defaultMessage: 'Upload map of your virtual tour. E.g.: floor plan, street plan...',
    },
    tourDesignerSaveTour: {
        id: 'tour-designer.save-tour',
        defaultMessage: 'Save Virtual Tour',
    },
    tourDesignerSaveTourContentText: {
        id: 'tour-designer.save-tour-content-text',
        defaultMessage: 'You are about to close the designer. Do you want to save your changes?',
    },
    tourDesignerDeletePlace: {
        id: 'tour-designer.delete-place',
        defaultMessage: 'Delete Place',
    },
    tourDesignerDeletePlaceContentText: {
        id: 'tour-designer.delete-place-content-text',
        defaultMessage: 'Are you sure you want to delete this place?',
    },
    tourDesignerPreviewPlace: {
        id: 'tour-designer.preview-place',
        defaultMessage: 'Preview Place',
    },
    tourDesignerEditPlaceDescription: {
        id: 'tour-designer.edit-place-description',
        defaultMessage: 'Edit Place Description',
    },
    tourDesignerNoImageMapPlaceholderFirstPart: {
        id: 'tour-designer.no-image-map-placeholder-first-part',
        defaultMessage: 'Image for map is not selected. Click',
    },
    tourDesignerNoImageMapPlaceholderSecondPart: {
        id: 'tour-designer.no-image-map-placeholder-second-part',
        defaultMessage: 'to select one',
    },

    editImageChangeImage: {
        id: 'edit-image.change-image',
        defaultMessage: 'Change Image',
    },

    noToursPlaceholderFirstPart: {
        id: 'no-tours-placeholder.first-part',
        defaultMessage: 'You don\'t have any tours yet. Click',
    },
    noToursPlaceholderSecondPart: {
        id: 'no-tours-placeholder.second-part',
        defaultMessage: 'to add new one.',
    },

    placeListTitle: {
        id: 'place-list.title',
        defaultMessage: 'Places',
    },
    placeListNoPlaces: {
        id: 'place-list.no-places',
        defaultMessage: 'No places',
    },

    previewImage360PreviewPlace: {
        id: 'preview-image-360.preview-place',
        defaultMessage: 'Preview place',
    },

    profilePageTitle: {
        id: 'profile-page.title',
        defaultMessage: 'Profile',
    },
    profilePageToTours: {
        id: 'profile-page.to-tours',
        defaultMessage: 'To tours',
    },

    signInPageInvalidData: {
        id: 'sign-in-page.invalid-data',
        defaultMessage: 'Invalid data',
    },
    signInPageToRegister: {
        id: 'sign-in-page.to-register',
        defaultMessage: 'To register',
    },
    signInPageTitle: {
        id: 'sign-in-page.title',
        defaultMessage: 'Login',
    },
    signInPageButtonTitle: {
        id: 'sign-in-page.button-title',
        defaultMessage: 'Login',
    },

    signUpPageTitle: {
        id: 'sign-in-page.title',
        defaultMessage: 'Registration',
    },
    signUpPageButtonTitle: {
        id: 'sign-in-page.button-title',
        defaultMessage: 'Register',
    },
    signUpPageToLogin: {
        id: 'sign-in-page.to-login',
        defaultMessage: 'To Login',
    },

    mapEditModeDragMap: {
        id: 'map-edit-mode.drag-map',
        defaultMessage: 'DRAG MAP',
    },
    mapEditModeAddPlace: {
        id: 'map-edit-mode.add-place',
        defaultMessage: 'ADD PLACE',
    },
    mapEditModeRemovePlace: {
        id: 'map-edit-mode.remove-place',
        defaultMessage: 'REMOVE PLACE',
    },
    mapEditModeAddConnection: {
        id: 'map-edit-mode.add-connection',
        defaultMessage: 'ADD CONNECTION',
    },
});

export default en;
