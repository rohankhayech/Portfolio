/** Copyright (c) 2023 Rohan Khayech */

import { 
  Stack, 
  Typography, 
  Grid 
} from '@mui/material'
import Header from '@/components/Header'
import Section from '@/components/Section'
import ExperienceCard from '@/components/ExperienceCard'
import { getUserTagline } from '@/data/github'
import { getAllProjects } from '@/data/projects'
import Project from '@/model/Project'
import { getCourses, getJobs } from '@/data/experiences'
import Experience from '@/model/Experience'
import ProjectsSection from '@/components/ProjectsSection'

export async function getStaticProps() {
  const projects = await getAllProjects()
  const jobs = await getJobs()
  const courses = await getCourses()
  const tagline = await getUserTagline()

  return {
    props: {
      tagline,
      projects,
      jobs,
      courses
    }
  }
}

export default function Home({tagline, projects, jobs, courses}: {tagline: string, projects: Project[], jobs: Experience[], courses: Experience[]}) {
  return (
    <main>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx = {{margin: 4}}
      >
        <Header name="Rohan Khayech" tagline={tagline} profileImgSrc="https://avatars.githubusercontent.com/rohankhayech" />
        <Section title='About Me'>
          <Typography variant="body1">
            I am a passionate software engineering graduate from Curtin University, with an interest in Java/Kotlin, Android development and user interface design.
            <br/><br/>
            Recently I have been working on a variety of software engineering projects to learn and gain experience with the latest software development frameworks, constantly improving my skills in programming and project management.
          </Typography>
        </Section>
        <ProjectsSection projects={projects}/>
        <Section title="Education">
          <Grid container>
            {courses.map(course => (
              <Grid item
                key={`c-${course.title}`}
                xs={12} md={6} xl={4}
                sx={{ paddingRight: 2, paddingBottom: 2 }}
              >
                <ExperienceCard experience={course}/>
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section title="Work Experience">
          <Grid container>
            {jobs.map(job => (
              <Grid item
                key={`j-${job.title}`}
                xs={12} md={6} xl={4}
                sx={{ paddingRight: 2, paddingBottom: 2 }}
              >
                <ExperienceCard experience={job}/>
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section title="Skills">

        </Section>
      </Stack>
    </main>
  )
}
