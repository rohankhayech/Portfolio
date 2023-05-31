/* Copyright (c) 2023 Rohan Khayech */
import { Card, CardContent, Stack, Typography } from "@mui/material"
import TagChipGroup from "./TagChipGroup"

interface ExperienceCardProps {
    title: string,
    organisation: string,
    startYear: string,
    startMonth?: string
    endYear?: string
    endMonth?: string
    skills?: string[]
}

export default function ExperienceCard({title, organisation, startYear, startMonth, endYear, endMonth, skills = []}: ExperienceCardProps): JSX.Element {
    return (
        <Card style={{ height: '100%', width: '100%' }} variant="outlined">
            <CardContent style={{ height: '100%' }}>
                <Stack style={{ height: '100%' }} direction="column" justifyContent="space-between" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="subtitle1">{title}</Typography>
                        <Typography variant="subtitle2">{organisation}</Typography>
                        <Typography variant="body2">
                            {`${startMonth ?? ""} ${startYear} - ${endMonth ?? ""} ${endYear ?? "Present"}`}
                        </Typography>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        
                        <TagChipGroup items={skills} title="Skills" keyPrefix="sk" leadingIcon="design_services"/>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}