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
    projects: Project[], 
    courses: Experience[], 
    jobs: Experience[]
): {
    personalSkills: string[],
    techSkills: string[],
    langs: string[],
    frameworks: string[],
    platforms: string[]
} {
    const all = [projects, courses, jobs].flat()
    const personalSkills = all.map(x=>x.personalSkills ?? []).flat(2)
    const techSkills = all.map(x => x.techSkills ?? []).flat(2)
    const langs = all.map(x => x.langs ?? []).flat(2)
    const frameworks = all.map(x => x.frameworks ?? []).flat(2)
    const platforms = all.map(x => x.platforms ?? []).flat(2)

    return {
        personalSkills: Array.from((new Set(personalSkills)).values()),
        techSkills: Array.from((new Set(techSkills)).values()),
        langs: Array.from((new Set(langs)).values()),
        frameworks: Array.from((new Set(frameworks)).values()),
        platforms: Array.from((new Set(platforms)).values())
    }
}