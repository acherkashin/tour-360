import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { TextField, Button } from '@material-ui/core';
import { ChromePicker } from 'react-color';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextWidgetShape from './TextWidgetShape';
import { HEIGHT, WIDTH } from './../utils';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    buttonsGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
    },
    buttonRoot: {
        position: 'relative',
        maxWidth: '50%',
        height: '100%',
    },
    colorPicker: {
        position: 'absolute',
        top: '100%',
        right: 0,
    },
});

const TextWidgetEditPanel = observer(class TextWidgetEditPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTextColorPickerActive: false,
            isTextBackgroundColorPickerActive: false,
            theme: null,
        }

        this._handleXChanged = this._handleXChanged.bind(this);
        this._handleYChanged = this._handleYChanged.bind(this);
        this._handleContentChanged = this._handleContentChanged.bind(this);
        this._handleChangeTextColor = this._handleChangeTextColor.bind(this);
        this._handleChangeTextBackgroundColor = this._handleChangeTextBackgroundColor.bind(this);
        this._handleTextColorButtonClick = this._handleTextColorButtonClick.bind(this);
        this._handleTextBackgroundColorButtonClick = this._handleTextBackgroundColorButtonClick.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({ theme: createMuiTheme({
            palette: {
                primary: {
                    main: this.props.widget.color,
                },
                secondary: {
                    main: this.props.widget.backgroundColor,
                }
            }
        }) });
    }

    _handleXChanged(e) {
        this.props.onXChanged({ origin: this, x: parseInt(e.target.value) });
    }

    _handleYChanged(e) {
        this.props.onYChanged({ origin: this, y: parseInt(e.target.value) });
    }

    _handleContentChanged(e) {
        this.props.onContentChanged({ origin: this, content: e.target.value });
    }

    _handleChangeTextColor(color) {
        this.props.onTextColorChanged(color.hex);
        // this.setState({ theme: createMuiTheme({
        //     palette: {
        //         primary: {
        //             main: color.hex,
        //         },
        //         secondary: {
        //             main: this.props.widget.backgroundColor,
        //         }
        //     }
        // }) })
    }
    _handleChangeTextBackgroundColor(color) {
        this.props.onTextBackgroundColorChanged(color.hex);
        // this.setState({ theme: createMuiTheme({
        //     palette: {
        //         primary: {
        //             main: this.props.widget.color,
        //         },
        //         secondary: {
        //             main: color.hex,
        //         }
        //     }
        // }) })
    }

    _handleTextColorButtonClick() {
        const { isTextColorPickerActive } = this.state;

        this.setState({ isTextColorPickerActive: !isTextColorPickerActive })
    }
    _handleTextBackgroundColorButtonClick() {
        const { isTextBackgroundColorPickerActive } = this.state;

        this.setState({ isTextBackgroundColorPickerActive: !isTextBackgroundColorPickerActive })
    }


    render() {
        const { classes, widget, textColor, textBackgroundColor } = this.props;
        const { isTextColorPickerActive, isTextBackgroundColorPickerActive } = this.state;

        return <div className={classes.root}>
            <TextField
                label="Position X"
                value={widget.x}
                onChange={this._handleXChanged}
                type="number"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    max: WIDTH / 2,
                    min: - WIDTH / 2,
                    step: 25,
                }}
                fullWidth
                autoFocus
            />
            <TextField
                label="Position Y"
                value={widget.y}
                onChange={this._handleYChanged}
                type="number"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    max: HEIGHT / 2,
                    min: - HEIGHT / 2,
                    step: 25,
                }}
                fullWidth
            />
            <TextField
                lable="Content"
                value={widget.content}
                onChange={this._handleContentChanged}
                margin="normal"
                fullWidth
            />

            <div className={classes.buttonsGroup}>
                <MuiThemeProvider theme={this.state.theme}>
                    <div className={classes.buttonRoot}>
                        <Button 
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={this._handleTextColorButtonClick}
                        >Text Color</Button>
                        {isTextColorPickerActive && 
                            <ChromePicker
                                color={textColor}
                                onChange={this._handleChangeTextColor}
                                className={classes.colorPicker}
                            />
                        }
                    </div>

                    <div className={classes.buttonRoot}>
                        <Button 
                            variant="contained"
                            color="secondary"
                            size="medium"
                            onClick={this._handleTextBackgroundColorButtonClick}
                        >Text Background Color</Button>
                        {isTextBackgroundColorPickerActive && 
                            <ChromePicker
                                color={textBackgroundColor}
                                onChange={this._handleChangeTextBackgroundColor}
                                className={classes.colorPicker}
                            />
                        }
                    </div>
                </MuiThemeProvider>
            </div>
        </div>;
    }
});

TextWidgetEditPanel.propTypes = {
    widget: TextWidgetShape,
    onXChanged: PropTypes.func.isRequired,
    onYChanged: PropTypes.func.isRequired,
    onContentChanged: PropTypes.func.isRequired,
    onTextBackgroundColorChanged: PropTypes.func.isRequired,
    onTextColorChanged: PropTypes.func.isRequired,
};

export default withStyles(styles)(TextWidgetEditPanel);
