Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};


///HeatMap Implementation


function dateConverter(timestamps){

    var d = new Date(timestamps*1000);
        month = '' + (d.getMonth() + 1);
        day = '' + d.getDate();
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function yearConverter(timestamps){
  var d = new Date(timestamps*1000);
   var year =d.getFullYear();

   return year;
}


function displayHeatmaps(array,username){
   
     var data=[];
     var years=[];


    array.forEach(function(x){
       years[yearConverter(x[4])]=(years[yearConverter(x[4])] || 0) + 1;
        data.push(dateConverter(x[4]));
    })

     $('#heatMapsContainer').removeClass('hide');
     $('#heatMapsContainer').append("<span class='card-heading'>Submissions of "+username+"</span>");
      $('#heatMapsContainer').append("<div id='heatMapContent'></div>");


    Object.keys(years).reverse().forEach(function(key) {
           
       if(years[key]>=1){
         $('#heatMapContent').append("<h6 class='heatmap-year'>"+key +"  ( "+years[key]+" submissions)</h6>");
          $('#heatMapContent').append("<div class='heatmap-size' id='heatmap-"+key+"'></div>");
          $("#heatmap-"+key).calmosaic(data,{
               lastYear: parseInt(key)+1
          });
       }
   });
  

}


// calculating unsolved problems
function unsolvedProblems (array,userId){
  $('#unsolvedProbs').removeClass('hide');
  var unsolved_probs_num =[];

   for(var i=0;i<array.length;i++){
      $.ajax(`https://uhunt.onlinejudge.org/api/subs-pids/${userId}/${array[i][1]}/0`).then(function(data){
         var length =data[userId].subs.length;
         var prob_id=data[userId].subs[length-1][1];
           if(data[userId].subs[length-1][2] != 90){
              $.ajax(`https://uhunt.onlinejudge.org/api/p/id/${data[userId].subs[length-1][1]}`).then(function(data){
                 if(! unsolved_probs_num.includes(data.num)){
                     unsolved_probs_num.push(data.num);
                     $('#unsolvedProblems').append("<a href='https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+prob_id+"' target='_blank'>"+data.num+"</a>")
                 }
                })
           }
      })


   }
   
}

// diaplaying tags of problems 
async function tagsOfProblems(array,username){

  var normal=0, special_judged=0;
  var dataset=[];

  for(var i=0;i<array.length;i++){
          var response = await fetch(`https://uhunt.onlinejudge.org/api/p/id/${array[i][1]}`);
          response.json().then((data)=>{
              if(data.status == 1)
                  normal++;
              else if(data.status ==2)
                  special_judged++;
          });
  }

  dataset=[
      ["tags","count"],
      ["Normal",normal ],
      ["Special Judged",special_judged]
  ];

  $('#probsTag').removeClass('hide');

  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(dataset);

    var options = {
      title: 'Tags of '+username,
      width:600,
      pieHole: 0.6,
    };

    var chart = new google.visualization.PieChart(document.getElementById('tagsChart'));
    chart.draw(data, options);
  }

    $('.mdl-spinner').removeClass('is-active');
}


//overview table

function overviewTable(array,username){

  $('#overviewTable').removeClass('hide');
  $('.handle-text').text(username);

  var problems={},
   max_count=-Infinity,
   tried=0,
   solve_one_sub=0,
   total_submitted=0,
   avg_attempt=0,
   total_attempt=0,
   max_attempt=null
   solved_probs=[];

  for(var i=0;i<array.length;i++){
      problems[array[i][1]]= (problems[array[i][1]] || 0)+1;
      if(array[i][2]==90 && !solved_probs.includes(array[i][1])){
        solved_probs.push(array[i][1]);
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

  $('#totalSubmitted').text(array.length);
  $('#tried').text(tried);
  $('#solved').text(solved_probs.length);
  $('#unsolved').text(tried - solved_probs.length);
  $('#averageAttempt').text((tried/total_attempt).round(2))
  $.ajax(`https://uhunt.onlinejudge.org/api/p/id/${max_attempt}`).then(function(data){
    $('#maxAttempt').empty();
        $('#maxAttempt').append(max_count+" <a href='https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+max_attempt+"' target='_blank'> ("+data.num+")</a>")
   })
  $('#solvedWithOneSub').text(solve_one_sub+ " ("+((solve_one_sub *100)/tried).round(2)+"%)");
}

//displaying submission languages

function submissionLanguages(array,username){

  var ansi=0,java=0,cPlus=0,pascal=0, cPlus11=0;
  var chartData =[];
   for(var i=0;i<array.length;i++){
        if(array[i][5]==1)
              ansi++;
        else if(array[i][5]==2)
              java++;
        else if(array[i][5]==3)
              cPlus++;
       else if(array[i][5]==4)
              pascal++;
       else
        cPlus11++;
    }

    chartData[0]=["Language","Count"]
    chartData[1]=["ANSI C",ansi];
    chartData[2]=["JAVA",java];
    chartData[3]=["C++",cPlus];
    chartData[4]=["Pascal",pascal];
    chartData[5]=["C++ 11",cPlus11];

  $('#lans').removeClass('hide');

      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(chartData);

        var options = {

          title: 'Languages of '+username,
          width:500,
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('languageChart'));
        chart.draw(data, options);
  }
}




//displaying submitted verdics
function verdict(array,username){

    var SE=0,CE=0,RE=0,OL=0,TL=0,ML=0,WA=0,PE=0,Accepted=0;
    var chartData=[];

       for(var i=0;i<array.length;i++){
        if(array[i][2]==10)
              SE++;
        else if(array[i][2]==30)
              CE++;
        else if(array[i][2]==40)
              RE++;
       else if(array[i][2]==45)
              OL++;
       else if(array[i][2]==50)
              TL++;
       else if(array[i][2]==60)
              ML++;
       else if(array[i][2]==70)
              WA++;
       else if(array[i][2]==80)
              PE++;
       else
        Accepted++;
    }

    chartData[0]=["Verdicts","Count"];
    chartData[1]=["Accepted", Accepted];
    chartData[2]=["Compiler Error",CE];
    chartData[3]=["Runtime Error",RE];
    chartData[4]=["Output Limit", OL];
    chartData[5]=["Time Limit",TL];
    chartData[6]=["Memory Limit",ML];
    chartData[7]=["Wrong Answer",WA];
    chartData[8]=["Presentation Error",PE];
    chartData[9]=["Submission Error",SE];



      $('#verdicts').removeClass('hide');

      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(chartData);

        var options = {
          title: 'Verdicts of '+username,
          width:500,
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('verdictChart'));
        chart.draw(data, options);
      }
}




//  Main Functions

$(document).ready(function(){
    $('#handle').on('keydown', function(e){
        if(e.keyCode==13){
             e.preventDefault();
            var input_val = $(this).val();

           $('#handleDivErr').text("Couldn't find user. Network problem?");
           if(input_val==''){
                   $("#input-div").addClass("is-invalid");
                   $("#input-div").addClass("is-dirty");
                   $('#handleDivErr').text('Enter a username');
                   return;
              }

             $('.mdl-spinner').addClass('is-active');
             $('.card-heading').empty();

              if( ! $('#verdicts').hasClass('hide')){
                   $('#verdicts').addClass('hide');
               }

              if( ! $('#lans').hasClass('hide')){
                   $('#lans').addClass('hide');
               }
              if( ! $('#probsTag').hasClass('hide')){
                   $('#probsTag').addClass('hide');
               }
              if( ! $('#overviewTable').hasClass('hide')){
                   $('#overviewTable').addClass('hide');
               }

               if( ! $('#unsolvedProbs').hasClass('hide')){
                   $('#unsolvedProbs').addClass('hide');
               }
              if( ! $('#heatMapsContainer').hasClass('hide')){
                   $('#heatMapsContainer').addClass('hide');
               }

               if( ! $('.sharethis').hasClass('hide')){
                     $('.sharethis').addClass('hide');
               }


             $('#languageChart').empty();
             $('#verdictChart').empty();
                $('#tagsChart').empty();
             $('#heatMapsContainer').empty();
             $('#unsolvedProblems').empty();
          

          //converting username to userId
          $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${input_val}`).then(function(userId){ 
               
               if (userId <=0) {
    				        $("#input-div").addClass("is-invalid");
    				        $("#input-div").addClass("is-dirty");
                    $('.mdl-spinner').removeClass('is-active');
				        return;
				      }
             
              $.ajax(`https://uhunt.onlinejudge.org/api/subs-user/${userId}`).then(function(data){
                        
                        if(data.subs.length <=0){
                              $("#input-div").addClass("is-invalid");
                              $("#input-div").addClass("is-dirty");
                            $('#handleDivErr').text("No data found for this user");

                              $('.mdl-spinner').removeClass('is-active');
                               return;
                        }

                        submissionLanguages(data.subs,input_val);
                        verdict(data.subs,input_val);
                        tagsOfProblems(data.subs,input_val);
                        overviewTable(data.subs,input_val);
                        unsolvedProblems(data.subs,userId);
                        displayHeatmaps(data.subs,input_val);

                         $('.sharethis').removeClass('hide');
                  
      
              })

            })

      }
    })
})