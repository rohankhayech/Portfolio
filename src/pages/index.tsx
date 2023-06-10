/** Copyright (c) 2023 Rohan Khayech */

import { 
  Stack, 
  Typography, 
  Grid, 
  Alert,
  Link,
  AlertTitle,
  useTheme,
  useMediaQuery
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
import { aggregateSkills } from '@/data/skills'
import SkillsGroup from '@/components/SkillsGroup'
import { useMemo } from 'react'
import { getLanguageColors } from '@/data/langs'
import ChipCircleIcon from '@/components/ChipCircleIcon'
import Head from 'next/head'
import LanguageChart from '@/components/LanguageChart'

export async function getStaticProps() {
  let {projects, topLangs} = await getAllProjects()
  const jobs = await getJobs()
  const courses = await getCourses()
  const tagline = await getUserTagline()
  const topLangsList = Array.from(topLangs.entries()).sort((l1,l2)=>l2[1]-l1[1])
  const {personalSkills, techSkills, langs, frameworks, platforms} = aggregateSkills(topLangsList, projects, courses, jobs)
  const langColors = await getLanguageColors(langs)

  return {
    props: {
      tagline,
      projects,
      jobs,
      courses,
      personalSkills,
      techSkills,
      langs,
      topLangs: topLangsList,
      langColorsList: Array.from(langColors.entries()),
      frameworks,
      platforms
    }
  }
}

export default function Home({tagline, projects, jobs, courses, personalSkills, techSkills, langs, topLangs, langColorsList, frameworks, platforms}: {
  tagline: string, 
  projects: Project[], 
  jobs: Experience[], 
  courses: Experience[],
  personalSkills: string[],
  techSkills: string[],
  langs: string[],
  topLangs: [string, number][],
  langColorsList: [string, string][],
  frameworks: string[],
  platforms: string[]
}) {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('xl'))
  
  const tech = useMemo(() => 
    techSkills.concat(platforms.map(p=>`${p} Development`)), 
    [techSkills, platforms]
  )

  const langColors = useMemo(() => new Map(langColorsList), [langColorsList])
  return <>
    <Head>
      <title>{`Portfolio | Rohan Khayech - ${tagline}`}</title>
    </Head>
    <main>
      <Stack
        direction="column"
        spacing={4}
        sx = {{
          marginX: largeScreen ? 8 : 4,
          marginY: 4
        }}
      >
        <Alert severity="warning" sx={{width: "100%"}}>
          <AlertTitle>Work in Progress</AlertTitle>
          I&apos;m currently building this website to learn <em>React</em>, <em>Next.js</em> and web development best practices. 
          <br/>
          <strong> Please see my <Link href="https://github.com/rohankhayech">GitHub</Link> and <Link href="https://www.linkedin.com/in/rohan-khayech-356b01228/">LinkedIn</Link> profiles for my up-to-date portfolio and contact information.</strong>
        </Alert>
        <Stack direction={largeScreen ? "row" : "column"} spacing={largeScreen ? 8 : 3}>
          <Stack
            spacing={3}
            sx={{
              marginTop: largeScreen ? 4 : 0,
              width: largeScreen ? "25%" : "auto"
            }}
          >
            <Header name="Rohan Khayech" tagline={tagline} profileImgSrc="https://avatars.githubusercontent.com/rohankhayech" />
            <Section title='About Me'>
              <Typography variant="body1">
                I am a passionate software engineering graduate from Curtin University, with an interest in Java/Kotlin, Android development and user interface design.
                <br/><br/>
                Recently I have been working on a variety of software engineering projects to learn and gain experience with the latest software development frameworks, constantly improving my skills in programming and project management.
              </Typography>
            </Section>
          </Stack>
          <Stack
            spacing={2}
            sx={{
              marginTop: largeScreen ? 8 : 0,
              width: largeScreen ? "75%" : "auto"
            }}
          >
            <ProjectsSection projects={projects} langColors={langColors}/>
            <Section title="Education">
              <Grid container>
                {courses.map(course => (
                  <Grid item
                    key={`c-${course.title}`}
                    xs={12} md={6} xl={4}
                    sx={{ paddingRight: 2, paddingBottom: 2 }}
                  >
                    <ExperienceCard experience={course} icon="school"/>
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
                    <ExperienceCard experience={job} icon="apartment"/>
                  </Grid>
                ))}
              </Grid>
            </Section>
            <Section title="Skills">
              <Stack direction={mobile ? "column" : "row"} spacing={4} paddingBottom={2}>
                <LanguageChart langs={topLangs} sx={{ width: "100%" }} />
                <SkillsGroup title="Frameworks" skills={frameworks} />
                <SkillsGroup title="Technical Skills" skills={tech} />
                <SkillsGroup title="Interpersonal Skills" skills={personalSkills} />
              </Stack>
            </Section>
          </Stack>
        </Stack>
        <Typography alignSelf={'center'} variant='caption'>Copyright © {(new Date()).getFullYear()} Rohan Khayech</Typography>
      </Stack>
    </main>
  </>
}
