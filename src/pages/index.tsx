import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Stack from '@mui/material/Stack'
import Section from '@/components/Section'
import Project from '@/components/Project'
import Typography from '@mui/material/Typography'

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
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{flexWrap:"wrap"}}
          >
            <Project 
              name="ATel Lookup" 
              desc="Powerful web-based search interface for intelligently querying and visualising reports from The Astronomer's Telegram." 
              langs={["Python", "Typescript"]}
              frameworks={["Flask", "Angular", "Docker"]}
              platforms={["Web"]}
            />
            <Project 
              name="Choona" 
              desc="Guitar tuner app for Android with support for custom tunings."
              langs={["Kotlin", "Java"]}
              frameworks={["Jetpack Compose"]}
              platforms={["Android"]}
            />
          </Stack>
        </Section>
        <Section title="Education"></Section>
        <Section title="Work Experience"></Section>
        <Section title="Skills"></Section>
      </Stack>
    </main>
  )
}
