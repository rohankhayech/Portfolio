export default interface Project {
    name: string,
    desc: string,
    type: ProjectType
    url: string,
    platforms: string[],
    langs: string[],
    frameworks: string[]
}

export type ProjectType = "app" | "lib" | "uni" | "other"