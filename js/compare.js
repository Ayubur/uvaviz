Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};




//submitted verdics for first handler
function verdict1(array,username){

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

    chartData[0]={error: "Submission Error",total: SE};
    chartData[1]={error: "Compiler Error",total: CE};
    chartData[2]={error: "Runtime Error",total: RE};
    chartData[3]={error: "Output Limit",total: OL};
    chartData[4]={error: "Time Limit",total: TL};
    chartData[5]={error: "Memory Limit",total: ML};
    chartData[6]={error: "Wrong Answer",total: WA};
    chartData[7]={error: "Presentation Error",total: PE};
    chartData[8]={error: "Accepted",total: Accepted};


      $('#verdictTitle1').text('Verdicts of '+username);


    am4core.ready(function() {

          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end

          var chart = am4core.create("verdictChart1", am4charts.PieChart3D);
          chart.hiddenState.properties.opacity = 0;
          chart.data = chartData ;

          var series = chart.series.push(new am4charts.PieSeries3D());
          //series.labels.template.disabled = true;
          series.ticks.template.disabled = true;
          series.labels.template.text = "{category}";
          series.labels.template.radius = am4core.percent(-80);
          series.alignLabels = false;
         series.labels.template.fill = am4core.color("white");
          series.labels.template.relativeRotation = 90;
          series.dataFields.value = "total";
          series.dataFields.depthValue = "total";
          series.dataFields.category = "error";
          series.slices.template.cornerRadius = 8;
          series.colors.step = 3;
          series.labels.template.adapter.add("hidden",(hidden, target)=>{
            return target.dataItem.values.value.percent < 5 ? true : false;
          });

    })
}


//overview table for first handler

function overviewTable1(array,username){

  $('.handle-text1').text(username);

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

  $('#totalSubmitted1').text(array.length);
  $('#tried1').text(tried);
  $('#solved1').text(solved_probs.length);
  $('#unsolved1').text(tried - solved_probs.length);
  $('#averageAttempt1').text((tried/total_attempt).round(2))
  $.ajax(`https://uhunt.onlinejudge.org/api/p/id/${max_attempt}`).then(function(data){
    $('#maxAttempt1').empty();
        $('#maxAttempt1').append(max_count+" <a href='https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+max_attempt+"' target='_blank'> ("+data.num+")</a>")
   })
  $('#solvedWithOneSub1').text(solve_one_sub+ " ("+((solve_one_sub *100)/tried).round(2)+"%)");
}


//submitted verdics for second handler
function verdict2(array,username){

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

    chartData[0]={error: "Submission Error",total: SE};
    chartData[1]={error: "Compiler Error",total: CE};
    chartData[2]={error: "Runtime Error",total: RE};
    chartData[3]={error: "Output Limit",total: OL};
    chartData[4]={error: "Time Limit",total: TL};
    chartData[5]={error: "Memory Limit",total: ML};
    chartData[6]={error: "Wrong Answer",total: WA};
    chartData[7]={error: "Presentation Error",total: PE};
    chartData[8]={error: "Accepted",total: Accepted};


      $('#verdictTitle2').text('Verdicts of '+username);


    am4core.ready(function() {

          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end

          var chart = am4core.create("verdictChart2", am4charts.PieChart3D);
          chart.hiddenState.properties.opacity = 0;
          chart.data = chartData ;

          var series = chart.series.push(new am4charts.PieSeries3D());
          //series.labels.template.disabled = true;
          series.ticks.template.disabled = true;
          series.labels.template.text = "{category}";
          series.labels.template.radius = am4core.percent(-80);
          series.alignLabels = false;
         series.labels.template.fill = am4core.color("white");
          series.labels.template.relativeRotation = 90;
          series.dataFields.value = "total";
          series.dataFields.depthValue = "total";
          series.dataFields.category = "error";
          series.slices.template.cornerRadius = 8;
          series.colors.step = 3;
          series.labels.template.adapter.add("hidden",(hidden, target)=>{
            return target.dataItem.values.value.percent < 5 ? true : false;
          });

    })
}

//overview table for second handler

function overviewTable2(array,username){

  $('.handle-text2').text(username);

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

  $('#totalSubmitted2').text(array.length);
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
          if( ! $('#overviewTableContainer').hasClass('hide')){
                   $('#overviewTable').addClass('hide');
           }



         // First User Handler

           $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${handle1}`).then(function(userId){
                if (userId <=0) {
                    $("#handle1Div").addClass("is-invalid");
                    $("#handle1Div").addClass("is-dirty");
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


                        verdict1(data.subs,handle1);
                        overviewTable1(data.subs,handle1);
                       
      
              })



           })



       // Second User Handler
         $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${handle2}`).then(function(userId){
                if (userId <=0) {
                    $("#handle2Div").addClass("is-invalid");
                    $("#handle2Div").addClass("is-dirty");
                    return;
              }


          $('.mdl-spinner').addClass('is-active');


          $.ajax(`https://uhunt.onlinejudge.org/api/subs-user/${userId}`).then(function(data){
                        
                if(data.subs.length <=0){
                              $("#input-div").addClass("is-invalid");
                              $("#input-div").addClass("is-dirty");
                              $('#handleDivErr').text("No data found for this user");
                              $('.mdl-spinner').removeClass('is-active');
                               return;
                }

                        verdict2(data.subs,handle2);
                        overviewTable2(data.subs,handle2);
                        $('.mdl-spinner').removeClass('is-active');
                        
      
          })

           })
               
               $('#verdictsContainer').removeClass('hide');
               $('#overviewTableContainer').removeClass('hide');
               $('.sharethis').removeClass('hide'); 
             
     })
})