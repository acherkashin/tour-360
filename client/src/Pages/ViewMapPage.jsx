import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { TourMap } from "./../Components/TourDesigner";
import { requireAuth } from './../HOC';


const styles = theme => ({
});

const ViewMapPage = requireAuth(inject("rootStore")(observer(
    class ViewMapPage extends React.Component {
        get store() {
            return this.props.rootStore.viewTourStore;
        }
        get tour() {
            return this.store.tour;
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

            return <TourMap
                tour={this.tour}
                onClick={() => { }}
                onPlaceClick={() => { }}
                onConnectionClick={() => { }}
            />;
        }
    }
)));

ViewMapPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewMapPage);
