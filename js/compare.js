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

    chartData[0]={'error': "Submission Error",user1: SE1,user2:SE2};
    chartData[1]={'error': "Compiler Error",user1: CE1,user2:CE2};
    chartData[2]={'error': "Runtime Error",user1: RE1,user2:RE2};
    chartData[3]={'error': "Output Limit",user1: OL1,user2:OL2};
    chartData[4]={'error': "Time Limit",user1: TL1,user2:TL2};
    chartData[5]={'error': "Memory Limit",user1: ML1,user2:ML2};
    chartData[6]={'error': "Wrong Answer",user1: WA1,user2:WA2};
    chartData[7]={'error': "Presentation Error",user1: PE1,user2:PE2};
    chartData[8]={'error': "Accepted",user1: Accepted1,user2:Accepted2};

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

 // Create chart instance
var chart = am4core.create("verdictChart", am4charts.XYChart);
chart.legend = new am4charts.Legend();
chart.legend.position="top";

// Add data
chart.data = chartData;

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "error";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.maxGridDistance = 20;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;

var label = categoryAxis.renderer.labels.template;
label.maxWidth=130;

var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;


//Create series
function createSeries(field, name, stacked) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "error";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
  series.stacked = stacked;
  series.columns.template.width = am4core.percent(95);
}

categoryAxis.events.on("sizechanged", function(ev) {
var axis = ev.target;
  var cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
  if (cellWidth < axis.renderer.labels.template.maxWidth) {
    axis.renderer.labels.template.rotation = -45;
    axis.renderer.labels.template.horizontalCenter = "right";
    axis.renderer.labels.template.verticalCenter = "middle";
  }
  else {
    axis.renderer.labels.template.rotation = 0;
    axis.renderer.labels.template.horizontalCenter = "middle";
    axis.renderer.labels.template.verticalCenter = "top";
  }
});


createSeries("user1", user1,false);
createSeries("user2", user2,false);

}); 


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

    chartData[0]={language: "ANSI C",user1:ansi1,user2:ansi2};
    chartData[1]={language: "JAVA",user1:java1,user2:java2};
    chartData[2]={language: "C++",user1:cPlus1,user2:cPlus2};
    chartData[3]={language: "Pascal",user1:pascal1,user2:pascal2};
    chartData[4]={language: "C++ 11",user1:cPlus111,user2:cPlus112};

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

 // Create chart instance
var chart = am4core.create("lanChart", am4charts.XYChart);

// Add data
chart.legend = new am4charts.Legend();
chart.legend.position="top";

// Add data
chart.data = chartData;

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "language";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.maxGridDistance = 20;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;

var label = categoryAxis.renderer.labels.template;
label.maxWidth=100;
label.wrap=true;

var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;


//Create series
function createSeries(field, name, stacked) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "language";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
  series.stacked = stacked;
  series.columns.template.width = am4core.percent(95);
}


createSeries("user1", user1,false);
createSeries("user2", user2,false);

});

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

            am4core.disposeAllCharts();


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