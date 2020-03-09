import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function DataBlock(props) {


    return (
        <span style={{ display: "inline-block", minWidth: "280px", textAlign: "center", marginBottom: "10px" }} >
            <span style={{ display: "inline-block" }}>
                <Typography color='textSecondary' variant="subtitle2">
                    {props.description}
                </Typography>
                <Typography color='secondary' variant="h4">
                    {props.data}
                </Typography>
                <Typography color='textSecondary' variant="caption">
                    {props.info}
                </Typography>
            </span>
        </span>
    )
}