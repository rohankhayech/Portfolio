/** Copyright (c) 2023 Rohan Khayech */

import { Icon } from "@mui/material";

/**
 * Circle icon to be used as a leading icon in a chip element.
 * @param color The color of the icon.
 * @param size The size of the chip.
 */
export default function ChipCircleIcon({color, size}: {color?: string, size: "small" | "medium"}): JSX.Element {
    let fontSize: number
    switch (size) {
        case 'small': fontSize = 10; break;
        case 'medium': fontSize = 12; break;
    }
    return <Icon
        style={{
            color: color,
            fontSize: fontSize,
            marginLeft: 6,
            marginRight: -4
        }}
    >
        circle
    </Icon>
}