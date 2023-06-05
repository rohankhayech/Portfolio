/* Copyright (c) 2023 Rohan Khayech */

import { AvatarGroup, Chip, Icon, Stack, Tooltip } from "@mui/material";

/**
 * UI element containing a row of tag chips with a leading icon.
 * @param props.items List of tag items to display in the chip group.
 * @param props.keyPrefix Prefix to prepend to each item's key.
 * @param props.title Title of the chip group.
 * @param props.leadingIcon ID of the material icon to display before the chip group.
 * @param props.maxItems Limit of items to display. Additonal items will be represented by an overflow chip. Defaults to 4 items.
 * @param props.onClick Function to handle click events for each chip. Takes the chip's item as a parameter.
 * 
 * @author Rohan Khayech
 */
export default function TagChipGroup(props: { 
    items: string[], 
    keyPrefix: string, 
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
                {props.items.slice(0,maxItems).map(item => (
                    <Chip
                        key={`${props.keyPrefix}-` + item}
                        label={item}
                        size="small"
                        variant="outlined"
                        clickable={props.onClick != undefined}
                        onClick={() => { if (props.onClick) props.onClick(item) }}
                    />
                ))
                }
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