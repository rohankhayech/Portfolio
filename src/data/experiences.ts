import Experience from "@/model/Experience";
import { loadJSONObject } from "./fileio";
import path from "path";

export async function getJobs(): Promise<Experience[]> {
    return loadJSONObject(path.join("info", "work_experiences.json"))
}

export async function getCourses(): Promise<Experience[]> {
    return loadJSONObject(path.join("info", "education.json"))
}