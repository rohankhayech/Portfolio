/** Copyright (c) 2023 Rohan Khayech */

import Project, { LocalProject, ProjectType } from "@/model/Project";
import { loadJSONObject } from "./fileio";
import { getGitHubProjects } from "./github";
import path from "path";

/**
 * Collates a list of merged projects from the user's Github repositories and from file.
 * @returns The list of merged projects.
 */
export async function getAllProjects(): Promise<{
    projects: Project[],
    topLangs: Map<string, number>
}> {
    const repoProjects = getGitHubProjects()
    const localProjects = loadLocalProjects()

    const {projects, langs} = await repoProjects
    return {
        projects: mergeProjects(projects, await localProjects)
            .sort((p1, p2) => p1.type - p2.type), // Sort languages by percentage, descending.
        topLangs: langs
    }
}

/**
 * Loads the local projects from file.
 * @returns A map of the local projects and their associated repository names. 
 */
async function loadLocalProjects(): Promise<Map<string, LocalProject>> {
    const projects: LocalProject[] = await loadJSONObject(path.join("info", "projects.json"))
    return new Map(projects.map(p => [p.repoName ?? p.name, p]))
}

function mergeProjects(repoProjects: Map<string, Project>, localProjects: Map<string, LocalProject>): Project[] {
    localProjects.forEach((localProject, repoName) => {
        if (repoProjects.has(repoName)) {
            const project = repoProjects.get(repoName)!
            mergeProject(project, localProject)
        } else {
            repoProjects.set(localProject.repoName ?? localProject.name, {
                name: localProject.name,
                desc: localProject.desc ?? "",
                type: localProject.type ?? ProjectType.OTHER,
                url: localProject.url,
                platforms: localProject.platforms ?? [],
                langs: localProject.langs ?? [],
                frameworks: localProject.frameworks ?? [],
                techSkills: localProject.techSkills ?? [],
                personalSkills: localProject.personalSkills ?? []
            })
        }
    })
    return Array.from(repoProjects.values())
}

/**
 * Merges the local project into the repository project.
 * @param repoProject The repository project to merge into.
 * @param localProject The local project to merge from.
 */
function mergeProject(repoProject: Project, localProject: LocalProject) {
    repoProject.name = localProject.name ?? repoProject.name
    repoProject.desc = localProject.desc ?? repoProject.desc
    if (localProject.langs !== undefined) {
        repoProject.langs = repoProject.langs.concat(localProject.langs)
    }
    if (localProject.frameworks !== undefined) {
        repoProject.frameworks = repoProject.frameworks.concat(localProject.frameworks).sort()
    }
    if (localProject.platforms !== undefined) {
        repoProject.platforms = repoProject.platforms.concat(localProject.platforms).sort()
    }
    if (localProject.techSkills !== undefined) {
        repoProject.techSkills = repoProject.platforms.concat(localProject.techSkills).sort()
    }
    repoProject.personalSkills = localProject.personalSkills ?? []
}