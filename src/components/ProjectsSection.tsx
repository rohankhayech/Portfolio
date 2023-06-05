/* Copyright (c) 2023 Rohan Khayech */

import { Chip, Grid, Stack } from "@mui/material";
import Section from "./Section";
import Project, { ProjectType, getProjectTypeName } from "@/model/Project";
import ProjectCard from "./ProjectCard";
import { useMemo, useState } from "react";

/**
 * UI section displaying the specified list of software projects 
 * with options to filter by type, language, platform and framework.
 * @param props.projects List of software projects to display.
 * 
 * @author Rohan Khayech
 */
export default function ProjectsSection(props: {projects: Project[]}) : JSX.Element {
    
    // Filter selection state.
    const [selType, setSelType] = useState<ProjectType | undefined>(undefined) 
    const [selLang, setSelLang] = useState<string|undefined>(undefined) 
    const [selPlat, setSelPlat] = useState<string | undefined>(undefined) 
    const [selFramework, setSelFramework] = useState<string | undefined>(undefined) 
    
    // Filtered projects.
    const fProjects = useMemo(
        () => filterProjects(),
        [props.projects, selType, selLang, selFramework, selPlat]
    )

    /**
     * Filters the project list with the current filters in state.
     * @returns The filtered project list.
     */
    function filterProjects(): Project[] {
        let fProjects = props.projects
        if (selType !== undefined) {
            fProjects = fProjects.filter(p => p.type === selType)
        }
        if (selLang !== undefined) {
            fProjects = fProjects.filter(p => p.langs.includes(selLang))
        }
        if (selFramework !== undefined) {
            fProjects = fProjects.filter(p => p.frameworks.includes(selFramework))
        }
        if (selPlat !== undefined) {
            fProjects = fProjects.filter(p => p.platforms.includes(selPlat))
        }
        return fProjects
    }

    // Component
    return (
        <Section title='Software Portfolio'>
            <FilterBar 
                selType={selType}
                selLang={selLang}
                selPlat={selPlat}
                selFramework={selFramework}
                onClearType={() => setSelType(undefined)}
                onClearLang={()=>setSelLang(undefined)}
                onClearPlat={() => setSelPlat(undefined)}
                onClearFramework={() => setSelFramework(undefined)}
            />
            <Grid container>
                {fProjects.map(project => (
                    <Grid item
                        key={'p-${project.name}'}
                        xs={12} md={6} xl={4}
                        sx={{ paddingRight: 2, paddingBottom: 2 }}
                    >
                        <ProjectCard 
                            project={project}
                            onTypeClick={()=>setSelType(project.type)}
                            onLangClick={setSelLang}
                            onPlatClick={setSelPlat}
                            onFrameworkClick={setSelFramework}
                        />
                    </Grid>
                ))}
            </Grid>
        </Section>
    )
}

/**
 * UI bar displaying the currently selected filters and buttons to clear them.
 * @param props.selType The currently selected project type filter.
 * @param props.selLang The currently selected language filter.
 * @param props.selPlat The currently selected platform filter.
 * @param props.selFramework The currently selected framework filter.
 * @param onClearType Called when the user clears the type filter.
 * @param onClearLang Called when the user clears the language filter.
 * @param onClearPlat Called when the user clears the platform filter.
 * @param onClearFramework Called when the user clears the framework filter.
 */
function FilterBar(props: {
    selType: ProjectType | undefined,
    selLang: string | undefined,
    selPlat: string | undefined,
    selFramework: string | undefined,
    onClearType: () => void,
    onClearLang: () => void,
    onClearPlat: () => void,
    onClearFramework: () => void
}): JSX.Element {
    let typeName = ""
    if (props.selType !== undefined) {
        typeName = getProjectTypeName(props.selType)
    }

    return (
        <Stack direction="row" spacing={1} >
            {props.selType !== undefined && <Chip label={`Type: ${typeName}`} onDelete={props.onClearType} />}
            {props.selLang && <Chip label={`Language: ${props.selLang}`} onDelete={props.onClearLang}/>}
            {props.selPlat && <Chip label={`Platform: ${props.selPlat}`} onDelete={props.onClearPlat} />}
            {props.selFramework && <Chip label={`Built with: ${props.selFramework}`} onDelete={props.onClearFramework} />}
            {(props.selLang || props.selPlat || props.selFramework) &&
                <Chip 
                    label="Clear" 
                    clickable 
                    variant="outlined" 
                    onClick={() => {
                        props.onClearType()
                        props.onClearLang()
                        props.onClearPlat()
                        props.onClearFramework()
                    }}
                />
            }
        </Stack>
    )
}