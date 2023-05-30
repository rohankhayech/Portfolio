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

export default function ExperienceCard({title, organisation, startYear, startMonth, endYear, endMonth, skills = []}: ExperienceCardProps) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Stack
                    direction="column"
                    spacing={1}
                >
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1">{organisation}</Typography>
                    <Typography variant="subtitle2">
                        {`${startMonth ?? ""} ${startYear} - ${endMonth ?? ""} ${endYear ?? "Present"}`}
                    </Typography>
                    <TagChipGroup items={skills} title="Skills" keyPrefix="sk" leadingIcon="design_services"/>
                </Stack>
            </CardContent>
        </Card>
    )
}