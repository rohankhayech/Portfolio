/* Copyright (c) 2023 Rohan Khayech */

import { Octokit } from 'octokit'
import { RestEndpointMethodTypes, restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import Project, { ProjectType } from "@/model/Project";
import startCase from "lodash.startcase"

const RestOctokit = Octokit.plugin(restEndpointMethods)
const octokit = new RestOctokit({
    auth: process.env.GITHUB_TOKEN
})
const gh = restEndpointMethods(octokit).rest

/**
 * Collates a list of projects based on the owner's GitHub repositories.
 * @returns A list of projects based on the owner's GitHub repositories.
 */
export async function getGitHubProjects(): Promise<Project[]> {
    // Retrieve list of repos from GitHub REST API.
    const res = await gh.repos.listForUser({
        username: "rohankhayech",
        type: "owner"
    })
    const repos = res.data

    // Collate list of projects.
    return (await Promise.all(repos
        ?.filter((repo: any) => repo.name != 'rohankhayech')
        .map(async (repo: any) => {
            const {type, platforms, frameworks} = processRepoTopics(repo.topics)
            return {
                name: formatProjectName(repo.name),
                desc: repo.description,
                type: type,
                url: repo.html_url,
                langs: await getRepoLanguages(repo.name),
                frameworks: frameworks,
                platforms: platforms
            }
        })
    )).sort((p1, p2) => { // Sort in app, lib, uni, other order.
        if (p1.type === p2.type) { return 0 } 
        else if (p1.type === 'app' || (p1.type === 'lib' && p2.type !== 'app')) { return -1 }
        else return 1;
    })
}

/**
 * Formats the project name to title case, with support for custom exceptions.
 * @param name The repository name.
 * @returns The formatted project name in title case.
 */
function formatProjectName(name: string): string {
    switch (name) {
        case "ATel-Lookup":
            return "ATel Lookup"
        case "MNK-TicTacToe":
            return "MNK Tic-Tac-Toe"
        case "LiftSim":
            return "Lift Simulator"
        default:
            return startCase(name)
    }
}

/**
 * Retrieves the languages used in the specified repository.
 * @param name The name of the repository.
 * @returns A list of the languages used in the repository,
 */
async function getRepoLanguages(name: string): Promise<string[]> {
    const res = await gh.repos.listLanguages({
        owner: "rohankhayech",
        repo: name
    })
    const langs = res.data
    return Object.keys(langs)
        .filter(lang => lang != 'Makefile' && lang != 'Dockerfile')
        .map(lang => capitalise(lang))
}

export async function getUserTagline(): Promise<string> {
    const res = await gh.users.getAuthenticated()
    return res.data.bio
}

/**
 * Collates a pair of lists of platforms and frameworks from the repository topics.
 * @param topics List of the repository's topics.
 * @returns A pair of lists of platforms and frameworks.
 */
function processRepoTopics(topics: string[]): {type: ProjectType, platforms: string[], frameworks: string[]} {
    let type: ProjectType = "other"
    const platforms: string[] = []
    const frameworks: string[] = []
    topics.forEach(topic => {
        switch (topic) {
            // Types
            case 'app':
            case 'application':
                type = "app"
                break;
            case 'library':
                type = "lib"
                break;
            case 'university':
                type = "uni"
                break;
            // Platforms
            case 'web': 
            case 'web-application':
                platforms.push("Web")
                break;
            case 'android':
                platforms.push("Android")
                break;
            case 'ios':
                platforms.push("iOS")
                break;
            case 'desktop':
                platforms.push("Desktop")
                break;
            case 'windows':
                platforms.push("windows")
                break;
            case 'macos':
            case 'mac':
                platforms.push("macos")
                break;
            case 'linux':
                platforms.push("Linux")
                break;
            // Frameworks
            case 'flask':
                frameworks.push("Flask")
                break;
            case 'mysql':
                frameworks.push("MySQL")
                break;
            case 'angular':
                frameworks.push("Angular")
                break;
            case 'docker':
                frameworks.push("Docker")
                break;
            case 'jetpack-compose':
                frameworks.push("Jetpack Compose")
                break;
            case 'react':
            case 'reactjs':
                frameworks.push("React")
                break;
            case 'nextjs':
                frameworks.push("Next.js")
                break;
            case 'mui':
                frameworks.push("MUI")
                break;
            case 'javafx':
                frameworks.push("JavaFX")
                break;
            default:
        }
    })
    return {type, platforms, frameworks}
}

/**
 * Capitalises the first letter of the specified string.
 * @param str The string to capitalise.
 * @returns The capitalised string.
 */
function capitalise(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}