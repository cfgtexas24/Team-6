import {
  Box,
  Card,
  CardContent,
  Divider,
  Fab,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import MessageIcon from "@mui/icons-material/Message";
import UserNavBar from "../components/UserNavBar";
import AddIcon from "@mui/icons-material/Add";
import ForumPostDialog from "../components/ForumPostDialog";
import { ForumCategory } from "../util/types";
import { queryClient } from "../util/queryclient";
import { getUserId } from "../util/authentication";

type Post = {
  id: string;
  username: string;
  title: string;
  created_at: string;
  content: string;
};

type Comment = {
  comment: string;
  created_at: string; // BUG: Actually is username
  id: number;
  post_id: string; // BUG: Is actually timestamp
  username: number; // BUG: Is actually post id
};

async function getPosts() {
  const url = new URL("/post", import.meta.env.VITE_API_ADDRESS);
  const res = await fetch(url);
  const data = await res.json();
  return data as Post[];
}

async function newPost(json: Record<string, unknown>) {
  const url = new URL("/post", import.meta.env.VITE_API_ADDRESS);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(res.statusText);
  queryClient.invalidateQueries({ queryKey: ["posts"] });
  return await res.json();
}

async function getComments() {
  const url = new URL("/comments", import.meta.env.VITE_API_ADDRESS);
  const res = await fetch(url);
  const data = await res.json();
  return data as Comment[];
}

const Post: FC<{
  post: Post;
  category: ForumCategory;
  openMessage: (userId: string) => void;
}> = ({ post, category, openMessage }) => {
  return (
    <Card sx={{ mb: 2, borderRadius: "12px", boxShadow: 1 }}>
      <CardContent>
        <Link
          to={`/community-forums/${category}/${post.id}`}
          className="no-underline hover:underline"
          style={{ color: "#333" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {post.title}
          </Typography>
        </Link>
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", alignItems: "center", color: "#666" }}
        >
          {post.username}
          <IconButton onClick={() => openMessage(post.username)} sx={{ ml: 1 }}>
            <MessageIcon fontSize="small" />
          </IconButton>
        </Typography>
        <Typography variant="caption">{post.created_at}</Typography>
      </CardContent>
    </Card>
  );
};

async function newComment(json: Comment) {
  const url = new URL("/comments", import.meta.env.VITE_API_ADDRESS);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(res.statusText);
  queryClient.invalidateQueries({ queryKey: ["comments"] });
  return await res.json();
}

const CommentInput: FC<{ postId: number }> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card sx={{ mb: 2, borderRadius: "12px", boxShadow: 1 }}>
      <CardContent>
        {isLoading && <LinearProgress />}
        <Typography variant="h6" className="mb-2">
          New Comment
        </Typography>
        <FormControl fullWidth>
          <TextField
            name="comment"
            label="Comment"
            disabled={isLoading}
            fullWidth
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
          />
        </FormControl>
        <Button
          className="mt-4"
          disabled={isLoading}
          variant="outlined"
          onClick={() => {
            setIsLoading(true);
            newComment({
              comment,
              created_at: getUserId()!,
              id: Date.now(),
              post_id: new Date().toUTCString(),
              username: postId,
            }).finally(() => {
              setIsLoading(false);
            });
          }}
        >
          Post
        </Button>
      </CardContent>
    </Card>
  );
};

const Forum: FC = () => {
  const { isLoading: arePostsLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const { isLoading: areCommentsLoading, data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const isLoading = arePostsLoading || areCommentsLoading;

  const params = useParams<{ category: ForumCategory; post: string }>();
  const category = params.category ?? ForumCategory.All;

  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading || !posts) {
    return (
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
    );
  }

  // This is stupid and bad but I am tired
  const filteredPosts = posts.filter(
    (p) =>
      category === ForumCategory.All ||
      (p.title + p.content).toLowerCase().includes(category.toLowerCase()),
  );
  const openedPost = posts.find((p) => p.id.toString() === params.post);
  const openedPostComments = (comments ?? []).filter(
    (c) => c.username.toString() === openedPost?.id.toString(),
  );

  const body = openedPost ? (
    <>
      <Box sx={{ mb: 2 }}>
        <IconButton onClick={() => navigate(`/community-forums/${category}`)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Post
        category={category}
        post={openedPost}
        openMessage={(id) => navigate(`/direct-message/${id}`)}
      />
      <Divider sx={{ my: 2 }} />
      {openedPostComments.map((comment) => (
        <Card
          key={comment.id}
          sx={{ mb: 2, borderRadius: "12px", boxShadow: 1 }}
        >
          <CardContent>
            <Typography variant="body1">{comment.comment}</Typography>
            <Typography variant="caption">{comment.created_at}</Typography>
          </CardContent>
        </Card>
      ))}
      <CommentInput postId={parseInt(openedPost.id)} />
    </>
  ) : (
    filteredPosts.map((post) => (
      <Post
        key={post.id}
        post={post}
        category={category}
        openMessage={(id) => navigate(`/direct-message/${id}`)}
      />
    ))
  );

  return (
    <>
      <UserNavBar />
      <ForumPostDialog
        open={dialogOpen}
        onClose={(json) => {
          if (json) newPost(json);
          setDialogOpen(false);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", p: 3 }}>
        {/* Category Sidebar */}
        <Paper
          sx={{
            width: "240px",
            borderRadius: "12px",
            p: 2,
            mr: 4,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Categories
          </Typography>
          <List disablePadding>
            {Object.values(ForumCategory).map((cat) => (
              <ListItemButton
                key={cat}
                onClick={() => navigate(`/community-forums/${cat}`)}
                sx={{
                  borderRadius: "8px",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: "#E0A90C",
                    color: "#fff",
                  },
                }}
              >
                <ListItemText primary={cat} />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, borderRadius: "12px", p: 2 }}>{body}</Box>
      </Box>
      <Fab
        aria-label="add"
        className="fixed right-8 bottom-8 bg-[#FEC10E]"
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Forum;
