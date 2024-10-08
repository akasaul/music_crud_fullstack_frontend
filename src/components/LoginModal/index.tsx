import styled from "@emotion/styled";
import { Box, Flex, Text } from "rebass";
import { FaSpotify } from "react-icons/fa";
import {
  fontSize,
  maxWidth,
  position,
  width,
  color,
  left,
  PositionProps,
  ResponsiveValue,
} from "styled-system";
import {
  MdOutlineAccountCircle,
  MdOutlineEmail,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { Input, Spinner } from "theme-ui";
import BaseInputWrapper from "../BaseInput";
import SubmitButton from "../Buttons/SubmitButton";
import TextButton from "../Buttons/TextButton";
import {
  setUserData,
  signInRequest,
  signUpRequest,
} from "../../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  LoginBody,
  loginSchema,
  SignUpBody,
  signUpSchema,
} from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "../../app";

interface LoginProps {
  isOpen: boolean;
  isLogin?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({
  isOpen,
  setIsOpen,
  isLogin = true,
  setIsLogin,
}: LoginProps) => {
  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  interface BaseInputProps {
    variant?: "primary" | "secondary";
    fontSize?: ResponsiveValue<string>;
  }

  const BaseInput = styled(Input)<BaseInputProps>`
    ${color}
    ${fontSize}
    &:focus {
      outline: none;
      border: none;
    }
  `;

  const Container = styled(Flex)`
    gap: 10px;
  `;

  const Overlay = styled(Box)`
    position: fixed;
    background: #fff;
    opacity: 0.15;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(5px);
    z-index: 1;
  `;

  const Modal = styled(Box)<PositionProps>`
    ${position}
    ${left}
    min-width: 300px;
    background: #000;
    position: fixed;
    gap: 20px;
    z-index: 99;
    top: 0;
    bottom: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  `;

  const Header = styled(Box)`
    ${fontSize}
    color: white;
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 10px;
    padding: 24px;
  `;

  interface SizeProps {
    maxWidth?: ResponsiveValue<string>;
    fontSize?: ResponsiveValue<string>;
  }

  const HeaderText = styled.h2<SizeProps>`
    ${fontSize}
    ${width}
    ${maxWidth}
    ${position}
  text-align: center;
    color: white;
  `;

  interface HeaderSubProps {
    fontSize?: ResponsiveValue<string>;
  }

  const HeaderSub = styled.h2<HeaderSubProps>`
    ${fontSize}
    ${width}
    ${maxWidth}
    text-align: center;
    color: white;
  `;

  const InputContainer = styled(Flex)`
    ${maxWidth}
    gap: 15px;
  `;
  const BottomText = styled(Text)`
    ${color}
  `;

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginBody>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit: handleSignUp,
    formState: { errors: signUpErrors },
    register: registerSignup,
  } = useForm<SignUpBody>({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, isError, isAuth, errorMsg } = useSelector(
    (state: RootState) => state.auth,
  );

  console.log("hello from modal");

  if (!isOpen) {
    return;
  }

  if (isAuth) {
    return;
  }

  const onSubmit = ({ email, password }: LoginBody) => {
    dispatch(
      setUserData({
        email,
        name: "",
        password,
      }),
    );
    dispatch(signInRequest());
  };

  const onSignUpSubmit = ({ email, password, name }: SignUpBody) => {
    dispatch(
      setUserData({
        email,
        name,
        password,
      }),
    );
    dispatch(signUpRequest());
  };

  return (
    <>
      <Overlay></Overlay>

      <Modal
        maxWidth={["auto", "auto", "auto", "800px"]}
        sx={{
          marginInline: "auto",
        }}
        right={["20px", "20px", "40px"]}
        left={["20px", "20px", "40px"]}
      >
        <Header as="header" fontSize={["28px"]}>
          <FaSpotify color="white" size={45} />
          Nikofy
        </Header>

        <HeaderText
          maxWidth={["250px", "250px", "350px"]}
          fontSize={["24px", "24px", "32px"]}
        >
          Start listening with a free Nikofy account
        </HeaderText>

        {!isLogin && (
          <HeaderSub fontSize={"15px"}>
            (Just enter unique fake email)
          </HeaderSub>
        )}

        {isLogin && (
          <InputContainer flexDirection="column" alignItems="center">
            <Container
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              flexDirection="column"
              autoComplete="false"
              autoCorrect="false"
            >
              <BaseInputWrapper>
                <BaseInput
                  {...register("email")}
                  placeholder={"Email"}
                  name={"email"}
                  variant="primary"
                  fontSize={["xs", "xs", "sm"]}
                />
                <MdOutlineEmail size={28} color="#7C7C7C" />
              </BaseInputWrapper>
              {errors["email"] && (
                <BottomText color="white">{errors["email"].message}</BottomText>
              )}

              {!isLogin && (
                <BaseInputWrapper>
                  <BaseInput
                    placeholder={"What should we call you"}
                    name={"name"}
                    variant="primary"
                    fontSize={["xs", "xs", "sm"]}
                  />
                  <MdOutlineAccountCircle size={28} color="#7C7C7C" />
                </BaseInputWrapper>
              )}

              <BaseInputWrapper>
                <BaseInput
                  {...register("password")}
                  placeholder={"Password"}
                  variant="primary"
                  type={showPassword ? "text" : "password"}
                  fontSize={["xs", "xs", "sm"]}
                />
                {showPassword ? (
                  <MdVisibility
                    size={28}
                    color="#7C7C7C"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    size={28}
                    color="#7C7C7C"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </BaseInputWrapper>
              {errors["password"] && (
                <BottomText color="white">
                  {errors["password"].message}
                </BottomText>
              )}

              <SubmitButton
                styles={{
                  marginTop: "1rem",
                }}
              >
                Continue
              </SubmitButton>
            </Container>

            {isLoading && <Spinner color="#1ED760" />}

            {!isLoading && isError && (
              <BottomText color="white">{errorMsg}</BottomText>
            )}

            <Flex
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: "100%",
                gap: "10px",
              }}
            >
              <BottomText
                bg="inputBg"
                sx={{
                  height: "1px",
                  width: "100%",
                }}
              ></BottomText>

              <Box
                color="textSecondary"
                m={4}
                sx={{
                  color: "white",
                }}
              >
                OR
              </Box>

              <BottomText
                bg="inputBg"
                sx={{
                  height: "1px",
                  width: "100%",
                }}
              ></BottomText>
            </Flex>

            {isLogin ? (
              <BottomText color="textPrimary">
                Not Joined Us Yet?
                <TextButton onClick={() => setIsLogin && setIsLogin(false)}>
                  SignUp
                </TextButton>
              </BottomText>
            ) : (
              <BottomText color="textPrimary">
                Already on Nikofy?
                <TextButton onClick={() => setIsLogin && setIsLogin(true)}>
                  LogIn
                </TextButton>
              </BottomText>
            )}
          </InputContainer>
        )}

        {!isLogin && (
          <InputContainer flexDirection="column" alignItems="center">
            <Container
              as="form"
              onSubmit={handleSignUp(onSignUpSubmit)}
              flexDirection="column"
              autoComplete="false"
              autoCorrect="false"
            >
              <BaseInputWrapper>
                <BaseInput
                  {...registerSignup("email")}
                  placeholder={"Email"}
                  variant="primary"
                  fontSize={["xs", "xs", "sm"]}
                />
                <MdOutlineEmail size={28} color="#7C7C7C" />
              </BaseInputWrapper>
              {signUpErrors["email"] && (
                <BottomText color="white">
                  {signUpErrors["email"].message}
                </BottomText>
              )}

              <BaseInputWrapper>
                <BaseInput
                  placeholder={"What should we call you"}
                  {...registerSignup("name")}
                  variant="primary"
                  fontSize={["xs", "xs", "sm"]}
                />
                <MdOutlineAccountCircle size={28} color="#7C7C7C" />
              </BaseInputWrapper>
              {signUpErrors["name"] && (
                <BottomText color="white">
                  {signUpErrors["name"].message}
                </BottomText>
              )}

              <BaseInputWrapper>
                <BaseInput
                  {...registerSignup("password")}
                  placeholder={"Password"}
                  variant="primary"
                  type={showPassword ? "text" : "password"}
                  fontSize={["xs", "xs", "sm"]}
                />
                {showPassword ? (
                  <MdVisibility
                    size={28}
                    color="#7C7C7C"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    size={28}
                    color="#7C7C7C"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </BaseInputWrapper>
              {signUpErrors["password"] && (
                <BottomText color="white">
                  {signUpErrors["password"].message}
                </BottomText>
              )}
              <BaseInputWrapper>
                <BaseInput
                  {...registerSignup("confirmPassword")}
                  placeholder={"Confirm Password"}
                  variant="primary"
                  type={showConfirmPassword ? "text" : "password"}
                  fontSize={["xs", "xs", "sm"]}
                />
                {showConfirmPassword ? (
                  <MdVisibility
                    size={28}
                    color="#7C7C7C"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    size={28}
                    color="#7C7C7C"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </BaseInputWrapper>
              {signUpErrors["confirmPassword"] && (
                <BottomText color="white">
                  {signUpErrors["confirmPassword"].message}
                </BottomText>
              )}

              <SubmitButton
                styles={{
                  marginTop: "1rem",
                }}
              >
                Continue
              </SubmitButton>
            </Container>

            {isLoading && <Spinner color="#1ED760" />}

            {!isLoading && isError && (
              <BottomText color="white">{errorMsg}</BottomText>
            )}

            <Flex
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: "100%",
                gap: "10px",
              }}
            >
              <BottomText
                bg="inputBg"
                sx={{
                  height: "1px",
                  width: "100%",
                }}
              ></BottomText>

              <Box
                color="textSecondary"
                m={4}
                sx={{
                  color: "white",
                }}
              >
                OR
              </Box>

              <BottomText
                bg="inputBg"
                sx={{
                  height: "1px",
                  width: "100%",
                }}
              ></BottomText>
            </Flex>

            {isLogin ? (
              <BottomText color="textPrimary">
                Not Joined Us Yet?
                <TextButton onClick={() => setIsLogin && setIsLogin(false)}>
                  SignUp
                </TextButton>
              </BottomText>
            ) : (
              <BottomText color="textPrimary">
                Already on Nikofy?
                <TextButton onClick={() => setIsLogin && setIsLogin(true)}>
                  LogIn
                </TextButton>
              </BottomText>
            )}
          </InputContainer>
        )}

        <TextButton onClick={() => setIsOpen(false)}>Back</TextButton>
      </Modal>
    </>
  );
};

export default LoginModal;
