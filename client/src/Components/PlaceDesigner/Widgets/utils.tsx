import React from 'react';
import {
    Title as TitleIcon,
    Delete as DeleteIcon,
    PlayCircleFilledOutlined,
} from '@material-ui/icons';
import { WidgetType } from '../../../../../backend/src/models/interfaces';

export function getIcon(widgetType: WidgetType) {
    if (widgetType === 'text') {
        return <TitleIcon />;
    } else if (widgetType === 'run-video') {
        return <PlayCircleFilledOutlined />;
    }

    throw new Error(`Unknown widget type: ${widgetType}`);
}