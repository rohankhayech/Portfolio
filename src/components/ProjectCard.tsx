import { 
    Card, 
    CardContent, 
    Link, 
    Stack, 
    Typography 
} from "@mui/material";
import TagChipGroup from "./TagChipGroup";

interface ProjectProps { 
    name: string, 
    desc: string,
    platforms?: string[],
    langs?: string[],
    frameworks?: string[]
}

export default function ProjectCard({name, desc, platforms = [], langs = [], frameworks = []}: ProjectProps) {
    return (
        <Card 
            variant="outlined" 
            sx={{ 
                minWidth: 224, 
                maxWidth: 448,
                maxHeight: 224 
            }}
        >
            <CardContent>
                <Stack
                    direction="column"
                    spacing={1}
                >
                    <Link variant="subtitle1">{name}</Link>
                    <Typography variant="body2">{desc}</Typography>
                    <TagChipGroup items={langs} keyPrefix="lg" leadingIcon="data_object"/>
                    <TagChipGroup items={platforms} keyPrefix="pf" leadingIcon="devices" />
                    <TagChipGroup items={frameworks} keyPrefix="fw" leadingIcon="dynamic_form" />
                </Stack>
            </CardContent>
            {/* 
            <CardActions>
                <Button>View on Github</Button>
            </CardActions> 
            */}
        </Card>
    )
}

