import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { intlShape, injectIntl } from 'react-intl';
import { Add, Edit, Delete, Visibility, Map } from '@material-ui/icons';
import { observer, inject } from 'mobx-react';
import { Route } from "react-router-dom";
import { requireAuth } from '../HOC';
import { Header, Tours, ViewTourPanel, NoToursPlaceholder } from '../Components';
import { CreateTourDialog, UploadImageDialog } from '../Components/Dialogs';
import TourDesigner from '../Components/TourDesigner/TourDesigner';
import { PlaceDesigner } from '../Components/PlaceDesigner';

const styles = createStyles(theme => ({
    addTour: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    contentWrapper: {
        flexGrow: 1,
        overflow: 'hidden',
        display: 'flex',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
    },
    toursWrapper: {
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '12px',
        flexGrow: 1,
    }
}));


interface PublicToursPageProps extends WithStyles<typeof styles> {
    rootStore: any;
    intl: any;
}

interface PublicToursPageState {
    isOpenedCreateDialog: boolean;
    isOpenedUploadImageDialog: boolean;
    newTourName: string;
    newTourMapType: 1;
    mapTypes: number[];
}

class PublicToursPage extends React.Component<PublicToursPageProps, PublicToursPageState> {

}

export default withStyles(styles)(
    injectIntl(
        requireAuth(
            inject("rootStore")(observer(PublicToursPage))
        )
    )
);