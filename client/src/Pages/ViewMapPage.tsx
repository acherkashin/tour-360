import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { TourMap } from "../Components/TourDesigner";
import { InfoPanel } from "../Components";
import { requireAuth } from '../HOC';
import { RootStore } from '../Stores';
import { RouteComponentProps } from 'react-router';

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    infoPanel: {
        position: 'absolute' as 'absolute',
        top: 10,
        right: 10,
        width: '20vw',
        maxHeight: '90%',
        zIndex: 999999999,
    },
});

interface ViewMapPageProps extends WithStyles<typeof styles>, RouteComponentProps<{ tourId: string }> {
    rootStore: RootStore;
}

class ViewMapPage extends React.Component<ViewMapPageProps> {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    get store() {
        return this.props.rootStore.viewTourStore;
    }
    get tour() {
        return this.store.tour;
    }
    get selectedPlace() {
        return this.store.selectedPlace;
    }

    componentDidMount() {
        if (!this.tour) {
            const { tourId } = this.props.match.params;
            this.store.selectById(tourId);
        }
    }

    render() {
        if (!this.tour) {
            return null;
        }

        const { classes } = this.props;

        return <div className={classes.root}>
            <TourMap
                tour={this.tour}
                draggableMarkers={false}
                onClick={() => {
                    this.store.clearSelectedPlace();
                }}
                onPlaceClick={(e) => {
                    this.store.selectPlaceById(e.place.id);
                }}
                onConnectionClick={() => {
                    this.store.clearSelectedPlace();
                }}
            />
            {this.selectedPlace && <InfoPanel
                classNames={{ root: classes.infoPanel }}
                imageUrl={this.selectedPlace.coverUrl}
                title={this.selectedPlace.name}
                description={this.selectedPlace.description}
            />}
        </div>;
    }
}

export default withStyles(styles)(requireAuth(inject("rootStore")(observer(ViewMapPage))));
