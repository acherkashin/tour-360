import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { PlaceholderButton } from './../';

const styles = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: grey[700],
        fontSize: '24px',
    },
});

export class NoImagePlaceholder extends PureComponent {
    constructor(props) {
        super(props);

        this._handleUploadClick = this._handleUploadClick.bind(this);
    }
    _handleUploadClick() {
        this.props.onUploadClick();
    }
    render() {
        const { classes } = this.props;

        return (<Typography className={classes.root}>
            This place doesn't have attached image. Click <PlaceholderButton onClick={this._handleUploadClick} text={'here'} />  to upload one.
        </Typography>);
    }
}

NoImagePlaceholder.propTypes = {
    classes: PropTypes.object.isRequired,
    onUploadClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NoImagePlaceholder);
