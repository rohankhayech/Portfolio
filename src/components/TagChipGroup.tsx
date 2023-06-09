/* Copyright (c) 2023 Rohan Khayech */

import { Chip, Icon, Stack, Tooltip } from "@mui/material";
import { useMemo } from "react";

/**
 * UI element containing a row of tag chips with a leading icon.
 * @param props.items List of tag items to display in the chip group.
 * @param props.chipLeadingIcon Optional function that determines each chip's leading icon. Takes the chip's item as a parameter.
 * @param props.title Title of the chip group.
 * @param props.leadingIcon ID of the material icon to display before the chip group.
 * @param props.maxItems Limit of items to display. Additonal items will be represented by an overflow chip. Defaults to 4 items.
 * @param props.onClick Function to handle click events for each chip. Takes the chip's item as a parameter.
 * 
 * @author Rohan Khayech
 */
export default function TagChipGroup(props: { 
    items: string[],
    chipLeadingicon?: (item: string) => JSX.Element,
    title: string, 
    leadingIcon: string, 
    maxItems?: number,
    onClick?: (item: string) => void
}): JSX.Element {
    const maxItems = props.maxItems ?? 4
    return (<>
        {props.items.length > 0 &&
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
            >
                <Tooltip title={props.title} placement="right">
                    <Icon fontSize="small">{props.leadingIcon}</Icon>
                </Tooltip>
                {props.items.slice(0,maxItems).map((item, i) => 
                    <TagChip key={item} item={item} icon={props.chipLeadingicon} onClick={props.onClick}/>
                )}
                {props.items.length > maxItems &&
                    <Tooltip 
                        title={props.items.slice(maxItems,props.items.length).join(", ")} 
                        placement="right"
                    >
                        <Chip
                            label={`+${props.items.length - maxItems}`}
                            size="small"
                        />
                    </Tooltip>
                }
            </Stack>
        }
    </>)
}

/**
 * Tag chip with an optional leading icon.
 * @param item Label for the chip.
 * @param icon Leading icon element. Takes the chip's item as a parameter.
 * @param onClick Function to handle click events for each chip. Takes the chip's item as a parameter.
 */
function TagChip({item, icon, onClick}: {
    item: string,  
    icon?: (item: string) => JSX.Element,
    onClick?: (item: string) => void
}): JSX.Element {
    const iconElement = useMemo(() => icon ? icon(item) : <></>, [item, icon])
    return <Chip
        label={item}
        icon={iconElement}
        size="small"
        variant="outlined"
        clickable={onClick != undefined}
        onClick={() => { if (onClick) onClick(item) }}
    />
}