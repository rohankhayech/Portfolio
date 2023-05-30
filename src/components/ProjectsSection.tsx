import { Grid } from "@mui/material";
import Section from "./Section";
import Project from "@/model/Project";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection(props: {projects: Project[]}) {
    // Component
    return (
        <Section title='Software Portfolio'>
            <Grid container
                columns={{ sm: 4, md: 8, lg: 12 }}
            >
                {props.projects.map(project => (
                    <Grid item
                        key={'p-${project.name}'}
                        sm={4} md={4} lg={4}
                        sx={{ paddingRight: 2, paddingBottom: 2 }}
                    >
                        <ProjectCard project={project}/>
                    </Grid>
                ))}
            </Grid>
        </Section>
    )
}