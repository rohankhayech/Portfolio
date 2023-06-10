import Experience from "@/model/Experience";
import Project from "@/model/Project";

/**
 * Aggregates skills from the specified projects and experiences.
 * @param projects List of projects.
 * @param courses List of courses.
 * @param jobs List of jobs.
 * @returns A categorised list of skills.
 */
export function aggregateSkills(
    topLangs: [string, number][],
    projects: Project[], 
    courses: Experience[], 
    jobs: Experience[]
): {
    personalSkills: string[],
    techSkills: string[],
    langs: [string, number][],
    frameworks: string[],
    platforms: string[]
} {
    const projectLangs = topLangs

    // Combine all projects and experiences into an array.
    const all = [projects, courses, jobs].flat()

    // Combine each category of skills.
    const personalSkills = combineSkills(all, x => x.personalSkills)
    const techSkills = combineSkills(all, x => x.techSkills)
    const frameworks = combineSkills(all, x => x.frameworks)
    const platforms = combineSkills(all, x => x.platforms)

    // Combine all languages from experiences.
    const expLangs = combineSkills(all, x => x.langs)
        .filter(l => !projectLangs.some(pl => pl[0] === l)) // Remove duplicate languages included in project language list.
        .map<[string, number]>(l => [l, 0]) // Convert to pair. 
    
    // Combine with sorted project list first to preserve order.
    const langs = [projectLangs, expLangs].flat()

    return {
        personalSkills: personalSkills,
        techSkills: techSkills,
        langs: langs,
        frameworks: frameworks,
        platforms: platforms
    }
}

/**
 * Extracts the skill category list from all projects and experiences,
 * flattens into a single array and removes any duplicates.
 * @param all List of all projects and experiences.
 * @param category Function used to extract the skill category list.
 * @returns A combined list of all the unique skills of the specified category.
 */
function combineSkills(
    all: (Project | Experience)[], 
    category: (entry: Project | Experience) => string[] | undefined
) {
    return all.map(x => category(x) ?? []) // Extract skill category list from each entry.
        .flat(2) // Flatten into a single list.
        .filter(unique) // Remove duplicates
}

/**
 * Function used to filter for only unique items in an array.
 * @param x The item in the array to check.
 * @param i The index of the item in the array.
 * @param a The array to check for duplicates.
 * @returns True if the item is the first occurance in the array, false otherwise.
 */
function unique<T>(x: T, i: number, a: T[]) {
    return a.indexOf(x) === i
}