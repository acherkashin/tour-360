import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { observer, inject } from 'mobx-react';
import { requireAuth } from '../HOC';
import { PageWrapper } from './../Components/Common';

const styles = createStyles(theme => ({
}));


interface PublicToursPageProps extends WithStyles<typeof styles> {
    intl: any;
}

interface PublicToursPageState { }

class PublicToursPage extends React.Component<PublicToursPageProps, PublicToursPageState> {
    render() {
        const { formatMessage, messages } = this.props.intl;

        return <PageWrapper
            title={formatMessage(messages.publicTours)}
        >
            <div></div>
        </PageWrapper>;
    }
}

export default withStyles(styles)(
    injectIntl(
        requireAuth(
            inject("rootStore")(observer(PublicToursPage))
        )
    )
);