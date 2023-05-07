const express = require("express");
const app = express();
const port = 5555;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req,res,next)=>{
    res.append('Acess-Control-Allow-Origin',['*'])
    res.append('Acess-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.append('Acess-Control-Allow-Headers','Content_Type')
    next();
})

const validate =[];

const time = [];

app.get('/time',(req,res)=>{
  res.json(time)
})

app.get('/joefeeds',(req,res)=>{
    res.json(users)
})

app.get('/pass',(req,res)=>{
    let fetch_name = req.query.name1.toLowerCase().trim();
    let fetch_email = req.query.email1.toLowerCase().trim();
    let fetch_pass = req.query.pass1.toLowerCase().trim();

    // console.log(fetch_name)
    // console.log(fetch_email)
    // console.log(fetch_pass)
    if(fetch_email == '' && fetch_name == '' && fetch_pass == '')
    {
      res.json('Please fill in all details')
    }

    let email_ref = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let name_ref = /^[A-Za-z]{4,}$/;

    let istrue = 0;
    if(name_ref.test(fetch_name)){
      istrue += 1;
    }
    else{
        res.json('Four char long and not contain special char');
      //ToastAndroid.show(), ToastAndroid.LONG);
    }

    if(fetch_email == '' && fetch_pass == '')
    {
      res.json('Please fill in all details')
    }
    
    // if (email_ref.test(fetch_email)){
        let found = validate.some((user) => {
            return user.email === fetch_email
        });
        //console.log(found)
        if(found){
            res.json('Email already exists')
        }
        else{
            istrue += 1;
        }
    // }
    // else{
    //   res.json('email must be in formate');
    // }

    if(fetch_pass == '')
    {
      res.json('Please fill in all details')
    }

    if (fetch_pass.length >= 6){
      istrue +=1;
    }
    else{
      res.json('password must be 6 char long');
    }

    if(istrue == 3){
        validate.push({'name':fetch_name,'email':fetch_email,'pass':fetch_pass})
        res.json('Registered successfully')
        console.log(validate)
    }
})

app.get('/validate', (req, res) => {
    let fetch_email = req.query.email.toLowerCase().trim();
    let fetch_pass = req.query.pass.trim();
  
    if (validate.length > 0) {
      let found = validate.some((user) => {
        return user.email === fetch_email && user.pass === fetch_pass;
      });
  
      if (found) {
        res.json( 'correct' );
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        time.push({name:fetch_email,log_time:[hours,minutes]})
        console.log(time)
      } else {
        res.json( 'wrong' );
      }
    } else {
      res.json( 'wrong g' );
    }
  });
  

app.listen(port,()=>{
    console.log('port Number',port)
})





