import {
  Box,
  Card,
  CardContent,
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
};

async function getPosts() {
  const dummyData: Record<Category, Post[]> = {
    [Category.SupportGroup]: [
      { username: "Test user", title: "group support yayay", id: "4" },
    ],
    [Category.Course]: [{ username: "Test user", title: "course", id: "1" }],
    [Category.Alumni]: [{ username: "Test user", title: "alumni", id: "2" }],
    [Category.General]: [
      { username: "Test user", title: "general channel", id: "3" },
    ],
  };
  return dummyData;
}

const Post: FC<{ post: Post; category: Category }> = ({ post, category }) => {
  return (
    <Link
      to={`/community-forums/${category}/${post.id}`}
      className="no-underline"
    >
      <Card>
        <CardContent>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="h6">{post.username}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

const Forum: FC = () => {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const params = useParams<{ category: Category; post: string }>();
  const category = params.category ?? Category.SupportGroup;
  const post = params.post;

  const navigate = useNavigate();

  if (isLoading || !posts) {
    return <LinearProgress />;
  }

  const body = post ? (
    <>
      <Link to={`/community-forums/${category}`}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Post
        category={category}
        post={posts[category].find((p) => p.id === post)!}
      />
    </>
  ) : (
    posts[category].map((post) => <Post post={post} category={category} />)
  );

  return (
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
  );
};

export default Forum;
