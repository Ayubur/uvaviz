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

  $('#user1').text(username);

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


//verdicts pie chart

function verdictsPieChart(array1,array2,user1,user2){

    
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

    chartData[0]={'error': "Submission Error",user1: SE1,user2:SE2};
    chartData[1]={'error': "Compiler Error",user1: CE1,user2:CE2};
    chartData[2]={'error': "Runtime Error",user1: RE1,user2:RE2};
    chartData[3]={'error': "Output Limit",user1: OL1,user2:OL2};
    chartData[4]={'error': "Time Limit",user1: TL1,user2:TL2};
    chartData[5]={'error': "Memory Limit",user1: ML1,user2:ML2};
    chartData[6]={'error': "Wrong Answer",user1: WA1,user2:WA2};
    chartData[7]={'error': "Presentation Error",user1: PE1,user2:PE2};
    chartData[8]={'error': "Accepted",user1: Accepted1,user2:Accepted2};

    console.log(chartData);

     am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

 // Create chart instance
var chart = am4core.create("verdictChart", am4charts.XYChart);

// Add data
chart.data = chartData;

// Create axes
var categorxAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categorxAxis.dataFields.category = "error";
categorxAxis.numberFormatter.numberFormat = "#";
categorxAxis.renderer.grid.template.location = 0;
categorxAxis.renderer.cellStartLocation = 0.1;
categorxAxis.renderer.cellEndLocation = 0.9;

var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis()); 

// Create series
function createSeries(field, name) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "error";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;

  var valueLabel = series.bullets.push(new am4charts.LabelBullet());
  // valueLabel.label.text = "{valueY}";
  // valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dx = 10;
  valueLabel.label.hideOversized = false;
  valueLabel.label.truncate = false;

  var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
  // categoryLabel.label.text = "{name}";
  // categoryLabel.label.horizontalCenter = "right";
  categoryLabel.label.dx = -10;
  categoryLabel.label.fill = am4core.color("#fff");
  categoryLabel.label.hideOversized = true;
  categoryLabel.label.truncate = false;
}

createSeries("user1", user1);
createSeries("user2", user2);

}); 


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



//overview table for second handler

function overviewTable2(array,username){

  $('#user2').text(username);

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

  // submitted button start
     
     $('#submitButton').on('click',async(e)=>{
            e.preventDefault();

          $('#verdictChart').empty();
           
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
                   $('#overviewTableContainer').addClass('hide');
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

                              verdictsPieChart(data1.subs,data2.subs,handle1,handle2);
                              overviewTable(data1.subs,data2.subs,handle1,handle2);


                               $('#verdictsContainer').removeClass('hide');
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