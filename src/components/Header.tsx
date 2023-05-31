import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface HeaderProps {
    name: string,
    tagline: string,
    profileImgSrc: string
}

export default function Header({name, tagline, profileImgSrc}: HeaderProps) {
    return (
        <header>
            <Stack
                direction="row"
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
                    justifyItems="center"
                    spacing={1}
                >
                    <Typography variant="h2">{name}</Typography>
                    <Typography variant="h5">{tagline}</Typography>
                </Stack>
            </Stack>
        </header>
    )
}