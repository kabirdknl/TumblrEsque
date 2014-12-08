
var tumblrAPI = {
  

  init: function(){
    tumblrAPI.photoSearch();
    tumblrAPI.videoSearch();
    tumblrAPI.audioSearch();
    tumblrAPI.blogSearch();
    
  },

    // declaring the tumblrAPI requestURL

  buildURL: function(){

    var base = "http://api.tumblr.com/v2/blog/";
    var ending = ".tumblr.com/posts/";
    
    tumblrAPI.userInput=$("#input").val()
    tumblrAPI.requestURL = base+tumblrAPI.userInput+ending;
    // console.log(tumblrAPI.requestURL);

  },

    // the default result at first search

  blogSearch: function(){
    $("#blog").click(function() {
     $(this).val(" ").css('background', 'url("./img/loader.gif") no-repeat center');
      tumblrAPI.getData('text');

    });
  },

  // search for photos related to blog


  photoSearch: function(){
    
    $("#photo").click(function() {
      // $(this).val(" ").css('background', 'url("./img/loader.gif") no-repeat center');
      tumblrAPI.getData('photo');
    });
  },

  // search for videos related to blog

  videoSearch: function(){
    
    $("#video").click(function() {
      // $(this).val(" ").css('background', 'url("./img/loader.gif") no-repeat center');
      tumblrAPI.getData('video');
    });
  },

    // search for audio related to blog 

  audioSearch: function(){
    
    $("#audio").click(function() {
      // $(this).val(" ").css('background', 'url("./img/loader.gif") no-repeat center');
      tumblrAPI.getData('audio');
    });
  },

  // Validating blog name


  responseValidation: function(response){
    
    if(response.response.blog){
      var title = response.response.blog.name;
      var url = response.response.blog.url;
      title = "<a href='"+url+"'>"+title;
      $("#validation").empty();
      $("#title").html(title);
      console.log(url);
      var description = response.response.blog.description;
      $("#description").html(description);

      if(response.response.total_posts==0){
        $("#description").html("<p>This post is empty!</p>")
        console.log("This post is empty!")
      }
    }
    else {
      $("#title").empty();
      $("#description").empty();
      $("#validation").empty();
      $("#validation").html("<a href='https://www.tumblr.com/'>Blog does not exist</a>");
      console.log("blog does not exist");
    }
    
  },

    // Tumblr parameters

  data:{
      api_key:"ZU4YjeIBXHW91onQlsCnY49JkGCVBsy7PS3iUimxEF6KViYlD4"
      // type:null
    },

    // callback function for photosearch

  photoCallback:function(response){
    var pictureObject = response.response; 
    console.log(pictureObject);
    $("#result").empty();
    tumblrAPI.responseValidation(response);
    $.each(response.response.posts, function(i, photo){
      var date = response.response.posts[i].date;
      var postLink = response.response.posts[i].post_url;
      var imgLink = response.response.posts[i].photos[0].alt_sizes[2].url;
      var image = '<li><a href="'+postLink+'"><img src="'+imgLink+'"></a><p class="date">Date Posted:'+date+'</p></li>';
      $("#result").append(image);
      // $('#photo').val("Photos").css('background', '#2a8bc7');
    })

  },

    // callback function for videosearch

  videoCallback:function(response){
    console.log(response.response);
    tumblrAPI.responseValidation(response);
    $("#result").empty();
    $.each(response.response.posts, function(i, video){
      var date = response.response.posts[i].date;
      var video = '<li>'+response.response.posts[i].player[0].embed_code+'<p class="date">Date Posted:'+date+'</p></li>';
      $("#result").append(video);
      // $('#video').val("Audios").css('background', '#2a8bc7'); 
    })
  },

    // callback function for audiosearch


  audioCallback:function(response){
    console.log(response.response);
    tumblrAPI.responseValidation(response);
    $("#result").empty();
    $.each(response.response.posts, function(i, audio){
      var date = response.response.posts[i].date;
      var audio = '<li>'+response.response.posts[i].player+'<p class="date">Date Posted:'+date+'</p></li>'
      $("#result").append(audio);
      // $('#audio').val("Audios").css('background', '#2a8bc7'); 
    })
  },

  // callback function for initialsearch


  blogCallback:function(response){
    console.log(response.response);
    console.log(response.response.posts);
    tumblrAPI.responseValidation(response);
    $("#result").empty();
    $.each(response.response.posts, function(i, blog){
      var date = response.response.posts[i].date;
      var blog = '<li class="blogs">'+response.response.posts[i].body+'<p class="date">Date Posted:'+date+'</p></li>'
      $("#result").append(blog);
      $('#blog').val("Submit").css('background', '#2a8bc7'); 

    })
  },

  // get function for callbacks when button is clicked


  getData:function(type){
    tumblrAPI.data.type = type;
    var callback;
    switch(type){
      case "photo": 
        callback= tumblrAPI.photoCallback;
        break;
      case "video": 
        callback= tumblrAPI.videoCallback;
        break;
      case "audio": 
        callback= tumblrAPI.audioCallback;
        break;
      case "text": 
        callback= tumblrAPI.blogCallback;
        break;
    };


    tumblrAPI.buildURL();
    console.log(tumblrAPI.requestURL);
    
    // methodCall to API

    $.ajax({
      type:"GET",
      url:tumblrAPI.requestURL,
      dataType:"jsonp",
      data: tumblrAPI.data,
      success:callback,
    });

  },


}
tumblrAPI.init();

