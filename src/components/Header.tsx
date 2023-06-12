import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import Image from 'next/image';

interface HeaderProps {
    name: string,
    username: string,
    tagline: string,
    profileImgSrc: string,
    linkedInURL: string
}

export default function Header({name, username, tagline, profileImgSrc, linkedInURL}: HeaderProps) {
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))
    const largeScreen = useMediaQuery(theme.breakpoints.up('xl'))
    const vertical = mobile || largeScreen

    return (
        <header style={{ width: "100%", paddingRight: !largeScreen ? 32 : 0}}>
            <Stack
                direction={vertical ? "column" : "row"}
                width = "100%"
                alignItems="center"
                spacing={4}
                marginBottom={vertical ? 2 : 0}
            >
                <Stack
                    direction={vertical ? "column" : "row"}
                    width="100%"
                    alignItems="center"
                    spacing={4}
                >
                    <Avatar 
                        alt={`Picture of ${name}`} 
                        src={profileImgSrc}
                        sx={{ width: 128, height: 128 }}
                    />
                    <Stack
                        direction="column"
                        alignItems={vertical ? 'center' : "flex-start" }
                        spacing={2}
                    >
                        <Typography variant="h3" textAlign={"center"}>{name}</Typography>
                        <Typography variant="h5" textAlign={"center"}>{tagline}</Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    alignItems={vertical ? "center" : "flex-end"}
                    spacing={1}
                    paddingRight={vertical ? 0 : 1}
                >
                    <IconButton href={`https://github.com/${username}`}>
                        <picture>
                            <img width={24} height={24} src={theme.palette.mode === 'light' ? "github-mark.svg" : "github-mark-white.svg"} alt="Github Profile"/>
                        </picture>
                    </IconButton>
                    <IconButton href={linkedInURL}>
                        <picture>
                            <img style={{filter: theme.palette.mode === "light" ? "invert()" : "" }} width={24*(635/540)} height={24} src="LI-In-Bug-White.png" alt="LinkedIn Profile" />
                        </picture>
                    </IconButton>
                </Stack>
            </Stack>
        </header>
    )
}