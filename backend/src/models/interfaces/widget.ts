export interface BaseWidget {
    id: string;
    type: string;
}

export interface TextWidget extends BaseWidget {
    x: number;
    y: number;
    content: string;
    color: string;
    backgroundColor: string;
}
