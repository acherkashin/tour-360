import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import TextWidgetShape from './TextWidgetShape';

const styles = theme => ({
    root: {
    },
});

const TextWidgetEditPanel = observer(class TextWidgetEditPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { widget } = this.props;
        return <div class={styles.root}>
            {widget.content}
        </div>;
    }
});

TextWidgetEditPanel.propTypes = {
    widget: TextWidgetShape,
};

export default withStyles(styles)(TextWidgetEditPanel);
