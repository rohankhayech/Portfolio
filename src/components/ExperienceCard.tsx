import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

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
        <Card variant="outlined" sx={{ width: 384, height: 256 }}>
            <CardContent>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1">{organisation}</Typography>
                    <Typography variant="subtitle2">
                        {`${startMonth ?? ""} ${startYear} - ${endMonth ?? ""} ${endYear ?? "Present"}`}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        sx={{ flexWrap: "wrap" }}
                    >
                        {skills.map(skill => (
                            <Chip
                                key={`${title}-skl-${skill}`}
                                label={skill}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}