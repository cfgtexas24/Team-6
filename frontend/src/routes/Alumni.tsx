import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Badge,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import stockManPhoto from "../assets/stockManPhoto.jpg";
import UserNavBar from "../components/UserNavBar";

// async function getAlumni() {
//   const url = new URL("/alumni", import.meta.env.VITE_API_ADDRESS);
//   const res = await fetch(url);
//   return (await res.json()) as { name: string; status: "online" | "offline" }[];
// }

async function getAlumni() {
  const dummyAlumniData = [
    { name: "John Doe", status: "online" },
    { name: "Jane Smith", status: "offline" },
    { name: "Michael Johnson", status: "online" },
    { name: "Emily Davis", status: "offline" },
  ];
  return dummyAlumniData;
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
    return (
      <>
        <UserNavBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (isError || !alumni) {
    return (
      <>
        <UserNavBar />
        <Box sx={{ p: 4 }}>
          <Alert severity="error">{error?.message ?? "Unknown Error"}</Alert>
        </Box>
      </>
    );
  }

  return (
    <>
      <UserNavBar />
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#333",
            textAlign: "center",
          }}
        >
          Talk to Alumni
        </Typography>

        {/* Alumni List */}
        <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: "1fr 1fr" }}>
          {alumni.map(({ name, status }) => (
            <Card
              key={name}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "12px",
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  {/* Online/Offline Badge */}
                  <Badge
                    overlap="circular"
                    variant="dot"
                    sx={{
                      "& .MuiBadge-dot": {
                        backgroundColor:
                          status === "online" ? "#44b700" : "#888",
                        color: status === "online" ? "#44b700" : "#888",
                        boxShadow: `0 0 0 2px white`,
                      },
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      alt={`${name} Avatar`}
                      src={stockManPhoto}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  </Badge>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {name}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#FEC10E",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#E0A90C",
                    },
                  }}
                  onClick={() => navigate(`/direct-message/${name}`)}
                >
                  Message
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Alumni;
