export default interface Project {
    name: string,
    desc: string,
    url: string,
    platforms?: string[],
    langs?: string[],
    frameworks?: string[]
}