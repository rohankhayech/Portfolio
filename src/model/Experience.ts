export default interface Experience {
    title: string,
    organisation: string,
    startYear: string,
    startMonth?: string
    endYear?: string
    endMonth?: string
    personalSkills?: string[]
    techSkills?: string[]
    languages?: string[]
    frameworks?: string[]
    platforms?: string[]
}