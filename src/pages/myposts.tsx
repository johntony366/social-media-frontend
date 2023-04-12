import { RootState, useAppDispatch } from "@/app/store";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { fetchUserPosts } from "@/features/post/postSlice";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MyPosts() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const { userPosts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (status == "failed") {
      console.log(error);
    }

    if (!user) {
      router.push("/login");
    }

    dispatch(fetchUserPosts({ page: 1, pageSize: 10 }));
  }, []);

  return (
    <Box minW={"100vw"} minH={"100vh"}>
      <Navbar />
      <Heading
        textAlign={"center"}
        as="h1"
        size="xl"
        textDecoration={"underline"}
        mb={4}
      >
        Your posts
      </Heading>
      <VStack w={"100%"} gap={2}>
        {userPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </VStack>
    </Box>
  );
}
