Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};




//verdicts pie chart

function verdictsBarChart(array1,array2,user1,user2){

    
 var SE1=0,CE1=0,RE1=0,OL1=0,TL1=0,ML1=0,WA1=0,PE1=0,Accepted1=0,
  SE2=0,CE2=0,RE2=0,OL2=0,TL2=0,ML2=0,WA2=0,PE2=0,Accepted2=0;

   var chartData=[];

    for(var i=0;i<array1.length;i++){
        if(array1[i][2]==10)
              SE1++;
        else if(array1[i][2]==30)
              CE1++;
        else if(array1[i][2]==40)
              RE1++;
       else if(array1[i][2]==45)
              OL1++;
       else if(array1[i][2]==50)
              TL1++;
       else if(array1[i][2]==60)
              ML1++;
       else if(array1[i][2]==70)
              WA1++;
       else if(array1[i][2]==80)
              PE1++;
       else
        Accepted1++;
    }


    for(var i=0;i<array2.length;i++){
        if(array2[i][2]==10)
              SE2++;
        else if(array2[i][2]==30)
              CE2++;
        else if(array2[i][2]==40)
              RE2++;
       else if(array2[i][2]==45)
              OL2++;
       else if(array2[i][2]==50)
              TL2++;
       else if(array2[i][2]==60)
              ML2++;
       else if(array2[i][2]==70)
              WA2++;
       else if(array2[i][2]==80)
              PE2++;
       else
        Accepted2++;
    }

    chartData[0]=["Verdicts",user1,user2];
    chartData[1]=["Submission Error",SE1,SE2];
    chartData[2]=["Compiler Error",CE1,CE2];
    chartData[3]=["Runtime Error",RE1,RE2];
    chartData[4]=["Output Limit",OL1,OL2];
    chartData[5]=["Time Limit",TL1,TL2];
    chartData[6]=["Memory Limit",ML1,ML2];
    chartData[7]=["Wrong Answer",WA1,WA2];
    chartData[8]=["Presentation Error",PE1,PE2];
    chartData[9]=["Accepted", Accepted1,Accepted2];

    

    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable(chartData);

      var options = {
          width:100+'%',
          bars: 'vertical',
          legend: { position: 'bottom'},
          animation:{
            duration: 1000,
            easing: 'out',
          },
      };

      var chart = new google.charts.Bar(document.getElementById('verdictChart'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
    }


}

//submission languages

function languagesBarChar(array1,array2,user1,user2){

  var ansi1=0,java1=0,cPlus1=0,pascal1=0, cPlus111=0,
  ansi2=0,java2=0,cPlus2=0,pascal2=0, cPlus112=0;
  var chartData =[];
   for(var i=0;i<array1.length;i++){
        if(array1[i][5]==1)
              ansi1++;
        else if(array1[i][5]==2)
              java1++;
        else if(array1[i][5]==3)
              cPlus1++;
       else if(array1[i][5]==4)
              pascal1++;
       else
        cPlus111++;
    }

  for(var i=0;i<array2.length;i++){
        if(array2[i][5]==1)
              ansi2++;
        else if(array2[i][5]==2)
              java2++;
        else if(array2[i][5]==3)
              cPlus2++;
       else if(array2[i][5]==4)
              pascal2++;
       else
        cPlus112++;
    }

    chartData[0]=['Languages',user1,user2];
    chartData[1]=["ANSI C",ansi1,ansi2];
    chartData[2]=["JAVA",java1,java2];
    chartData[3]=["C++",cPlus1,cPlus2];
    chartData[4]=["Pascal",pascal1,pascal2];
    chartData[5]=["C++ 11",cPlus111,cPlus112];

    
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable(chartData);

      var options = {
          width:100+'%',
          bars: 'vertical',
          legend: { position: 'bottom'},
          animation:{
            duration: 1000,
            easing: 'out',
          },
      };

      var chart = new google.charts.Bar(document.getElementById('lanChart'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
    }


}


//Overview Table 

function overviewTable(array1,array2,user1,user2){

   $('#user1').text(user1);

   var problems={},
   max_count=-Infinity,
   tried=0,
   solve_one_sub=0,
   total_submitted=0,
   avg_attempt=0,
   total_attempt=0,
   max_attempt=null
   solved_probs=[];

  for(var i=0;i<array1.length;i++){
      problems[array1[i][1]]= (problems[array1[i][1]] || 0)+1;
      if(array1[i][2]==90 && !solved_probs.includes(array1[i][1])){
        solved_probs.push(array1[i][1]);
      }
  }

  for(var x in problems){
    tried++;
    if(problems[x] >max_count){
       max_count=problems[x];
       max_attempt=x;
       total_attempt += problems[x];
    }
    if(problems[x]==1)
      solve_one_sub++;
      
  }

  $('#totalSubmitted1').text(array1.length);
  $('#tried1').text(tried);
  $('#solved1').text(solved_probs.length);
  $('#unsolved1').text(tried - solved_probs.length);
  $('#averageAttempt1').text((tried/total_attempt).round(2))
  $.ajax(`https://uhunt.onlinejudge.org/api/p/id/${max_attempt}`).then(function(data){
    $('#maxAttempt1').empty();
        $('#maxAttempt1').append(max_count+" <a href='https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+max_attempt+"' target='_blank'> ("+data.num+")</a>")
   })
  $('#solvedWithOneSub1').text(solve_one_sub+ " ("+((solve_one_sub *100)/tried).round(2)+"%)");



$('#user2').text(user2);

   problems={};
   max_count=-Infinity;
   tried=0;
   solve_one_sub=0;
   total_submitted=0;
   avg_attempt=0;
   total_attempt=0;
   max_attempt=null;
   solved_probs=[];

  for(var i=0;i<array2.length;i++){
      problems[array2[i][1]]= (problems[array2[i][1]] || 0)+1;
      if(array2[i][2]==90 && !solved_probs.includes(array2[i][1])){
        solved_probs.push(array2[i][1]);
      }
  }

  for(var x in problems){
    tried++;
    if(problems[x] >max_count){
       max_count=problems[x];
       max_attempt=x;
       total_attempt += problems[x];
    }
    if(problems[x]==1)
      solve_one_sub++;
      
  }

  $('#totalSubmitted2').text(array2.length);
  $('#tried2').text(tried);
  $('#solved2').text(solved_probs.length);
  $('#unsolved2').text(tried - solved_probs.length);
  $('#averageAttempt2').text((tried/total_attempt).round(2))
  $.ajax(`https://uhunt.onlinejudge.org/api/p/id/${max_attempt}`).then(function(data){
    $('#maxAttempt2').empty();
        $('#maxAttempt2').append(max_count+" <a href='https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+max_attempt+"' target='_blank'> ("+data.num+")</a>")
   })
  $('#solvedWithOneSub2').text(solve_one_sub+ " ("+((solve_one_sub *100)/tried).round(2)+"%)");


}




//  Main Functions

$(document).ready(function(){

  // submitted button start
     
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


          if( ! $('#verdictsContainer').hasClass('hide')){
                   $('#verdictsContainer').addClass('hide');
           }
          if( ! $('#lansContainer').hasClass('hide')){
                   $('#lansContainer').addClass('hide');
           }
          if( ! $('#overviewTableContainer').hasClass('hide')){
                   $('#overviewTableContainer').addClass('hide');
           }
          if(! $('.sharethis').hasClass('hide')){
            $('.sharethis').addClass('hide');
          }

          $('.mdl-spinner').addClass('is-active');

      $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${handle1}`).then(function(userId){
            if (userId <=0) {
              
                    $("#handle1Div").addClass("is-invalid");
                    $("#handle1Div").addClass("is-dirty");
                    $('.mdl-spinner').removeClass('is-active');
                    return;
            }

          $.ajax(`https://uhunt.onlinejudge.org/api/subs-user/${userId}`).then(function(data1){
                  
                  if(data1.subs.length <=0){

                               $("#handle1Div").addClass("is-invalid");
                              $("#handle1Div").addClass("is-dirty");
                              $('#handle1DivErr').text("No data found for this user");
                              $('.mdl-spinner').removeClass('is-active');
                               return;
                 }

                 $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${handle2}`).then(function(userId2){
                             
                              if (userId2 <=0) {
                                    $("#handle2Div").addClass("is-invalid");
                                    $("#handle2Div").addClass("is-dirty");
                                     $('.mdl-spinner').removeClass('is-active');
                                    return;
                                }

                       $.ajax(`https://uhunt.onlinejudge.org/api/subs-user/${userId2}`).then(function(data2){
                         
                         if(data2.subs.length <=0){
                              $("#handle2Div").addClass("is-invalid");
                              $("#handle2Div").addClass("is-dirty");
                              $('#handle2DivErr').text("No data found for this user");
                              $('.mdl-spinner').removeClass('is-active');
                               return;
                              }

                              verdictsBarChart(data1.subs,data2.subs,handle1,handle2);
                              languagesBarChar(data1.subs,data2.subs,handle1,handle2);
                              overviewTable(data1.subs,data2.subs,handle1,handle2);


                               $('#verdictsContainer').removeClass('hide');
                               $('#lansContainer').removeClass('hide');
                               $('#overviewTableContainer').removeClass('hide');

                               $('.mdl-spinner').removeClass('is-active');
                               $('.sharethis').removeClass('hide');
                               

                })
                       })
                 })
          })

      })

     // submitted button end

    })