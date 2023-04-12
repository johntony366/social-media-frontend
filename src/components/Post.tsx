import { PostData } from "@/features/post/postService";
import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function Post({ post }: { post: PostData }) {
  console.log(post);

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
    </Box>
  );
}
