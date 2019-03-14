import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import { AddLocation, LocationOff, CallMade, PanTool } from '@material-ui/icons'
import { DRAG_MAP, ADD_PLACE, REMOVE_PLACE, ADD_CONNECTION } from './Modes';

const styles = (theme) => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    indicator: {
        display: 'none'
    },
    tab: {
        flexShrink: 1,
        minWidth: 80,
    }
});

const tabs = [{
    id: DRAG_MAP,
    text: 'DRAG MAP',
    icon: <PanTool />,
}, {
    id: ADD_PLACE,
    text: 'ADD PLACE',
    icon: <AddLocation />,
}, {
    id: REMOVE_PLACE,
    text: 'REMOVE PLACE',
    icon: <LocationOff />,
}, {
    id: ADD_CONNECTION,
    text: 'ADD CONNECTION',
    icon: <CallMade />,
}];

class MapEditMode extends React.Component {
    state = {
        value: null,
    };

    handleChange = (event, value) => {
        if (this.state.value !== value) {
            this.setState({ value });
            this.props.onModeChanged && this.props.onModeChanged({ origin: this, mode: value })
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <Tabs
                value={this.props.value || 0}
                onChange={this.handleChange}
                variant="fullWidth"
                textColor="secondary"
                classes={{ root: classes.root, indicator: classes.indicator }}
            >
                {tabs.map((tab, index) => <Tab key={index} className={classes.tab} icon={tab.icon} label={tab.text} />)}
            </Tabs>
        );
    }
}

MapEditMode.propTypes = {
    value: PropTypes.number,
    classes: PropTypes.object.isRequired,
    onModeChanged: PropTypes.func.isRequired,
};

export default withStyles(styles)(MapEditMode);