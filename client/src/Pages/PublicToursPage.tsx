import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core'
import { withStyles, WithStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { observer, inject } from 'mobx-react';
import { requireAuth } from '../HOC';
import { PageWrapper } from './../Components/Common';
import { Tours } from './../Components';
import { PublicToursStore, RootStore, Tour } from './../Stores';
import { grey } from "@material-ui/core/colors";

const styles: StyleRulesCallback = (theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
    },
    noTours: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: grey[700],
        fontSize: '24px',
    },
});


interface PublicToursPageProps extends WithStyles<typeof styles> {
    rootStore: RootStore;
    intl: any;
}

interface PublicToursPageState { }

class PublicToursPage extends React.Component<PublicToursPageProps, PublicToursPageState> {
    componentDidMount() {
        this.tourStore.loadTours();
    }

    get tourStore(): PublicToursStore {
        return this.props.rootStore.publicToursStore;
    }

    _handleTourItemClick = (e: { tour: Tour }) => {
        this.tourStore.selectTour(e.tour.id);
    }

    render() {
        const { formatMessage, messages } = this.props.intl;
        const { selectedTour, tours, hasTours } = this.tourStore;
        const { classes } = this.props;

        return <PageWrapper
            title={formatMessage(messages.publicTours)}
        >
            <div className={classes.root}>
                {hasTours && <Tours
                    selectedTourId={selectedTour && selectedTour.id}
                    tours={tours}
                    onItemClick={this._handleTourItemClick}
                    getActions={(e) => []}
                />}
                {!hasTours && <Typography className={classes.noTours}>No public tours are available</Typography>}
            </div>
        </PageWrapper >;
    }
}

export default withStyles(styles)(
    injectIntl(
        requireAuth(
            inject("rootStore")(observer(PublicToursPage))
        )
    )
);