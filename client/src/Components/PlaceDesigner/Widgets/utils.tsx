import React from 'react';
import {
    Title as TitleIcon,
    Delete as DeleteIcon,
    Help as HintIcon,
    PlayCircleFilledOutlined,
} from '@material-ui/icons';
import { WidgetType } from '../../../../../backend/src/models/interfaces';

export function getIcon(widgetType: WidgetType) {
    switch (widgetType) {
        case 'text':
            return <TitleIcon />
        case 'run-video':
            return <PlayCircleFilledOutlined />
        case 'hint':
            return <HintIcon />
        default:
            throw createError(widgetType);
    }
}

export const createError = (widgetType: WidgetType) => new Error(`Unknown widget type: ${widgetType}`);