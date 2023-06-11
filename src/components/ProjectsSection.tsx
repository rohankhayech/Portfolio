/* Copyright (c) 2023 Rohan Khayech */

import { Button, Chip, Collapse, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import Section from "./Section";
import Project, { ProjectType, getProjectTypeName } from "@/model/Project";
import ProjectCard from "./ProjectCard";
import { useMemo, useState } from "react";

/**
 * UI section displaying the specified list of software projects 
 * with options to filter by type, language, platform and framework.
 * @param props.projects List of software projects to display.
 * @param props.langColors Map of languages and their colors.
 * 
 * @author Rohan Khayech
 */
export default function ProjectsSection(props: {
    projects: Project[], 
    langColors: Map<string, string>
}) : JSX.Element {
    // Expanded state
    const [expanded, setExpanded] = useState(false)
    const theme = useTheme()
    const largeScreen = useMediaQuery(theme.breakpoints.up("xl"))
    const showAll = expanded || largeScreen

    // Filter selection state.
    const [selType, setSelType] = useState<ProjectType | undefined>(undefined) 
    const [selLang, setSelLang] = useState<string|undefined>(undefined) 
    const [selPlat, setSelPlat] = useState<string | undefined>(undefined) 
    const [selFramework, setSelFramework] = useState<string | undefined>(undefined) 
    
    const filtered = (selType !== undefined || selLang !== undefined || selPlat !== undefined || selFramework !== undefined)

    // Filter projects.
    const fProjects = useMemo(() => 
        props.projects
            .filter(p => selType === undefined || p.type === selType)
            .filter(p => selLang === undefined || p.langs.includes(selLang))
            .filter(p => selFramework === undefined || p.frameworks.includes(selFramework))
            .filter(p => selPlat === undefined || p.platforms.includes(selPlat)),
        [props.projects, selFramework, selLang, selPlat, selType]
    )

    // Project grid element.
    const projectGrid = <Grid container key="project-grid">
        {fProjects.map(project => (
            <Grid item
                key={project.name}
                xs={12} md={6} xl={4}
                sx={{ paddingRight: 2, paddingBottom: 2 }}
            >
                <ProjectCard
                    project={project}
                    langColors={props.langColors}
                    onTypeClick={() => {
                        setSelType(project.type);
                        scrollIntoView();
                    }}
                    onLangClick={lang => {
                        setSelLang(lang);
                        scrollIntoView();
                    }}
                    onPlatClick={platform => {
                        setSelPlat(platform);
                        scrollIntoView();
                    }}
                    onFrameworkClick={framework => {
                        setSelFramework(framework);
                        scrollIntoView();
                    }} />
            </Grid>
        ))}
    </Grid>

    // Component
    const COLLAPSED_MASK_IMG = "linear-gradient(to bottom, black 85%, transparent 100%"
    return (
        <Section title='Software Portfolio' sx={{ marginRight: 2 }}>
            { filtered && <>
                <FilterBar
                    selType={selType}
                    selLang={selLang}
                    selPlat={selPlat}
                    selFramework={selFramework}
                    onClearType={() => setSelType(undefined)}
                    onClearLang={() => setSelLang(undefined)}
                    onClearPlat={() => setSelPlat(undefined)}
                    onClearFramework={() => setSelFramework(undefined)} 
                />
                {projectGrid}
            </>}
            { !filtered && <>
                <Collapse
                    in={showAll}
                    collapsedSize={600}
                    style={showAll ? {} : {
                        maskImage: COLLAPSED_MASK_IMG,
                        WebkitMaskImage: COLLAPSED_MASK_IMG
                    }}
                    sx={{ width: "100%" }}
                >
                    {projectGrid}
                </Collapse>
                {!largeScreen &&
                    <div 
                        style={{
                            marginTop: theme.spacing(showAll ? 0 : 2),
                            marginRight: theme.spacing(2)
                        }}
                    >
                        <Button
                            sx={{ width: "100%" }}
                            variant="text"
                            onClick={() => { setExpanded((expanded) => !expanded); } }
                        >
                            {expanded ? "View Less" : "View All"}
                        </Button>
                    </div>
                }
            </>}
        </Section>
    )

    function scrollIntoView() {
        const element = document.getElementById("software-portfolio")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }
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
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap marginRight={2}>
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