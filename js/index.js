$(document).ready(function(){
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  var api;
  var link;
  // for each value in streamers array, create api and link
  streamers.forEach(function(val){
    let api= 'https://wind-bow.gomix.me/twitch-api/streams/'+val+'?callback=?';
    let link = 'https://www.twitch.tv/'+val;
    var test = 'https://wind-bow.gomix.me/twitch-api/channels/'+val+'?callback=?';
    // get stream api data for each streamer
   $.getJSON(api, function(data) {
     //console.log(api);
     var name;
     var game;
     var status;
     var logo;
     if (data.stream === null) {
       // get channel api data for null streamer
       let api = 'https://wind-bow.gomix.me/twitch-api/channels/'+val+'?callback=?';
      $.getJSON(api, function(data) {
        if (data.status === 404){
          name = val;
          logo = 'https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/General_Do_OnRightBg_474x356.png';
          $('#all-contents').append('<div class="streaming"><img src="'+ logo +'" class="img-thumbnail" width="100px" /><b>'+ name+':</b> User Not Found</div>');
         }
        else {        
          name = data.display_name;
          logo = data.logo;
          $('#all-contents, #offline-contents').append('<a href="'+ link +'" target="_blank"><div class="streaming"><img src="'+ logo +'" class="img-thumbnail" width="100px" /><b>'+ name+':</b> Offline</div></a>');
         }
      }); // close channel api
     }
     else {
       name = data.stream.channel.display_name;
       game =data.stream.channel.game;
       status = data.stream.channel.status;
       logo = data.stream.channel.logo;
       $('#all-contents, #online-contents').append('<a href="'+ link +'" target="_blank"><div class="streaming"><img src="'+ logo +'" class="img-thumbnail" width="100px" /><b>'+ name+':</b> '+game+ ' '+status+' </div></a>');
     }
    }); // close getJSON
  }); // close forEach
})