import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface HeaderProps {
    name: string,
    profileImgSrc: string
}

export default function Header({name, profileImgSrc}: HeaderProps) {
    return (
        <header>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
            >
                <Avatar 
                    alt={`Picture of ${name}`} 
                    src={profileImgSrc}
                    sx={{ width: 128, height: 128 }}
                />
                <Typography variant="h2">{name}</Typography>
            </Stack>
        </header>
    )
}