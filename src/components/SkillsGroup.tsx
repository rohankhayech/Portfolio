/** Copyright (c) 2023 Rohan Khayech */

import { Chip, Stack, SxProps, Theme, Typography } from "@mui/material"

/**
 * UI component that displays the list of skills in a centered flex row with a title.
 * @param props.title Title of the skills group.
 * @param props.skills List of skills to display. 
 */
export default function SkillsGroup(props: {
    title: string
    skills: string[]
}): JSX.Element {
    return (
        <Stack
            spacing={2}
            alignItems="center"
        >
            <Typography variant='h6'>{props.title}</Typography>
            <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
            >
                {props.skills.map(skill =>
                    <Chip key={`sk-${skill}`} label={skill} />
                )}
            </Stack>
        </Stack> 
    )
}