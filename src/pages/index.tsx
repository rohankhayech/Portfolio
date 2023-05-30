import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Stack from '@mui/material/Stack'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import Typography from '@mui/material/Typography'
import ExperienceCard from '@/components/ExperienceCard'
import { getGitHubProjects } from '@/data/projects'
import Project from '@/model/Project'
import { Grid } from '@mui/material'
import { getCourses, getJobs } from '@/data/experiences'
import Experience from '@/model/Experience'
import { useState } from 'react'
import ProjectsSection from '@/components/ProjectsSection'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {

  const projects = await getGitHubProjects()
  const jobs = await getJobs()
  const courses = await getCourses()

  return {
    props: {
      projects,
      jobs,
      courses
    }
  }
}

export default function Home({projects, jobs, courses}: {projects: Project[], jobs: Experience[], courses: Experience[]}) {
  return (
    <main>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx = {{margin: 4}}
      >
        <Header name="Rohan Khayech" profileImgSrc="profile.jpg" />
        <Section title='About Me'>
          <Typography variant="body1">
            I am a passionate software engineering graduate from Curtin University, with an interest in Java/Kotlin, Android development and user interface design.
            <br/><br/>
            Recently I have been working on a variety of software engineering projects to learn and gain experience with the latest software development frameworks, constantly improving my skills in programming and project management.
          </Typography>
        </Section>
        <ProjectsSection projects={projects}/>
        <Section title="Education">
          <Grid container
            columns={{ sm: 4, md: 8, lg: 12 }}
          >
            {courses.map(course => (
              <Grid item
                key={`c-${course.title}`}
                sm={4} md={4} lg={4}
                sx={{ paddingRight: 2, paddingBottom: 2 }}
              >
                <ExperienceCard
                  title={course.title}
                  organisation={course.organisation}
                  startYear={course.startYear}
                  endYear={course.endYear}
                  skills={course.skills}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section title="Work Experience">
          <Grid container
            columns={{ sm: 4, md: 8, lg: 12 }}
          >
            {jobs.map(job => (
              <Grid item
                key={`c-${job.title}`}
                sm={4} md={4} lg={4}
                sx={{ paddingRight: 2, paddingBottom: 2 }}
              >
                <ExperienceCard
                  title={job.title}
                  organisation={job.organisation}
                  startYear={job.startYear}
                  endYear={job.endYear}
                  skills={job.skills}
                />
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
