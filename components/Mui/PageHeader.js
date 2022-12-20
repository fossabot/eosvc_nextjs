import { Card, Paper, Typography } from "@mui/material";

export default function PageHeader(props) {
  const { title, subTittle, icon } = props;
  return (
    <Paper elevation={0} square className="">
      <div className="flex flex-row gap-5 px-2 pb-5 justify-start items-center w-full border rounded-b-md mx-auto">
        <Card className="ml-5 p-2 text-blue-900 ">{icon}</Card>
        <div>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTittle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
