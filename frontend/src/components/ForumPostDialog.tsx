import { FC, FormEvent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DialogActions, FormControl, TextField, Button } from "@mui/material";
import { getUserId } from "../util/authentication";

const ForumPostDialog: FC<{
  open: boolean;
  onClose: (json?: Record<string, unknown>) => void;
}> = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => onClose()}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        maxWidth="lg"
        PaperProps={{
          component: "form",
          onSubmit: (ev: FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            const formData = new FormData(ev.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const userId = getUserId();
            if (!userId) return;
            formJson["username"] = userId;
            onClose(formJson);
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">Create new post</DialogTitle>
        <DialogContent>
          <br />
          <FormControl fullWidth className="p-4 m-4">
            <TextField name="title" label="Title" fullWidth />
          </FormControl>
          <FormControl fullWidth className="m-4">
            <TextField
              name="content"
              multiline
              label="Content"
              fullWidth
              minRows={8}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit" variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ForumPostDialog;
