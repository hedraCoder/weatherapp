function getPosition() {

    return new Promise((resolve, reject) => {
   
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Sorry, your browser does not support HTML5 geolocation.");
      }
  
      function success(position) {
        resolve(position)
      }
  
      function error(error) {
        reject(error);
      }
  
    });
  
  };
  
getPosition().then((position)=> {
    console.log(position);
})
.catch((error)=> {
    console.log(error.message);
})