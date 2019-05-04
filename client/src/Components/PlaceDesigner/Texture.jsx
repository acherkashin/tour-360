import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import equirectToCubemapFaces from 'equirect-cubemap-faces-js';
import { CircularProgress } from '@material-ui/core';
import classNames from 'classnames';
import { NoPlacePlaceholder } from "./";

const CUBE_SIZE = 1170;

const styles = theme => ({
    root: {
    },
    rootLoading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    canvas: {
        width: CUBE_SIZE * 4,
        height: CUBE_SIZE,
    }
});

function loadImage(src) {
    return new Promise(function (resolve, reject) {
        var i = new Image();
        i.onload = function () { resolve(i); }
        i.onerror = reject;
        i.src = src;
    });
}

class Texture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
        }

        this.rootRef = React.createRef();
        this.canvasRef = React.createRef();


    }

    componentDidMount() {
        const { imageUrl } = this.props;

        loadImage(imageUrl)
            .then((i) => {
                const cs = equirectToCubemapFaces(i, CUBE_SIZE);

                this.setState({ isLoaded: true }, () => {
                    const context = this.canvasRef.current.getContext('2d');
                    context.drawImage(cs[5],
                        CUBE_SIZE / 2, // source x
                        0, // source y
                        CUBE_SIZE / 2, // source width
                        CUBE_SIZE, // source height
                        0, // destination x
                        0, // destination y
                        CUBE_SIZE / 2, // destination width
                        CUBE_SIZE // destination height
                    );
                    context.drawImage(cs[1], 0.5 * CUBE_SIZE, 0);
                    context.drawImage(cs[4], 1.5 * CUBE_SIZE, 0);
                    context.drawImage(cs[0], 2.5 * CUBE_SIZE, 0);

                    context.drawImage(cs[5],
                        0, // source x
                        0, // source y
                        CUBE_SIZE / 2, // source width
                        CUBE_SIZE, // source height
                        3.5 * CUBE_SIZE, // destination x
                        0, // destination y
                        CUBE_SIZE / 2, // destination width
                        CUBE_SIZE // destination height
                    );
                });
            });
    }

    render() {
        const { classes } = this.props;
        const { isLoaded } = this.state;

        const className = classNames({
            [classes.root]: true,
            [classes.rootLoading]: !isLoaded,
        });

        return <div className={className} ref={this.rootRef} style={{ width: CUBE_SIZE * 4, height: CUBE_SIZE }}>
            {isLoaded && <canvas width={CUBE_SIZE * 4} height={CUBE_SIZE} ref={this.canvasRef} className={classes.canvas}></canvas>}
            {!isLoaded && <CircularProgress size={48} />}
        </div>;
    }
}

Texture.propTypes = {
    classes: PropTypes.object.isRequired,
    imageUrl: PropTypes.string.isRequired,
}

export default withStyles(styles)(Texture);