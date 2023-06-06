import { Chip, Grid, Stack, SxProps, Theme, Typography } from "@mui/material"
import { useMemo } from "react"

export default function LanguageChart(props: {
    langs: [string, number][],
    maxLangs?: number,
    threshold?: number,
    sx?: SxProps<Theme> 
}): JSX.Element {
    const maxLangs = props.maxLangs ?? 6
    const threshold = 1

    const langs = useMemo(() => 
        props.langs
            .slice(0,maxLangs)
            .filter(l => l[1] > threshold),
        [props.langs, maxLangs, threshold]
    )

    const highest = langs[0][1]

    return (
        <Stack
            spacing={2}
            alignItems="center"
            sx={props.sx}
        >
            <Typography variant='h6'>Languages</Typography>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Stack spacing ={1.5} sx={{ height: "100%" }} >
                    {langs.map(lang => (
                        <Typography variant="subtitle1">{lang[0]}</Typography>
                    ))}
                </Stack>
                <Stack spacing={1} sx={{ width: "100%" }}>
                    {langs.map(lang => {
                        const small = (lang[1] < highest / 2)
                        return <Stack direction="row" alignItems="center" spacing={1}>
                            <Chip label={!small ? `${lang[1].toFixed(1)}%`:undefined} key={`lg-chart-${lang[0]}`} sx={{ width: `${lang[1] / highest * 100}%` }} />
                            {small &&
                                <Typography variant="caption">{`${lang[1].toFixed(1)}%`}</Typography>
                            }
                        </Stack>
                })}
                </Stack>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
            >
                {props.langs.slice(maxLangs,props.langs.length).map(lang =>
                    <Chip key={`lg-${lang[0]}`} label={lang[0]} />
                )}
            </Stack>
        </Stack>
    )
}