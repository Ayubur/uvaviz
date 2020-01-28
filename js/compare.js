Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};

function yearConverter(timestamps){
       var d = new Date(timestamps*1000);
       var year =d.getFullYear();
       return year;
}




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
    chartData[1]=["Accepted", Accepted1,Accepted2];
    chartData[2]=["Compiler Error",CE1,CE2];
    chartData[3]=["Runtime Error",RE1,RE2];
    chartData[4]=["Output Limit",OL1,OL2];
    chartData[5]=["Time Limit",TL1,TL2];
    chartData[6]=["Memory Limit",ML1,ML2];
    chartData[7]=["Wrong Answer",WA1,WA2];
    chartData[8]=["Presentation Error",PE1,PE2];
    chartData[9]=["Submission Error",SE1,SE2];

    

    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable(chartData);

      var options = {
           title: 'Verdicts',
          width:1170,
          legend: { position: 'left', alignment: 'start' },
          animation:{
            duration: 1200,
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
          title: 'Languages',
          width:500,
          legend:{ position: 'left', alignment: 'start' },
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

   var problems1={},
   max_count1=-Infinity,
   tried1=0,
   solve_one_sub1=0,
   total_submitted1=0,
   avg_attempt1=0,
   total_attempt1=0,
   max_attempt1=null
   solved_probs1=[];

  for(var i=0;i<array1.length;i++){
      problems1[array1[i][1]]= (problems1[array1[i][1]] || 0)+1;
      if(array1[i][2]==90 && !solved_probs1.includes(array1[i][1])){
        solved_probs1.push(array1[i][1]);
      }
  }

  for(var x in problems1){
    tried1++;
    if(problems1[x] >max_count1){
       max_count1=problems1[x];
       max_attempt1=x;
       total_attempt1 += problems1[x];
    }
    if(problems1[x]==1)
      solve_one_sub1++;
      
  }

  $('#totalSubmitted1').text(array1.length);
  $('#tried1').text(tried1);
  $('#solved1').text(solved_probs1.length);
  $('#unsolved1').text(tried1 - solved_probs1.length);
  $('#averageAttempt1').text((array1.length/tried1).round(2))
  $.ajax(`https://uhunt.onlinejudge.org/api/p/id/${max_attempt1}`).then(function(data){
    $('#maxAttempt1').empty();
        $('#maxAttempt1').append(max_count1+" <a href='https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+max_attempt1+"' target='_blank'> ("+data.num+")</a>")
   })
  $('#solvedWithOneSub1').text(solve_one_sub1+ " ("+((solve_one_sub1 *100)/tried1).round(2)+"%)");



$('#user2').text(user2);

   var problems2={},
   max_count2=-Infinity,
   tried2=0,
   solve_one_sub2=0,
   total_submitted2=0,
   avg_attempt2=0,
   total_attempt2=0,
   max_attempt2=null,
   solved_probs2=[];

  for(var i=0;i<array2.length;i++){
      problems2[array2[i][1]]= (problems2[array2[i][1]] || 0)+1;
      if(array2[i][2]==90 && !solved_probs2.includes(array2[i][1])){
        solved_probs2.push(array2[i][1]);
      }
  }

  for(var x in problems2){
    tried2++;
    if(problems2[x] >max_count2){
       max_count2=problems2[x];
       max_attempt2=x;
       total_attempt2 += problems2[x];
    }
    if(problems2[x]==1)
      solve_one_sub2++;
      
  }

  $('#totalSubmitted2').text(array2.length);
  $('#tried2').text(tried2);
  $('#solved2').text(solved_probs2.length);
  $('#unsolved2').text(tried2 - solved_probs2.length);
  $('#averageAttempt2').text((array2.length/tried2).round(2))
  $.ajax(`https://uhunt.onlinejudge.org/api/p/id/${max_attempt2}`).then(function(data){
    $('#maxAttempt2').empty();
        $('#maxAttempt2').append(max_count2+" <a href='https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+max_attempt2+"' target='_blank'> ("+data.num+")</a>")
   })
  $('#solvedWithOneSub2').text(solve_one_sub2+ " ("+((solve_one_sub2 *100)/tried2).round(2)+"%)");


}

function commonProblemSolvedTable(array1,array2){

       var common=0;
       var problemSolved1=[];
       var problemSolved2=[];

       for(var i=0;i<array1.length;i++){
              if(array1[i][2]==90){
                   problemSolved1.push(array1[i][1]);
              }
       }

       problemSolved1 = problemSolved1.filter( function( item, index, inputArray ) {
              return inputArray.indexOf(item) == index;
       });

       for(var i=0;i<array2.length;i++){
              if(array2[i][2]==90){
                   problemSolved2.push(array2[i][1]);
              }
       }

       problemSolved2 = problemSolved2.filter( function( item, index, inputArray ) {
              return inputArray.indexOf(item) == index;
       });

       for(var i=0;i<problemSolved1.length;i++){
              for(var j=0;j<problemSolved2.length;j++){
                     if(problemSolved1[i]==problemSolved2[j]){
                            common ++;
                     }
              }
       }
        
       $('#commonSolved').text(common);
}

function submissionGraph(array1,array2,user1,user2){

       var years1=[],
           years2=[],
           dataset=[];
       var c1=0;


       array1.forEach(function(x){
              years1[yearConverter(x[4])]=(years1[yearConverter(x[4])] || 0) + 1;
       })

       dataset[c1]=["Submission",user1,user2];
       for(var i in years1){
           c1++;
           dataset[c1]=[i,years1[i],null];
       }


       array2.forEach(function(x){
              years2[yearConverter(x[4])]=(years2[yearConverter(x[4])] || 0) + 1;
       })


       for(var i in years2){
              c1++;
           dataset[c1]=[i,null,years2[i]];
           
       }

        for(var i=1;i<dataset.length;i++){
               for(var j=i+1;j<dataset.length;j++){
                      var temp=null;
                      if(dataset[i][0]==dataset[j][0]){
                             dataset[i][1]=dataset[i][1]+dataset[j][1];
                             dataset[i][2]=dataset[i][2]+dataset[j][2];
                             dataset.splice(j,1);
                            
                      }
                      if(dataset[i][0] > dataset[j][0]){
                            temp=dataset[j];
                            dataset[j]=dataset[i];
                            dataset[i]=temp;
                      }
               }
        }

       google.charts.load('current', {'packages':['line']});
       google.charts.setOnLoadCallback(drawChart);
 
     function drawChart() {
 
       var data = new google.visualization.arrayToDataTable(dataset);
 
       var options = {
         chart: {
           title: 'Submission',
         },
         legend:{ position: 'left', alignment: 'start' },
         width: 800,
         height: 300
       };
 
       var chart = new google.charts.Line(document.getElementById('subsChart'));
 
       chart.draw(data,options);
      }
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
           if( ! $('#commonTableContainer').hasClass('hide')){
              $('#commonTableContainer').addClass('hide');
           }
           if( ! $('#submissionGraphContainer').hasClass('hide')){
              $('#submissionGraphContainer').addClass('hide');
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
                              commonProblemSolvedTable(data1.subs,data2.subs);
                              submissionGraph(data1.subs,data2.subs,handle1,handle2)


                               $('#verdictsContainer').removeClass('hide');
                               $('#lansContainer').removeClass('hide');
                               $('#overviewTableContainer').removeClass('hide');
                               $('#commonTableContainer').removeClass('hide');
                               $('#submissionGraphContainer').removeClass('hide');

                               $('.mdl-spinner').removeClass('is-active');
                               $('.sharethis').removeClass('hide');
                               

                })
                       })
                 })
          })

      })

     // submitted button end

    })