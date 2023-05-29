import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Stack from '@mui/material/Stack'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import Typography from '@mui/material/Typography'
import ExperienceCard from '@/components/ExperienceCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
        <Section title='Software Portfolio'>
          <Stack
            direction="row"
            spacing={2}
            sx={{flexWrap:"wrap"}}
          >
            <ProjectCard 
              name="ATel Lookup" 
              desc="Powerful web-based search interface for intelligently querying and visualising reports from The Astronomer's Telegram." 
              langs={["Python", "Typescript"]}
              frameworks={["Flask", "Angular", "Docker"]}
              platforms={["Web"]}
            />
            <ProjectCard 
              name="Choona" 
              desc="Guitar tuner app for Android with support for custom tunings."
              langs={["Kotlin", "Java"]}
              frameworks={["Jetpack Compose"]}
              platforms={["Android"]}
            />
          </Stack>
        </Section>
        <Section title="Education">
          <Stack
            direction="column"
            spacing={2}
          >
            <ExperienceCard
              title="Graduate Diploma in Professional Engineering (Electrical Engineering)"
              organisation='Curtin University'
              startYear='2022'
              endYear='2022'
              skills={["Teamwork", "Communication"]}
            />
            <ExperienceCard
              title="Bachelor of Science (Computing) with Distinction"
              organisation='Curtin University'
              startYear='2019'
              endYear='2021'
              skills={["Java", "Git", "Algorithms"]}
            />
            <ExperienceCard
              title="WACE"
              organisation='Shenton College'
              startYear='2014'
              endYear='2018'
              skills={["Algorithms", "Data Structures", "Python"]}
            />
          </Stack>
        </Section>
        <Section title="Work Experience">
          <ExperienceCard
            title="Bar Staff"
            organisation='Indian Ocean Hotel'
            startYear='2021'
            startMonth='Dec'
            skills={["Teamwork", "Communication"]}
          />
          <ExperienceCard
            title="Administrative Assistant"
            organisation='MPA Skills'
            startYear='2019'
            startMonth='Jan'
            endYear='2021'
            endMonth='Dec'
            skills={["Teamwork", "Communication", "Microsoft Excel"]}
          />
        </Section>
        <Section title="Skills">

        </Section>
      </Stack>
    </main>
  )
}