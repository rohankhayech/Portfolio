/** Copyright (c) 2023 Rohan Khayech */
import { 
    Card, 
    CardContent, 
    Icon, 
    IconButton, 
    Link, 
    Stack, 
    Tooltip, 
    Typography 
} from "@mui/material";
import TagChipGroup from "./TagChipGroup";
import Project, { ProjectType, getProjectTypeName } from "@/model/Project";
import CircleChipIcon from "./ChipCircleIcon";

/**
 * UI component that displays a software project, featuring clickable categories.
 * @param props.project The software project to display.
 * @param props.onTypeClick Called when the project type icon is clicked.
 * @param props.onLangClick Called when the specified language is clicked.
 * @param props.onPlatClick Called when the specified platform is clicked.
 * @param props.onFrameworkClick Called when the specified framework is clicked.
 * 
 * @author Rohan Khayech
 */
export default function ProjectCard(props: {
    project: Project,
    langColors: Map<string, string>,
    onTypeClick: () => void,
    onLangClick: (item: string) => void,
    onPlatClick: (item: string) => void,
    onFrameworkClick: (item: string) => void,
}): JSX.Element {

    // Project type icon
    let type: string = getProjectTypeName(props.project.type)
    let icon: string
    switch (props.project.type) {
        case ProjectType.APP: icon = "web_asset"; break;
        case ProjectType.LIB: icon = "collections_bookmark"; break;
        case ProjectType.UNI: icon = "history_edu"; break;
        case ProjectType.OTHER: icon = "book";
    }

    // Special case for this website's project
    if (props.project.name === "About this Website") {
        type = "About"
        icon = "info"
    }

    // Component
    return (
        <Card style={{ height: '100%', width: '100%' }} variant="outlined">
            <CardContent style={{ height: '100%' }}>
                <Stack style={{ height: '100%' }} direction="column" justifyContent="space-between" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <Tooltip title={type} placement="top">
                                <IconButton disabled={type === "About"} sx={{marginTop: 0.5, padding: 0}} onClick={props.onTypeClick}>
                                    <Icon baseClassName="material-icons-outlined" fontSize="small">{icon}</Icon>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="View on GitHub" placement="top">
                                <Link variant="subtitle1" href={props.project.url}>{props.project.name}</Link>
                            </Tooltip>
                        </Stack>
                        <Typography variant="body2">{props.project.desc}</Typography>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <TagChipGroup 
                            items={props.project.langs}
                            chipLeadingicon={l => 
                                <CircleChipIcon color={props.langColors.get(l)!} size="small"/>
                            } 
                            title="Languages" 
                            leadingIcon="data_object" 
                            onClick={props.onLangClick} 
                        />
                        <TagChipGroup items={props.project.platforms} title="Platforms" leadingIcon="devices" onClick={props.onPlatClick} />
                        <TagChipGroup items={props.project.frameworks} title="Technology Stack" leadingIcon="dynamic_form" onClick={props.onFrameworkClick} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

