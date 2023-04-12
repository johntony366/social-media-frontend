import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@/app/store";
import { UserData } from "@/features/auth/authService";
import { createPost, fetchUserPosts } from "@/features/post/postSlice";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

function Login() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const postData = {
      author: user?.username,
      title: formData.title,
      content: formData.content,
    };

    dispatch(createPost(postData));
    router.push("/profile");
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          w={"100vw"}
          h={"100vh"}
          justify={"center"}
          align={"center"}
          flexDirection={"column"}
          gap={12}
        >
          <Heading size={"3xl"}>Create Post</Heading>
          <VStack gap={2} w={"70%"} maxW={"600px"}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Your post title"
                size="lg"
                value={formData.title}
                onChange={onChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Content</FormLabel>
              <Input
                type="text"
                id="content"
                name="content"
                placeholder="Your post content"
                size="lg"
                value={formData.content}
                onChange={onChange}
              />
            </FormControl>
            <Button
              colorScheme={"blackAlpha"}
              type="submit"
              width="full"
              mt={4}
            >
              {"Submit"}
            </Button>
          </VStack>
        </Flex>
      </form>
      {/* <section className="heading">
        <h1>Create post</h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              placeholder="Enter title"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
              value={formData.content}
              placeholder="Enter content"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section> */}
    </>
  );
}

export default Login;
