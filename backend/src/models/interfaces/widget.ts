import { MediaFile } from './';

export type WidgetType = 'text' | 'run-video';

export interface BaseWidget {
    id: string;
    type: WidgetType;
    x: number;
    y: number;
}

export interface TextWidget extends BaseWidget {
    content: string;
    color: string;
    backgroundColor: string;
    padding: number;
}

export interface RunVideoWidget extends BaseWidget {
    name: string;
    muted: boolean;
    volume: number;
    video?: MediaFile;
}
