import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, register, reset } from "../features/auth/authSlice";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@/app/store";
import { UserData } from "@/features/auth/authService";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      router.push("/explore");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, router]);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(register(formData));
  };

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
          <Heading size={"3xl"}>Register</Heading>
          <VStack gap={2} w={"70%"} maxW={"600px"}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe328"
                size="lg"
                value={formData.username}
                onChange={onChange}
                isDisabled={isLoading}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                size="lg"
                value={formData.email}
                onChange={onChange}
                isDisabled={isLoading}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="*******"
                size="lg"
                value={formData.password}
                onChange={onChange}
                isDisabled={isLoading}
              />
            </FormControl>
            <Button
              colorScheme={"blackAlpha"}
              type="submit"
              width="full"
              mt={4}
            >
              {isLoading ? <Spinner /> : "Sign Up"}
            </Button>
            <Text textAlign={"center"}>
              Already a user?{" "}
              <Link as={NextLink} href="/login">
                Login
              </Link>
            </Text>
          </VStack>
        </Flex>
      </form>
    </>
  );
}

export default Register;
