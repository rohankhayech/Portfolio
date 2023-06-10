import { Chip, Stack, SxProps, Theme, Typography } from "@mui/material"
import { useMemo } from "react"
import ChipCircleIcon from "./ChipCircleIcon"

/**
 * UI component displaying the top languages and their code percentages, 
 * and the remainder of languages in a centered flow row below. 
 * @param props.langs The languages to display and their code percentages.
 * @param props.langColors Map of recognised languages and their colors.
 * @param props.maxLangs The amount of languages to display in the main chart.
 * @param props.threshold The minimum percent of code for a language to be displayed in the 
 */
export default function LanguageChart(props: {
    langs: [string, number][],
    langColors: Map<string, string>
    maxLangs?: number,
    threshold?: number,
    sx?: SxProps<Theme> 
}): JSX.Element {
    const threshold = 1

    const langs = useMemo(() => 
        props.langs
            .slice(0,props.maxLangs ?? props.langs.length)
            .filter(l => l[1] > threshold),
        [props.langs, props.maxLangs, threshold]
    )

    // Highest code percentage.
    const highest = langs[0][1]

    return (
        <Stack
            spacing={2}
            alignItems="center"
            sx={props.sx}
        >
            <Typography variant='h6'>Languages</Typography>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Stack spacing={1} sx={{ height: "100%" }}>
                    {langs.map(lang => 
                        <Stack key={lang[0]} direction="row" spacing={1.5} alignItems={"center"}>
                            <ChipCircleIcon size="small" color={props.langColors.get(lang[0])} />
                            <Typography variant="subtitle1" lineHeight={1.5}>{lang[0]}</Typography>
                        </Stack>
                    )}
                </Stack>
                <Stack spacing={1} sx={{ width: "100%" }}>
                    {langs.map(lang => {
                        const small = (lang[1] < highest / 2)
                        return <Stack key={lang[0]} direction="row" alignItems="center" spacing={1}>
                            <Chip size="small" label={!small ? `${lang[1].toFixed(1)}%`:undefined} key={lang[0]} sx={{ backgroundColor: props.langColors.get(lang[0]), width: `${lang[1] / highest * 100}%` }} />
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
                {props.langs.slice(langs.length,props.langs.length).map(lang =>
                    <Chip key={lang[0]} label={lang[0]} />
                )}
            </Stack>
        </Stack>
    )
}