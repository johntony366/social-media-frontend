import { useAppDispatch } from "@/app/store";
import { PostData } from "@/features/post/postService";
import { likePost } from "@/features/post/postSlice";
import { followUser, unfollowUser } from "@/features/user/userSlice";
import { Box, HStack, Heading, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Post({ post }: { post: PostData }) {
  const dispatch = useAppDispatch();

  return (
    <Box
      p={2}
      width={"60%"}
      textAlign={"center"}
      border={"2px solid grey"}
      borderRadius={12}
    >
      <Heading size={"md"}>{post.title}</Heading>
      <Text size={"lg"}>{post.content}</Text>
      <Text size={"sm"}>@{post.author.username}</Text>

      <HStack justify={"center"}>
        <Link onClick={() => dispatch(followUser(post.author._id))}>
          Follow
        </Link>
        <Link onClick={() => dispatch(unfollowUser(post.author._id))}>
          Unfollow
        </Link>
      </HStack>

      <HStack justify={"center"}>
        <Link onClick={() => dispatch(likePost(post._id))}>Like</Link>
        <Text>{post.likes.length}</Text>
      </HStack>
    </Box>
  );
}
