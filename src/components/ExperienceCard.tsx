/* Copyright (c) 2023 Rohan Khayech */
import { Card, CardContent, Stack, Typography } from "@mui/material"
import TagChipGroup from "./TagChipGroup"
import Experience from "@/model/Experience"

export default function ExperienceCard(props: {experience: Experience}): JSX.Element {
    return (
        <Card style={{ height: '100%', width: '100%' }} variant="outlined">
            <CardContent style={{ height: '100%' }}>
                <Stack style={{ height: '100%' }} direction="column" justifyContent="space-between" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="subtitle1">{props.experience.title}</Typography>
                        <Typography variant="subtitle2">{props.experience.organisation}</Typography>
                        <Typography variant="body2">
                            {`${props.experience.startMonth ?? ""} ${props.experience.startYear} - ${props.experience.endMonth ?? ""} ${props.experience.endYear ?? "Present"}`}
                        </Typography>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        {props.experience.personalSkills &&
                            <TagChipGroup items={props.experience.personalSkills} title="Interpersonal Skills" keyPrefix="sk" leadingIcon="group" maxItems={3} />
                        }
                        {props.experience.techSkills &&
                            <TagChipGroup items={props.experience.techSkills} title="Technical Skills" keyPrefix="sk" leadingIcon="design_services" maxItems={3} />
                        }
                        {props.experience.languages &&
                            <TagChipGroup items={props.experience.languages} title="Language Experience" keyPrefix="sk" leadingIcon="data_object" />
                        }
                        {props.experience.frameworks &&
                            <TagChipGroup items={props.experience.frameworks} title="Framework/Library Experience" keyPrefix="sk" leadingIcon="dynamic_form" />
                        }
                        {props.experience.platforms &&
                            <TagChipGroup items={props.experience.platforms} title="Platform Development Experience" keyPrefix="sk" leadingIcon="devices" />
                        }
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}