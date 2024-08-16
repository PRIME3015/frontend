import React, { useState } from 'react'
import { FormControl, FormLabel, VStack ,Input, InputGroup, InputRightElement, Button} from '@chakra-ui/react'

import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const Signup = () => {

 const [name,setName]=useState();
 const [email,setEmail]=useState();
 const [confirmpassword,setConfirmPassword]=useState();
 const [password,setPassword]=useState();
 const [pic,setPic]=useState();
 const [show, setShow] = useState(false);
  const toast = useToast();
  const history=useHistory();

 const[loading,setLoading]=useState(false);

 const postDetails=(pics)=>{
   setLoading(true);
   if(pics===undefined){
    toast({
      title:"please Select an Image!",
      status:"",
      duration:5000,
      isClosable:true,
      position:'bottom',

    });
    return ;
    
   }

   if(pics.type==='image/jpeg'|| pics.type==='image/png'){
    const data=new FormData();
    data.append("file",pics);
    data.append("upload_preset", "Mernchatapp");
    data.append("cloud_name", "dw5ffzou4");
    fetch("https://api.cloudinary.com/v1_1/dw5ffzou4/image/upload",{
      method:'post',
      body:data,
    }).then((res)=>res.json())
      .then(data=>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);

      });






   }
   else{
    toast({
      title:'Please Select an Image!',
      status:'warning',
      duration:5000,
      isClosable:true,
      position:'bottom',


    });
    setLoading(false);
    return ;
   }

 };

 const submitHandler=async()=>{
  setLoading(true);
  if(!name || !email || !password || !confirmpassword){
    toast({
      title:'Please Fill in all the fields!',
      status:'warning',
      duration:5000,
      isClosable:true,
      position:'bottom'
    });
    setLoading(false);
    return ;
  }
  if(password!==confirmpassword){
    toast({
      title:'Passwords Do Not Match',
      status:'warning',
      duration:5000,
      isClosable:true,
      position:'bottom',

    });
    return ;
  }
  try{
const config={
  headers:{
    "content-type":"application/json",

  },
};
const {data}=await axios.post("/api/user",
  {name,email,password,pic},
  config);
  toast({
    title:'Registration Successful',
    status:'success',
    duration:5000,
    isClosable:true,
    position:'bottom'
  });
  localStorage.setItem('userInfo',JSON.stringify(data));
  setLoading(false);
  history.push('/chats')

  }
  catch(error){
    toast({
      title:"Error Occured",
      description:error.response.data.message,
      status:'error',
      duration:5000,
      isClosable:true,
      position:'bottom',

    });
    setLoading(false);

  }

 }


  const handleClick=()=>setShow(!show);

  return (
    <VStack spacing="5px" display="flex">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem" onClick={handleClick}>
            <Button h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel> Confirm password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem" onClick={handleClick}>
            <Button h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
}

export default Signup
