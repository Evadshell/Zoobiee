import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 5000;
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWY0Y2U0OTVkMjNmOGE4MTIwOWIxZDhhOWZjOGNkNSIsInN1YiI6IjY1ZjYzY2ZkZTIxMDIzMDE3ZWVkYmM2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GfQsdV6vgk3ahc8K2OukBOI9fXLUIYL9-srL4OA5zCc";
app.use(bodyParser.json());
app.get("/lame", async (req,res)=>{
  try {
    const type = req.query.type;
    const tren = req.query.tren;
    const headers = {
      Authorization: `${token}`,
    };
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/21108649/${tren}/${type}`,
      { headers }
    );

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
})
app.get("/lol", async (req, res) => {
  try {
    const type = req.query.type;
    const tren = req.query.tren;
    const headers = {
      Authorization: `${token}`,
    };
    const response = await axios.get(
      `https://api.themoviedb.org/3${tren}/movie/${type}`,
      { headers }
    );
    
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
})
app.get("/wat", async (req, res) => {
  try {
    const id = req.query.id;
    const type = req.query.type;
    console.log(id, type);
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `${token}`,
    };
    const body = {
      media_type: type,
      media_id: id,
      watchlist: true,
    };
    const response = await axios.post(
      "https://api.themoviedb.org/3/account/21108649/watchlist",
      body,
      { headers }
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
});
app.get("/fav", async (req, res) => {
  try {
    const id = req.query.id;
    const type = req.query.type;
    console.log(id, type);
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `${token}`,
    };
    const body = {
        media_type: type,
        media_id: id,
        favorite: true,
      }
    const response = await axios.post(
      "https://api.themoviedb.org/3/account/21108649/favorite",
      body, {headers}
    );
       res.json(response.data);
       console.log(response.data);
  } catch (error) {
    console.log(error);
  }
})
app.get("/similar", async (req, res) => {
  try {
    const id = req.query.id;
    const type = req.query.type;
    const headers = {
      Authorization: `${token}`,
    };
    console.log(id);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/${type}`,
      { headers }
    );

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
});
app.get("/detail",async(req,res)=>{
  try {
    const id = req.query.id;
    const headers = {
      Authorization: `${token}`,
    };
    console.log(id);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      { headers }
    );
    
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
})
app.get("/search", async (req, res) => {
  try {
     const query = encodeURIComponent(req.query.query);
     const exact_year = encodeURIComponent(req.query.exact_year);
     const language = encodeURIComponent(req.query.language);
     const region = encodeURIComponent(req.query.region);
     const page = encodeURIComponent(req.query.page);
     const type = encodeURIComponent(req.query.type);
    const search = encodeURIComponent(req.query.search);
     const headers = {
       Authorization: `${token}`,
     };

     console.log(query, exact_year, language, region, page, type);
    const response = await axios.get(
      `https://api.themoviedb.org/3/${search}/${type}?query=${query}&primary_release_year=${exact_year}&language=${language}&region=${region}&page=${page}`,
      { headers }
    );

    const movies = response.data.results;
    res.json(movies);  
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});