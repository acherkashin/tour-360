import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import {
    Clear as ClearIcon,
    Edit as EditIcon,
    Visibility as VisibilityIcon,
    Place as PlaceIcon,
} from "@material-ui/icons"
import {
    List,
    ListItem,
    IconButton,
    ListItemText,
    Typography,
    ListSubheader,
} from "@material-ui/core";
import { intlShape, injectIntl } from 'react-intl';
import grey from '@material-ui/core/colors/grey';
import classnames from 'classnames';

const styles = createStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${grey[300]}`,
    },
    size: {
        color: grey[700],
        lineHeight: 1,
    },
    icon: {
        maxWidth: 40,
        maxHeight: 40,
    },
    noImageText: {
        textAlign: 'center',
    }
}));

interface IconEditorProps extends WithStyles<typeof styles> {
    intl: any;
    className: string;
    image: {
        url: string;
        filename: string;
        width: number;
        height: number;
    },
    onClearClick: (e: { origin: IconEditor, }) => void;
    onEditClick: (e: { origin: IconEditor }) => void;
}

class IconEditor extends React.Component<IconEditorProps> {
    constructor(props: IconEditorProps) {
        super(props);
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        intl: intlShape,
        className: PropTypes.string,
        image: PropTypes.shape({
            url: PropTypes.string.isRequired,
            filename: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }),
        onEditClick: PropTypes.func.isRequired,
        onClearClick: PropTypes.func.isRequired,
    }

    render() {
        const {
            image,
            className,
            onEditClick,
            onClearClick,
        } = this.props;
        const classes: any = this.props.classes;
        const { messages, formatMessage } = this.props.intl;

        const root = classnames({
            [classes.root]: true,
            [className]: !!className,
        });

        const iconUrl = image ? image.url : '/src/markers/default.svg';

        return (<List
            className={root}
            subheader={<ListSubheader>Map marker</ListSubheader>}
        >
            <ListItem>
                <img className={classes.icon} src={iconUrl} />
                {image && <ListItemText
                    primary={image.filename}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" variant="caption" className={classes.size}>
                                {formatMessage(messages.width)}: {image.width}
                            </Typography>
                            <Typography component="span" variant="caption" className={classes.size}>
                                {formatMessage(messages.height)}: {image.height}
                            </Typography>
                        </React.Fragment>
                    } />}
                {!image && <ListItemText classes={{root: classes.noImageText}} primary={'Icon is not selected'} />}
                <IconButton onClick={(e) => onEditClick({ origin: this, })}>
                    <EditIcon />
                </IconButton>
                {image && <IconButton onClick={(e) => onClearClick({ origin: this, })}>
                    <ClearIcon />
                </IconButton>}
            </ListItem>
        </List>);
    }
}

export default withStyles(styles)(injectIntl(IconEditor));