import { RootState, useAppDispatch } from "@/app/store";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { fetchUserPosts } from "@/features/post/postSlice";
import { fetchUser } from "@/features/user/userSlice";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MyPosts() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const fetchedUser = useSelector((state: RootState) => state.user);

  const { userPosts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (status == "failed") {
      // console.log(error);
    }

    if (!user) {
      router.push("/login");
    }

    dispatch(fetchUserPosts({ page: 1, pageSize: 10 }));
    //@ts-ignore
    dispatch(fetchUser({}));
    // console.log(user);
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
        My profile
      </Heading>
      <Box pb={4}>
        <Text textAlign={"center"}>Username: {fetchedUser.user?.username}</Text>
        <Text textAlign={"center"}>Email: {fetchedUser.user?.email}</Text>
        <Text textAlign={"center"}>
          Followers: {fetchedUser.user?.followers?.length}
        </Text>
        <Text textAlign={"center"}>
          Following: {fetchedUser.user?.following?.length}
        </Text>
      </Box>
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
          <Post
            key={post._id}
            post={post}
            hideFollow={true}
            hideUnfollow={true}
          />
        ))}
      </VStack>
    </Box>
  );
}
