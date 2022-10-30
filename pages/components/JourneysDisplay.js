import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography,
  Collapse,
} from '@mui/material';
import { useState } from 'react';

const Journey = ({ date, periodStart, periodEnd, origin, destination }) => {
  const [expanded, setExpanded] = useState(false);

  const onExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CardActionArea onClick={onExpand}>
        <CardHeader
          title={`${origin} > ${destination}`}
          subheader={`${date} from ${periodStart} to ${periodEnd}`}
        />
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon /> */}
        {/* </ExpandMore> */}
        <Collapse in={expanded}>
          <CardContent>TOTO TOTO</CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  );
};

export default function ({ journeys = [] }) {
  const display = (journey) => {
    return <Journey {...journey} />;
  };
  return <div>{journeys.map(display)}</div>;
}
