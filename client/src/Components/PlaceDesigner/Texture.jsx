import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import equirectToCubemapFaces from 'equirect-cubemap-faces-js';
import { CircularProgress } from '@material-ui/core';
import classNames from 'classnames';

const CUBE_SIZE = 1024;

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
                const cs = equirectToCubemapFaces(i);

                this.setState({ isLoaded: true }, () => {
                    const context = this.canvasRef.current.getContext('2d');
                    context.drawImage(cs[1], 0, 0);
                    context.drawImage(cs[4], CUBE_SIZE, 0);
                    context.drawImage(cs[0], 2 * CUBE_SIZE, 0);
                    context.drawImage(cs[5], 3 * CUBE_SIZE, 0);
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

        return <div className={className} ref={this.rootRef}>
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