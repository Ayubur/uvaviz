//  Main Functions

$(document).ready(function(){
     
     $('#submitButton').on('click',async(e)=>{
            e.preventDefault();
           
          $('#handle1DivErr').text("Couldn't find user. Network problem?");
          $('#handle2DivErr').text("Couldn't find user. Network problem?");

           var handle1= $('#handle1').val();
           var handle2= $('#handle2').val();

           if(handle1==''){
              $("#handle1Div").addClass("is-invalid");
              $("#handle1Div").addClass("is-dirty");
              $('#handle1DivErr').text('Enter a username');
              return;
           }

          if(handle2==''){
              $("#handle2Div").addClass("is-invalid");
              $("#handle2Div").addClass("is-dirty");
              $('#handle2DivErr').text('Enter a username');
              return;
           }
           


           $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${handle1}`).then(function(userId){
                if (userId <=0) {
                    $("#handle1Div").addClass("is-invalid");
                    $("#handle1Div").addClass("is-dirty");
                    return;
              }
           })

         $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${handle2}`).then(function(userId){
                if (userId <=0) {
                    $("#handle2Div").addClass("is-invalid");
                    $("#handle2Div").addClass("is-dirty");
                    return;
              }
           })

         
     })
})