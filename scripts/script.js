$(document).ready(function() {
     
    //Get location of user
    navigator.geolocation.getCurrentPosition(success, error);
    
    function success(location) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;
        weather(latitude,longitude);
        console.log("It worked.");
    }
    
    function error() {
        console.log("Error");
        alert("Please enable your location services and refresh the page.");
    }
    
    function weather(latitude, longitude) {
        
        var URL = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
        
        $.getJSON(URL, function(data){
            // console.log(data);
            updateDOM(data);
           
        });
    }

    function updateDOM(data) {
        
        var city = data.name;
        var temperature = Math.round(data.main.temp);
        var description = data.weather[0].description;
        var weathericon = data.weather[0].icon;
        var temperatureF = Math.round(temperature * (9/5)) + 32;
        //To make sure conversion is working
         console.log(temperatureF);
         
        $("#city").html(city);
        $("#temperatureF").html(temperatureF + " F");
        $("#temperature").html(temperature + " C");
        $("#description").html(description);
        $("#weathericon").attr("src", weathericon);
        $("#temperature").hide();

        
           $("#toggle").click(function() {
                $("#temperature,#temperatureF").toggle();
           });
                function changeBgColor(temperatureF){
                var color='linear-gradient(-90deg, #1488CC, #2B32B2)'
                
              if(Math.round(temperature * (9/5)) + 32 > -20 && Math.round(temperature * (9/5)) + 32 <= 32) {
                color='linear-gradient(-90deg, #56ccf2, #2f80ed)'
              } else if (Math.round(temperature * (9/5)) + 32 > 32 && Math.round(temperature * (9/5)) + 32 <= 75) {
                color='linear-gradient(-90deg, #fdc830, #f37335)'
              } else if (Math.round(temperature * (9/5)) + 32 > 76) {
                color='linear-gradient(-90deg, #c21500, #ffc500)'
              }
              $('.container_main').css('background',color);
 }
           
      changeBgColor();
        
    }
            //This was not working, trying something else
            //     $("#temperature").html(temperatureF);
            //   }, function(){

            //     $("#temperature").html(temperature);
            //     });
});

