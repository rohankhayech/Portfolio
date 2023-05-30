import { 
    Card, 
    CardContent, 
    Link, 
    Stack, 
    Typography 
} from "@mui/material";
import TagChipGroup from "./TagChipGroup";
import Project from "@/model/Project";

export default function ProjectCard({name, desc, url, platforms = [], langs = [], frameworks = []}: Project) {
    return (
        <Card style={{ height: '100%', width: '100%' }} variant="outlined">
            <CardContent style={{ height: '100%' }}>
                <Stack style={{ height: '100%' }} direction="column" justifyContent="space-between" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        <Link variant="subtitle1" href={url}>{name}</Link>
                        <Typography variant="body2">{desc}</Typography>
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <TagChipGroup items={langs} keyPrefix="lg" title="Languages" leadingIcon="data_object" onClick={() => { }} />
                        <TagChipGroup items={platforms} keyPrefix="pf" title="Platforms" leadingIcon="devices" onClick={() => { }} />
                        <TagChipGroup items={frameworks} keyPrefix="fw" title="Frameworks/Libraries" leadingIcon="dynamic_form" onClick={() => { }} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

