/* Copyright (c) 2023 Rohan Khayech */

export default interface Project {
    name: string,
    desc: string,
    type: ProjectType
    url: string,
    platforms: string[],
    langs: string[],
    frameworks: string[]
}

export type ProjectType = "Application" | "Library" | "University Project" | "Project"