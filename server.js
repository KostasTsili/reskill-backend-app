const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const cors = require ('cors');
const corsConfig = require('./Utils/corsWhiteListing')
const {myLogger} = require('./middleware/logger');
const {takeTwoReturnOne} = require('./middleware/handlePostData');

const corsOptions = {
    corsConfig
}

app.use(cors());

app.get('/posts',myLogger,async (req,res)=>{
    const baseUrl = "https://jsonplaceholder.typicode.com/";
  try{
    const fetchPosts = await axios.get(`${baseUrl}posts`);
    const fetchImages = await axios.get(`${baseUrl}photos`);

    if(fetchImages.data.length===0 || fetchPosts.data.length===0){
      return res.status(404).json({message:`data not found`});
    }
    const result= takeTwoReturnOne(fetchPosts.data,fetchImages.data);
    res.status(200).json(result);
  }
  catch(e)
  {
    console.log(`error in /posts, error details: ${e.message}`);
        res.status(500).json({
            message:"Data failed",
            error:e.message
        });
  }
});

app.get('/post/:id',myLogger,async (req,res)=>{
const baseUrl = "https://jsonplaceholder.typicode.com/";
const {id} = req.params;
if(!id){
  return res.status(404).json({message:`No or Invalid id `});
}

  try{
    const fetchPost = await axios.get(`${baseUrl}posts/${id}`);
    const fetchImage = await axios.get(`${baseUrl}photos/${id}`);

if(fetchImage.length===0 || fetchPost.length===0){
  return res.status(404).json({message:`data not found for id:${id}`});
}
const result= takeTwoReturnOne(fetchPost.data,fetchImage.data);
res.status(200).json(result);
  }
  catch(e){
    console.log(`error fetching data for id:${id} with error :${e.message}`);
    res.status(404).json({message:`data not found for id:${id}`});
  }
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})