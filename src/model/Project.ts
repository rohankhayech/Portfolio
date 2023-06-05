/* Copyright (c) 2023 Rohan Khayech */

export default interface Project {
    name: string,
    repoName?: string,
    desc: string,
    type: ProjectType
    url?: string,
    platforms: string[],
    langs: string[],
    frameworks: string[],
    techSkills: string[],
    personalSkills: string[]
}

export interface LocalProject {
    name: string,
    repoName?: string,
    desc?: string,
    type?: ProjectType
    url?: string,
    platforms?: string[],
    langs?: string[],
    frameworks?: string[],
    techSkills?: string[],
    personalSkills?: string[]
}

export enum ProjectType {
    APP,
    LIB,
    UNI,
    OTHER,
}

export function getProjectTypeName(type: ProjectType): string {
    switch(type) {
        case ProjectType.APP: return "Application";
        case ProjectType.LIB: return "Library"
        case ProjectType.UNI: return "University Project"
        case ProjectType.OTHER: default: return "Project"
    }
}