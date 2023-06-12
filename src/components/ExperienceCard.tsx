/* Copyright (c) 2023 Rohan Khayech */
import { Card, CardContent, Icon, Stack, Typography } from "@mui/material"
import TagChipGroup from "./TagChipGroup"
import Experience from "@/model/Experience"

export default function ExperienceCard(props: {experience: Experience, icon: string}): JSX.Element {
    return (
        <Card style={{ height: '100%', width: '100%' }} variant="outlined">
            <CardContent style={{ height: '100%' }}>
                <Stack style={{ height: '100%' }} direction="column" justifyContent="space-between" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={1}>
                            <Icon baseClassName="material-icons-outlined" fontSize="small" sx={{marginTop: 0.5}}>{props.icon}</Icon>
                            <Typography variant="subtitle1">{props.experience.title}</Typography>
                        </Stack>
                        <Typography variant="subtitle2">{props.experience.organisation}</Typography>
                        <Typography variant="body2">
                            {`${props.experience.startMonth ?? ""} ${props.experience.startYear} - ${props.experience.endMonth ?? ""} ${props.experience.endYear ?? "Present"}`}
                        </Typography>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        {props.experience.personalSkills &&
                            <TagChipGroup items={props.experience.personalSkills} title="Interpersonal Skills" leadingIcon="group" maxItems={3} />
                        }
                        {props.experience.techSkills &&
                            <TagChipGroup items={props.experience.techSkills} title="Technical Skills" leadingIcon="design_services" maxItems={3} />
                        }
                        {props.experience.langs &&
                            <TagChipGroup items={props.experience.langs} title="Language Experience" leadingIcon="data_object" />
                        }
                        {props.experience.frameworks &&
                            <TagChipGroup items={props.experience.frameworks} title="Technology Experience"  leadingIcon="dynamic_form" />
                        }
                        {props.experience.platforms &&
                            <TagChipGroup items={props.experience.platforms} title="Platform Development Experience" leadingIcon="devices" />
                        }
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}