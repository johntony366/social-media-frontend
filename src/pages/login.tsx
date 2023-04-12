import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
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

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      router.push("/");
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
          <Heading size={"3xl"}>Login</Heading>
          <VStack gap={2} w={"70%"} maxW={"600px"}>
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
              {isLoading ? <Spinner /> : "Login"}
            </Button>
            <Text textAlign={"center"}>
              Not a user?{" "}
              <Link as={NextLink} href="/register">
                Sign up
              </Link>
            </Text>
          </VStack>
        </Flex>
      </form>
    </>
  );
}

export default Login;
