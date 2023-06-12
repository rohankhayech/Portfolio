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
import { getUserInfo } from '@/data/github'
import { getAllProjects } from '@/data/projects'
import Project from '@/model/Project'
import { getCourses, getJobs } from '@/data/experiences'
import Experience from '@/model/Experience'
import ProjectsSection from '@/components/ProjectsSection'
import { aggregateSkills } from '@/data/skills'
import SkillsGroup from '@/components/SkillsGroup'
import { useMemo } from 'react'
import { getLanguageColors } from '@/data/langs'
import Head from 'next/head'
import LanguageChart from '@/components/LanguageChart'
import loadConfig from '@/data/config'

export async function getStaticProps() {
  // Load config
  const config = await loadConfig()
  
  // Fetch data
  const profile = await getUserInfo()
  const {projects, topLangs} = await getAllProjects(profile.username, config.excludedLanguages)
  const jobs = await getJobs()
  const courses = await getCourses()
  const topLangsList = Array.from(topLangs.entries()).sort((l1,l2)=>l2[1]-l1[1])
  
  // Aggregate skills
  const {
    personalSkills, 
    techSkills, 
    langs,
    frameworks, 
    platforms
  } = aggregateSkills(
    topLangsList, 
    projects, 
    courses, 
    jobs
  )

  // Fetch language colors
  const langColors = getLanguageColors(langs.map(l => l[0]))

  return {
    props: {
      config,
      profile,
      projects,
      jobs,
      courses,
      personalSkills,
      techSkills,
      langs,
      langColorsList: Array.from((await langColors).entries()),
      frameworks,
      platforms
    }
  }
}

export default function Home({config, profile, projects, jobs, courses, personalSkills, techSkills, langs, langColorsList, frameworks, platforms}: {
  config: Config,
  profile: Profile,
  projects: Project[], 
  jobs: Experience[], 
  courses: Experience[],
  personalSkills: string[],
  techSkills: string[],
  langs: [string,number][],
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
      <title>{`Portfolio | ${profile.displayName} - ${profile.tagline}`}</title>
    </Head>
    <main>
      <Stack
        direction="column"
        spacing={4}
        sx = {{
          marginLeft: largeScreen ? 8 : 4,
          marginRight: largeScreen ? 4 : 0,
          marginY: 4
        }}
      >
        <Alert severity="warning" sx={{marginRight: 4}}>
          <AlertTitle>Work in Progress</AlertTitle>
          I&apos;m currently building this website to learn <em>React</em>, <em>Next.js</em> and web development best practices. 
          <br/>
          <strong> Please see my <Link href={`https://github.com/${profile.username}`}>GitHub</Link> and <Link href={config.linkedInURL}>LinkedIn</Link> profiles for my up-to-date portfolio and contact information.</strong>
        </Alert>
        <Stack direction={largeScreen ? "row" : "column"} spacing={largeScreen ? 8 : 3}>
          <Stack
            spacing={3}
            sx={{
              marginTop: largeScreen ? 4 : 0,
              width: largeScreen ? "25%" : "auto"
            }}
          >
            <Header 
              name={profile.displayName} 
              username={profile.username} 
              tagline={profile.tagline} 
              profileImgSrc={`https://avatars.githubusercontent.com/${profile.username}`} 
              linkedInURL={config.linkedInURL}
            />
            <Section title='About Me'>
              <Typography variant="body1" paddingRight={largeScreen ? 0 : 4}>
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
            <Section title="Education" sx={{marginRight: 2}}>
              <Grid container>
                {courses.map(course => (
                  <Grid item
                    key={course.title}
                    xs={12} md={6} xl={4}
                    sx={{ paddingRight: 2, paddingBottom: 2 }}
                  >
                    <ExperienceCard experience={course} icon="school"/>
                  </Grid>
                ))}
              </Grid>
            </Section>
            <Section title="Work Experience" sx={{ marginRight: 2 }}>
              <Grid container>
                {jobs.map(job => (
                  <Grid item
                    key={job.title}
                    xs={12} md={6} xl={4}
                    sx={{ paddingRight: 2, paddingBottom: 2 }}
                  >
                    <ExperienceCard experience={job} icon="apartment"/>
                  </Grid>
                ))}
              </Grid>
            </Section>
            <Section title="Skills">
              <Grid container>
                <Grid item xs={12} sm={6} lg={3} sx={{ paddingRight: 4, paddingBottom: 4 }}>
                    <LanguageChart langs={langs} langColors={langColors} sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} sx={{ paddingRight: 4, paddingBottom: 4 }}>
                    <SkillsGroup title="Technology Experience" skills={frameworks} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} sx={{ paddingRight: 4, paddingBottom: 4 }}>
                    <SkillsGroup title="Technical Skills" skills={tech} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} sx={{ paddingRight: 4, paddingBottom: 4 }}>
                    <SkillsGroup title="Interpersonal Skills" skills={personalSkills} />
                </Grid>
              </Grid>
            </Section>
          </Stack>
        </Stack>
        <Typography alignSelf={'center'} variant='caption' paddingRight={4}>Copyright © {(new Date()).getFullYear()} {profile.displayName}</Typography>
      </Stack>
    </main>
  </>
}
