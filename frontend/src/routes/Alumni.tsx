import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import stockManPhoto from "../assets/stockManPhoto.jpg";

async function getAlumni() {
  const url = new URL("/alumni", import.meta.env.VITE_API_ADDRESS);
  const res = await fetch(url);
  return (await res.json()) as string[];
}

const Alumni: FC = () => {
  const navigate = useNavigate();

  const {
    data: alumni,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["alumni"],
    queryFn: getAlumni,
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError || !alumni) {
    return <Alert severity="error">{error?.message ?? "Unknown Error"}</Alert>;
  }

  return (
    <>
      <Typography variant="h3" className="m-4">
        Talk to Alumni
      </Typography>
      {alumni.map((name) => (
        <Card className="m-4">
          <CardContent>
            <Box className="flex flex-row gap-4 mb-4">
              <Avatar alt="User Avatar" src={stockManPhoto} />
              <Typography variant="h4">{name}</Typography>
            </Box>
            <Button
              onClick={() => navigate(`/direct-message/${name}`)}
              variant="outlined"
            >
              Message
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Alumni;