const users = [
    {
        'name':'Joel',
        'profile':'https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'No one is perfect to prove your self perfect',
        'likes':'1002',
        'post':'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'1029',
        'likedby':'Naveen',
        'following':'372',
        'discription':'Personal trainer and fitness fanatic sharing tips and inspiration to help you crush your fitness goals! Follow along for workouts, healthy recipes, and motivation to help you stay on track.',
        'story':'https://images.unsplash.com/photo-1615572766543-06c21416eb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGhkfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    },
    {
        'name':'Naveen',
        'profile':'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'Live Let Live',
        'likes':'2738',
        'post':'https://images.unsplash.com/photo-1615220368123-9bb8faf4221b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'23489',
        'likedby':'Kathik',
        'following':'382',
        'discription':'Wanderlust-stricken adventurer sharing my travels and experiences around the world. From breathtaking landscapes to cultural immersion, join me as I explore and document the beauty of our planet',
        'story':'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
        'name':'Praveen',
        'profile':'https://images.pexels.com/photos/7171858/pexels-photo-7171858.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'Nature love',
        'likes':'3748',
        'post':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYjxiwZ0_zdM7oZE-Lv-kKDKG4Xd4CxsXEa0LRACF7hiVfoNEcWC-BelO3IC-QFfn3Z5c&usqp=CAU',
        'followers':'378',
        'likedby':'vinoth',
        'following':'23',
        'discription':'Food enthusiast sharing my passion for all things delicious! From restaurant reviews to recipe ideas, join me on a culinary journey as I explore the flavors and cultures of the world.',
        'story':'https://www.bhaktiphotos.com/wp-content/uploads/2018/04/Hindu-Shiva-God-Wallpaper-Free-Download.jpg'
    },
    {
        'name':'Karthik',
        'profile':'https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'Lion is always the king of jungle',
        'likes':'378',
        'post':'https://images.unsplash.com/photo-1531361171768-37170e369163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'3428',
        'likedby':'Praveen',
        'following':'1',
        'discription':'Fashionista sharing my love of style and creativity with the world. Follow me for fashion inspiration, outfit ideas, and beauty tips to help you feel confident and empowered',
        'story':'https://blogger.googleusercontent.com/img/a/AVvXsEg4lgizZgo4U-xcfDZbwIt0NcBwcoOyglDDyGOqPdJMqPjjEDtsBcW3Ew2mOhLpUcO2Fjks_u1bvzsRui52Qd98QiwpBOE4Uair_oG-YZDNKFfObpvTZakCIFzIPx8gKhPdActzLlDasTTt4Dsq4tbTBI8PUV1ZooMtEQxBxUg74FcSgifYnBFgNSv5=s700'
    },
    {
        'name':'Karthik',
        'profile':'https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'Lion is always the king of jungle',
        'likes':'378',
        'post':'https://images.unsplash.com/photo-1531361171768-37170e369163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'3428',
        'likedby':'Praveen',
        'following':'1',
        'discription':'Fashionista sharing my love of style and creativity with the world. Follow me for fashion inspiration, outfit ideas, and beauty tips to help you feel confident and empowered',
        'story':'https://www.goodmorningimagesdownload.com/wp-content/uploads/2022/05/Free-HD-New-Love-Images-Download-1.jpg'
    },
    {
        'name':'Vinoth',
        'profile':'https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'King of my own world',
        'likes':'8493',
        'post':'https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'27829',
        'likedby':'Sathis',
        'following':'293',
        'discription':'Animal enthusiast and proud pet parent sharing adorable photos and funny moments of my furry friends. Join me in celebrating the joy and love that our pets bring to our lives.',
        'story':'https://images.unsplash.com/photo-1615572766543-06c21416eb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGhkfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    },
    {
        'name':'Chandru',
        'profile':'https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'King of my own world',
        'likes':'8493',
        'post':'https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'27829',
        'likedby':'Chandru',
        'following':'293',
        'discription':'Animal enthusiast and proud pet parent sharing adorable photos and funny moments of my furry friends. Join me in celebrating the joy and love that our pets bring to our lives.',
        'story':'https://images.unsplash.com/photo-1615572766543-06c21416eb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGhkfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    },
    {
        'name':'Chandru',
        'profile':'https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'King of my own world',
        'likes':'8493',
        'post':'https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'27829',
        'likedby':'Chandru',
        'following':'293',
        'discription':'Animal enthusiast and proud pet parent sharing adorable photos and funny moments of my furry friends. Join me in celebrating the joy and love that our pets bring to our lives.',
        'story':'https://www.goodmorningimagesdownload.com/wp-content/uploads/2022/05/Free-HD-New-Love-Images-Download-1.jpg'
    },
    {
        'name':'Chandru',
        'profile':'https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=600',
        'caption':'King of my own world',
        'likes':'8493',
        'post':'https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'followers':'27829',
        'likedby':'Chandru',
        'following':'293',
        'discription':'Animal enthusiast and proud pet parent sharing adorable photos and funny moments of my furry friends. Join me in celebrating the joy and love that our pets bring to our lives.',
        'story':'https://images.unsplash.com/photo-1615572766543-06c21416eb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGhkfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    },
]