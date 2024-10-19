import {
  Box,
  Card,
  CardContent,
  Divider,
  Fab,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Typography,
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

type Post = {
  id: string;
  username: string;
  title: string;
  replies?: Post[];
};

async function getPosts() {
  const dummyData: Record<ForumCategory, Post[]> = {
    [ForumCategory.SupportGroup]: [
      {
        username: "Test user",
        title: "group support yayay",
        id: "4",
        replies: [{ username: "Test replier", title: "Hello", id: "whatever" }],
      },
    ],
    [ForumCategory.Course]: [
      { username: "Test user", title: "course", id: "1" },
    ],
    [ForumCategory.Housing]: [
      { username: "Test user", title: "alumni", id: "2" },
    ],
    [ForumCategory.Disability]: [
      { username: "Test user", title: "alumni", id: "2" },
    ],
    [ForumCategory.General]: [
      { username: "Test user", title: "general channel", id: "3" },
    ],
  };
  return dummyData;
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

const Post: FC<{
  post: Post;
  category: ForumCategory;
  openMessage: (userId: string) => void;
}> = ({ post, category, openMessage }) => {
  return (
    <Card>
      <CardContent>
        <Link
          to={`/community-forums/${category}/${post.id}`}
          className="no-underline hover:underline text-black"
        >
          <Typography variant="h4">{post.title}</Typography>
        </Link>
        <Typography className="flex flex-row items-center" variant="h6">
          <span>{post.username}</span>
          <IconButton onClick={() => openMessage(post.username)}>
            <MessageIcon />
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
};

const Forum: FC = () => {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const params = useParams<{ category: ForumCategory; post: string }>();
  const category = params.category ?? ForumCategory.SupportGroup;

  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading || !posts) {
    return <LinearProgress />;
  }

  const openedPost = posts[category].find((p) => p.id === params.post);

  const body = openedPost ? (
    // A single thread is open
    <>
      <Link to={`/community-forums/${category}`}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Post
        category={category}
        post={openedPost}
        openMessage={(id) => navigate(`/direct-message/${id}`)}
      />
      <Divider />
      {(openedPost.replies ?? []).map((p) => (
        <Post
          post={p}
          category={category}
          openMessage={(id) => navigate(`/direct-message/${id}`)}
        />
      ))}
    </>
  ) : (
    // List all of the threads
    posts[category].map((post) => (
      <Post
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
      <Box className="flex flex-row">
        <Box>
          <List disablePadding>
            {Object.values(ForumCategory).map((cat) => (
              <ListItemButton
                key={cat}
                onClick={() => navigate(`/community-forums/${cat}`)}
                divider={true}
              >
                <ListItemText primary={cat} />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box className="flex-1 p-4">{body}</Box>
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
