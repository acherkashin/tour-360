import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Paper, Typography } from '@material-ui/core';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column' as 'column',
    },
    cover: {
        width: '100%',
    },
    titleWrapper: {

    },
    title: {
        padding: theme.spacing.unit,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as 'nowrap',
    },
    descriptionWrapper: {
        overflow: 'auto',
    },
    description: {
        padding: theme.spacing.unit,
        color: grey[700],
    }
});

interface InfoPanelProps extends WithStyles<typeof styles> {
    classNames?: {
        root?: string,
    },
    imageUrl?: string;
    title: string;
    description?: string;
}

class InfoPanel extends React.Component<InfoPanelProps> {
    static propTypes = {
        classNames: PropTypes.shape({
            root: PropTypes.string,
        }),
        imageUrl: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            title,
            imageUrl,
            description,
            classNames = {},
        } = this.props;

        const root = classnames({
            [classes.root]: true,
            [classNames.root]: Boolean(classNames.root),
        });

        return <Paper className={root}>
            <img src={imageUrl} className={classes.cover} />
            <div className={classes.titleWrapper}></div>
            <div className={classes.titleWrapper}>
                <Typography variant="h4" align='center'>{title}</Typography>
            </div>
            <div className={classes.descriptionWrapper}>
                <Typography variant="body1" className={classes.description}>{description}</Typography>
            </div>
        </Paper>;
    }
}

export default withStyles(styles)(InfoPanel);