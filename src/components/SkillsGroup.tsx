/** Copyright (c) 2023 Rohan Khayech */

import { Chip, Stack, Typography } from "@mui/material"
import { useMemo } from "react"

/**
 * UI component that displays the list of skills in a centered flex row with a title.
 * @param props.title Title of the skills group.
 * @param props.skills List of skills to display. 
 * @param props.icon Optional function that determines the icon displayed for each skill.
 */
export default function SkillsGroup(props: {
    title: string
    skills: string[]
    icon?: (skill: string) => JSX.Element
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
                    <SkillChip key={skill} skill={skill} icon={props.icon}/>
                )}
            </Stack>
        </Stack> 
    )
}

/**
 * Chip displaying a skill.
 * @param skill The skill to display.
 * @param icon Optional function that determines the icon displayed for each skill.
 */
export function SkillChip({skill, icon}: {
    skill: string, 
    icon?: (skill: string) => JSX.Element
}): JSX.Element {
    const iconElement = useMemo(() => icon ? icon(skill) : undefined, [icon, skill])
    return <Chip label={skill} icon={iconElement}/>
}