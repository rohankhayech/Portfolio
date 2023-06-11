import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles'

interface HeaderProps {
    name: string,
    tagline: string,
    profileImgSrc: string
}

export default function Header({name, tagline, profileImgSrc}: HeaderProps) {
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))
    const largeScreen = useMediaQuery(theme.breakpoints.up('xl'))
    const vertical = mobile || largeScreen

    return (
        <header style={{ width: "100%", paddingRight: mobile ? 32 : 0}}>
            <Stack
                direction={vertical ? "column" : "row"}
                //justifyItems={mobile ? "center" : "flex-start"}
                alignItems="center"
                spacing={4}
                marginBottom={vertical ? 2 : 0}
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
        </header>
    )
}