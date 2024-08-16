import React, { useEffect } from 'react'

import { Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs } from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom';

// container used  to make responsive to different sizes
const Homepage = () => {
const history=useHistory();
useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("userInfo"));
  if(user){
    history.push("/chats");
  }

},[history]);


  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="15"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="work sans" color="blue">
          Messenger
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        color="black"
        borderRadius="5"
        borderWidth="1px"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
