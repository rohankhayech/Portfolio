import Experience from "@/model/Experience";
import { loadJSONObject } from "./fileio";

export async function getJobs(): Promise<Experience[]> {
    return loadJSONObject("work_experiences.json")
}

export async function getCourses(): Promise<Experience[]> {
    return loadJSONObject("education.json")
}