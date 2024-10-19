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

  const params = useParams<{ category: Category; post: string }>();
  const category = params.category ?? Category.SupportGroup;

  const navigate = useNavigate();

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
      <Box className="flex flex-row">
        <Box>
          <List disablePadding>
            {Object.values(Category).map((cat) => (
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
    </>
  );
};

export default Forum;
