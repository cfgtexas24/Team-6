import { FC, FormEventHandler, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";

const ResumeReview: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    setIsLoading(true);
    setResponseText("");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.has("resume")) return;
    const url = new URL("/", import.meta.env.VITE_RESUME_ADDRESS);
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!res.ok || !res.body) {
      setError("Failed to parse resume");
      setIsLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsLoading(false);
        return;
      }

      setResponseText((prev) => prev + decoder.decode(value));
    }
  };

  return (
    <>
      <UserNavBar />
      {isLoading && <LinearProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h3" className="text-center mt-16">
        Resume Review
      </Typography>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <Box className="flex flex-row gap-4 w-full justify-center mt-16">
          <Button component="label">
            Choose File
            <input type="file" hidden name="resume" disabled={isLoading} />
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Upload
          </Button>
        </Box>
      </form>
      {responseText.length > 0 && (
        <textarea
          readOnly
          className="w-full h-[50vh] resize-none mt-16 text-lg"
          value={responseText}
        />
      )}
    </>
  );
};

export default ResumeReview;
