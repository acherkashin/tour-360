import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddLocation from '@material-ui/icons/AddLocation';
import LocationOff from '@material-ui/icons/LocationOff';
import CallMade from '@material-ui/icons/CallMade';

const styles = (theme) => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    indicator: {
        display: 'none'
    }
});

class MapEditMode extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;

        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                classes={{ root: classes.root, indicator: classes.indicator }}
            >
                <Tab icon={<AddLocation />} label="ADD PLACE" />
                <Tab icon={<LocationOff />} label="REMOVE PLACE" />
                <Tab icon={<CallMade />} label="ADD CONNECTION" />
            </Tabs>
        );
    }
}

MapEditMode.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapEditMode);