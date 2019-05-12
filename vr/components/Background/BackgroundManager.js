import { Environment, NativeModules } from 'react-360';
import VideoModule from 'VideoModule';
const { AudioModule } = NativeModules;

const DEFAULT_FORMAT = '2D';

class BackgroundManager {
    backgrounds = [];
    player = null;

    constructor() {

    }

    popBackground() {
        const last = this.backgrounds.pop();

        if (this.backgrounds.length) {
            const current = this.backgrounds[this.backgrounds.length - 1];
            this._applyBackground(current);
        } else {
            Environment.clearBackground();
        }

        return last;
    }

    /**
     * @param background { type: 'image' | 'video', props: PanoProps | VideoProps }
     */
    setBackground(background) {
        this.backgrounds = [];
        this.pushBackground(background);
    }

    setImageBackground(imageProps, audioProps) {
        this.backgrounds = [];
        this.pushImageBackground(imageProps, audioProps);
    }

    setVideoBackground(videoProps) {
        this.backgrounds = [];
        this.pushVideoBackground(videoProps);
    }

    pushBackground(background) {
        this.backgrounds.push(background);
        this._applyBackground(background);
    }

    pushVideoBackground(videoProps) {
        const background = {
            type: 'video',
            videoProps,
        };

        this.pushBackground(background);
    }

    /**
     * @param imageProps = { url: '' }
     * @param audioProps = { url: '', volume: 0.5}
     */
    pushImageBackground(imageProps, audioProps) {
        const background = {
            type: 'image',
            imageProps,
            audioProps,
        };

        this.pushBackground(background);
    }

    /**
     * @param props { type: 'image' | 'video', props: PanoProps | VideoProps }
     */
    _applyBackground(background) {
        if (background.type === 'image') {
            this._applyImageBackground(background.imageProps, background.audioProps);
        } else if (background.type === 'video') {
            this._applyVideoBackground(background.videoProps);
        } else {
            throw new Error('incorrect background type');
        }
    }

    _applyImageBackground(imageProps, audioProps) {
        Environment.setBackgroundImage(imageProps.url, { format: DEFAULT_FORMAT });

        if (audioProps) {
            AudioModule.playEnvironmental({
                source: audioProps.sound,
                volume: audioProps.volume,
            });
        } else {
            AudioModule.stopEnvironmental();
        }
    }

    _applyVideoBackground(videoProps) {
        AudioModule.stopEnvironmental();

        !this.player && this._createPlayer();

        this.player.play({
            source: { url: videoProps.url }, // provide the path to the video
            volume: videoProps.volume,
            muted: videoProps.muted,
        });

        Environment.setBackgroundVideo('BackgroundPlayer'); // or you can use player._player which is same value
    }

    _createPlayer() {
        if (!this.player) {
            this.player = VideoModule.createPlayer('BackgroundPlayer');
            //TODO: create issue because of in documentation says we should call addEventListener method
            this.player.addListener('onVideoStatusChanged', (event) => {
                // debugger;
                if (event.status === 'finished') {
                    this.player.destroy();
                    this.player = null;
                    this.popBackground();
                }
            });
        }
    }
}

export default new BackgroundManager();
