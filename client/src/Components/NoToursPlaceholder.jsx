import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { PlaceholderButton } from './';
import { intlShape, injectIntl } from 'react-intl';

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

export class NoToursPlaceholder extends PureComponent {
    constructor(props) {
        super(props);

        this._handleAddClick = this._handleAddClick.bind(this);
    }

    _handleAddClick() {
        this.props.onAddClick && this.props.onAddClick()
    }

    render() {
        const { classes } = this.props;
        const { messages, formatMessage } = this.props.intl;

        return (<Typography className={classes.root}>
            {formatMessage(messages.noToursPlaceholderFirstPart)} <PlaceholderButton onClick={this._handleAddClick} text={formatMessage(messages.here)} /> {formatMessage(messages.noToursPlaceholderSecondPart)}
        </Typography>);
    }
}

NoToursPlaceholder.propTypes = {
    classes: PropTypes.object.isRequired,
    onAddClick: PropTypes.func.isRequired,
    
    intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(NoToursPlaceholder));
