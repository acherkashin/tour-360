import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddLocation from '@material-ui/icons/AddLocation';
import LocationOff from '@material-ui/icons/LocationOff';
import CallMade from '@material-ui/icons/CallMade';
import PanTool from '@material-ui/icons/PanTool';

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
    text: 'DRAG MAP',
    icon: <PanTool />,
}, {
    text: 'ADD PLACE',
    icon: <AddLocation />,
}, {
    text: 'REMOVE PLACE',
    icon: <LocationOff />,
}, {
    text: 'ADD CONNECTION',
    icon: <CallMade />,
}];

class MapEditMode extends React.Component {
    handleChange = (event, value) => {
        this.setState({ value });
        this.props.onModeChanged && this.props.onModeChanged({ origin: this, mode: value })
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