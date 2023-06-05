
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";

interface SectionProps {
    title: string
}

export default function Section({title, children} : PropsWithChildren<SectionProps>) {
    return (
        <section id={title.toLowerCase().replace(" ", "-")} style={{width: "100%"}}>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography variant="h5">{title}</Typography>
                {children}
            </Stack>
        </section>
    )
}