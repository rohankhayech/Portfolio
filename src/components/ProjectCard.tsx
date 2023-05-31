import { 
    Card, 
    CardContent, 
    Icon, 
    Link, 
    Stack, 
    Tooltip, 
    Typography 
} from "@mui/material";
import TagChipGroup from "./TagChipGroup";
import Project from "@/model/Project";

export default function ProjectCard({project}: {project: Project}) {
    let icon: string
    let icon_tooltip: string
    switch (project.type) {
        case "app": 
            icon = "web_asset"; 
            icon_tooltip = "Application"; 
            break;
        case "lib": 
            icon = "collections_bookmark"; 
            icon_tooltip = "Library";
            break;
        case "uni": 
            icon = "history_edu"; 
            icon_tooltip = "University Project";
            break;
        case "other": 
            icon = "book";
            icon_tooltip = "Project";
    }

    return (
        <Card style={{ height: '100%', width: '100%' }} variant="outlined">
            <CardContent style={{ height: '100%' }}>
                <Stack style={{ height: '100%' }} direction="column" justifyContent="space-between" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Tooltip title={icon_tooltip} placement="top">
                                <Icon baseClassName="material-icons-outlined" fontSize="small">{icon}</Icon>
                            </Tooltip>
                            <Tooltip title="View on GitHub" placement="top">
                                <Link variant="subtitle1" href={project.url}>{project.name}</Link>
                            </Tooltip>
                        </Stack>
                        <Typography variant="body2">{project.desc}</Typography>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <TagChipGroup items={project.langs} keyPrefix="lg" title="Languages" leadingIcon="data_object" onClick={() => { }} />
                        <TagChipGroup items={project.platforms} keyPrefix="pf" title="Platforms" leadingIcon="devices" onClick={() => { }} />
                        <TagChipGroup items={project.frameworks} keyPrefix="fw" title="Frameworks/Libraries" leadingIcon="dynamic_form" onClick={() => { }} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

