/* Copyright (c) 2023 Rohan Khayech */

import { Octokit } from 'octokit'
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import Project, { ProjectType } from "@/model/Project";
import startCase from "lodash.startcase"
import { loadJSONObject } from './fileio';
import path from 'path';

const RestOctokit = Octokit.plugin(restEndpointMethods)
const octokit = new RestOctokit({
    auth: process.env.API_TOKEN_GITHUB
})
const gh = restEndpointMethods(octokit).rest

/**
 * Collates a list of projects based on the owner's GitHub repositories.
 * @returns A list of projects based on the owner's GitHub repositories.
 */
export async function getGitHubProjects(): Promise<{
    projects: Map<string, Project>,
    langs: Map<string, number>
}> {
    // Retrieve list of repos from GitHub REST API.
    const res = await gh.repos.listForUser({
        username: "rohankhayech",
        type: "owner"
    })
    const repos = res.data

    // Load projects and frameworks
    const {allPlatforms, allFrameworks, allTechSkills} = await loadCategories()

    // Keep track of all repository languages and total bytes.
    const allLanguages: Map<string, number> = new Map()
    let totalBytes = 0;

    // Collate list of projects.
    const projects: Project[] = await Promise.all(repos
        ?.filter((repo: any) => repo.name != 'rohankhayech')
        .map(async (repo: any) => {
            const {type, platforms, frameworks, techSkills} = processRepoTopics(repo.topics, allPlatforms, allFrameworks, allTechSkills)
            
            // Process languages and update total code bytes
            const langs = await getRepoLanguages(repo.name)
            langs.forEach(l => {
                if (allLanguages.has(l[0])) {
                    allLanguages.set(l[0], allLanguages.get(l[0])!+l[1])
                } else {
                    allLanguages.set(l[0],l[1])
                }
            })
            totalBytes += langs.map(l=>l[1]).reduce((a,b)=>a+b)

            return {
                name: formatProjectName(repo.name),
                repoName: repo.name,
                desc: repo.description,
                type: type,
                url: repo.html_url,
                langs: langs.map(l=>l[0]), // Language name
                frameworks: frameworks,
                platforms: platforms,
                personalSkills: [],
                techSkills: techSkills
            }
        })
    )

    return {
        projects: new Map(projects.map(p => [p.repoName!, p])),
        // Convert language bytes to a percent of total.
        langs: new Map(Array.from(allLanguages.entries()).map(l => [l[0], (l[1] / totalBytes)*100]))
    }
}

/**
 * Formats the project name to title case.
 * @param name The repository name.
 * @returns The formatted project name in title case.
 */
function formatProjectName(name: string): string {
    return startCase(name)
}

/**
 * Retrieves the languages used in the specified repository.
 * @param name The name of the repository.
 * @returns A list of the languages used in the repository,
 */
async function getRepoLanguages(name: string): Promise<[string, number][]> {
    // Request language list from GitHub API
    const res = await gh.repos.listLanguages({
        owner: "rohankhayech",
        repo: name
    })

    // Parse and filter languages from response
    // Return map of languages and their bytes of code.
    return Object.entries(res.data)
        .filter(lang => lang[0] != 'Makefile' && lang[0] != 'Dockerfile')
        .map(lang => [capitalise(lang[0]), lang[1]!])
}

export async function getUserTagline(): Promise<string> {
    const res = await gh.users.getAuthenticated()
    return res.data.bio ?? ""
}

/**
 * Collates a pair of lists of platforms and frameworks from the repository topics.
 * @param topics List of the repository's topics.
 * @param allPlatforms Map of all recognised platforms and their display names.
 * @param allFrameworks Map of all recognised frameworks and their display names.
 * @returns A pair of lists of platforms and frameworks.
 */
function processRepoTopics(
    topics: string[], 
    allPlatforms: Map<string, string>,
    allFrameworks: Map<string, string>,
    allTechSkills: Map<string, string>
): {
    type: ProjectType, 
    platforms: string[], 
    frameworks: string[],
    techSkills: string[]
} {
    let type: ProjectType = ProjectType.OTHER
    const platforms: string[] = []
    const frameworks: string[] = []
    const techSkills: string[] = []
    topics.forEach(topic => {
        // Check types.
        switch (topic) {
            // Types
            case 'app':
            case 'application':
                type = ProjectType.APP
                break;
            case 'library':
                type = ProjectType.LIB
                break;
            case 'university':
                type = ProjectType.UNI
                break;
            default:
        }

        // Check platforms
        if (allPlatforms.has(topic)) {
            platforms.push(allPlatforms.get(topic)!)
        }

        // Check frameworks
        if (allFrameworks.has(topic)) {
            frameworks.push(allFrameworks.get(topic)!)
        }

        if (allTechSkills.has(topic)) {
            techSkills.push(allTechSkills.get(topic)!)
        }
    })

    return {type, platforms, frameworks, techSkills}
}

/**
 * Loads the platforms and frameworks and their display names from file.
 * @returns Maps of the recognised platforms and frameworks abd their display names.
 */
async function loadCategories(): Promise<{
    allPlatforms: Map<string, string>, 
    allFrameworks: Map<string, string>,
    allTechSkills: Map<string, string>
}> {
    const platforms = loadJSONObject(path.join("categories","platforms.json"))
    const frameworks = loadJSONObject(path.join("categories", "frameworks.json"))
    const techSkills = loadJSONObject(path.join("categories", "tech_skills.json"))

    return {
        allPlatforms: new Map(Object.entries(await platforms)),
        allFrameworks: new Map(Object.entries(await frameworks)),
        allTechSkills: new Map(Object.entries(await techSkills))
    }
}

/**
 * Capitalises the first letter of the specified string.
 * @param str The string to capitalise.
 * @returns The capitalised string.
 */
function capitalise(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}