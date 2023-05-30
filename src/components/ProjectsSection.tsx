import { Grid } from "@mui/material";
import Section from "./Section";
import Project from "@/model/Project";
import ProjectCard from "./ProjectCard";
import { useMemo, useState } from "react";

export default function ProjectsSection(props: {projects: Project[]}) {
    
    // Filter selection state.
    const [selLang, setSelLang] = useState<string|undefined>(undefined) 
    const [selPlats, setSelPlats] = useState<string | undefined>(undefined) 
    const [selFramework, setSelFramework] = useState<string | undefined>(undefined) 
    
    // Filtered projects.
    const fProjects = useMemo(
        () => filterProjects(props.projects, selLang, selFramework, selPlats),
        [props.projects, selLang, selFramework, selPlats]
    )


    // Component
    return (
        <Section title='Software Portfolio'>
            <Grid container
                columns={{ sm: 4, md: 8, lg: 12 }}
            >
                {fProjects.map(project => (
                    <Grid item
                        key={'p-${project.name}'}
                        sm={4} md={4} lg={4}
                        sx={{ paddingRight: 2, paddingBottom: 2 }}
                    >
                        <ProjectCard
                            name={project.name}
                            desc={project.desc}
                            url={project.url}
                            langs={project.langs}
                            platforms={project.platforms}
                            frameworks={project.frameworks}
                        />
                    </Grid>
                ))}
            </Grid>
        </Section>
    )
}

function filterProjects(projects: Project[], selLang?: string, selFramework?: string, selPlats?: string): Project[] {
    let fProjects = projects
    if (selLang !== undefined) {
        fProjects = fProjects.filter(p => p.langs.includes(selLang))
    }
    if (selFramework !== undefined) {
        fProjects = fProjects.filter(p => p.frameworks.includes(selFramework))
    }
    if (selPlats !== undefined) {
        fProjects = fProjects.filter(p => p.platforms.includes(selPlats))
    }
    return fProjects
}