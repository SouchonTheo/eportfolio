import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import ProfileArray from "./ProfileArray";

export default function Contact({ color }) {
  const profile = ProfileArray();
  const github = () => {
    window.open(`${profile.github}`, "_blank", "noopener,noreferrer");
  };
  const email = () => {
    window.open(`mailto:${profile.email}`, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <Container maxW={"3xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                04
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={"3xl"}>Let's stay in touch!</Heading>
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              {/* {profile.contact} */}
            </Text>
            <Text
              color={`${color}.500`}
              fontWeight={600}
              fontSize={"lg"}
              px={4}
            >
              {profile.email}
            </Text>
            <Center>
              <HStack pt={4} spacing={4}>
                <a
                  href={"https://linkedin.com/in/theo-souchon/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href={"https://github.com/SouchonTheo"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={28} />
                </a>
                <a
                  href={"mailto:souchontheo24@gmail.com"}
                >
                  <FaEnvelope size={28} />
                </a>
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
