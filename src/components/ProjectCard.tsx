import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ProjectProps { 
    name: string, 
    desc: string,
    platforms?: string[],
    langs?: string[],
    frameworks?: string[]
}

export default function ProjectCard({name, desc, platforms = [], langs = [], frameworks = []}: ProjectProps) {
    return (
        <Card variant="outlined" sx={{ width: 384, height: 256 }}>
            <CardContent>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Link variant="h6">{name}</Link>
                    <Typography variant="body1">{desc}</Typography>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        sx={{ flexWrap: "wrap" }}
                    >
                        {langs.map(lang => (
                            <Chip 
                                key={"lg-" + lang} 
                                label={lang} 
                                size="small"
                                variant="outlined"
                            />
                        ))}
                        {platforms.map(platform => (
                            <Chip
                                key={"pf-" + platform}
                                label={platform}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                        {frameworks.map(framework => (
                            <Chip 
                                key={"fw-"+framework} 
                                label={framework} 
                                size="small"
                                variant="outlined" 
                            />
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <Button>View on Github</Button>
            </CardActions>
        </Card>
    )
}