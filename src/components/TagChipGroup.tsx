/* Copyright (c) 2023 Rohan Khayech */

import { Chip, Icon, Stack } from "@mui/material";

/**
 * UI element containing a row of tag chips with a leading icon.
 * @param props.items List of tag items to display in the chip group.
 * @param props.keyPrefix Prefix to prepend to each item's key.
 * @param props.leadingIcon ID of the material icon to display before the chip group.
 * 
 * @author Rohan Khayech
 */
export default function TagChipGroup(props: { items: string[], keyPrefix: string, leadingIcon: string }) {
    return (<>
        {props.items.length > 0 &&
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <Icon fontSize="small">{props.leadingIcon}</Icon>
                {props.items.map(item => (
                    <Chip
                        key={`${props.keyPrefix}-` + item}
                        label={item}
                        size="small"
                        variant="outlined"
                    />
                ))
                }
            </Stack>
        }
    </>)
}