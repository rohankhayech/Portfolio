import Experience from "@/model/Experience";

export async function getJobs(): Promise<Experience[]> {
    return [
        {
            title: "Bar Staff",
            organisation: 'Indian Ocean Hotel',
            startYear: '2021',
            startMonth: 'Dec',
            skills: ["Teamwork", "Communication"]
        },
        {
            title: "Administrative Assistant",
            organisation: 'MPA Skills',
            startYear: '2019',
            startMonth: 'Jan',
            endYear: '2021',
            endMonth: 'Dec',
            skills: ["Teamwork", "Communication", "Microsoft Excel"],
        }
    ]
}

export async function getCourses(): Promise<Experience[]> {
    return [
        {
            title:"Graduate Diploma in Professional Engineering (Electrical Engineering)",
            organisation:'Curtin University',
            startYear:'2022',
            endYear:'2022',
            skills: ["Teamwork", "Communication"]
        },
        {
            title: "Bachelor of Science (Computing) with Distinction",
            organisation: 'Curtin University',
            startYear: '2019',
            endYear: '2021',
            skills: ["Java", "Git", "Algorithms"],
        },
        {
            title: "WACE",
            organisation: 'Shenton College',
            startYear: '2014',
            endYear: '2018',
            skills: ["Algorithms", "Data Structures", "Python"]
        }
    ]
}