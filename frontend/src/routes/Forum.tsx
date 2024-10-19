import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import MessageIcon from "@mui/icons-material/Message";
import UserNavBar from "../components/UserNavBar";

enum Category {
  SupportGroup = "Support Group",
  Course = "Courses",
  Alumni = "Ask Alumni",
  General = "General",
}

type Post = {
  id: string;
  username: string;
  title: string;
  replies?: Post[];
};

async function getPosts() {
  const dummyData: Record<Category, Post[]> = {
    [Category.SupportGroup]: [
      {
        username: "Test user",
        title: "group support yayay",
        id: "4",
        replies: [{ username: "Test replier", title: "Hello", id: "whatever" }],
      },
    ],
    [Category.Course]: [{ username: "Test user", title: "course", id: "1" }],
    [Category.Alumni]: [{ username: "Test user", title: "alumni", id: "2" }],
    [Category.General]: [
      { username: "Test user", title: "general channel", id: "3" },
    ],
  };
  return dummyData;
}

const Post: FC<{
  post: Post;
  category: Category;
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
      </CardContent>
    </Card>
  );
};

const Forum: FC = () => {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const params = useParams<{ category: Category; post: string }>();
  const category = params.category ?? Category.SupportGroup;

  const navigate = useNavigate();

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

  const openedPost = posts[category].find((p) => p.id === params.post);

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
      {openedPost.replies?.map((p) => (
        <Post
          post={p}
          category={category}
          openMessage={(id) => navigate(`/direct-message/${id}`)}
        />
      ))}
    </>
  ) : (
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
            {Object.values(Category).map((cat) => (
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
    </>
  );
};

export default Forum;
