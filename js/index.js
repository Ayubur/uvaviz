Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};


///HeatMap Implementation


function dateConverter(timestamps){
  // var obj ={};

  // var a = new Date(timestamps * 1000);
  // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // var year = a.getFullYear();
  // var dayName = days[a.getDay()];
  // var month = a.getMonth()+1;
  // var date = a.getDate();
  // // var hour = a.getHours();
  // // var min = a.getMinutes();
  // // var sec = a.getSeconds();
  // // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  // var fullDate= year+"-"+month+"-"+date;
  
  // return fullDate;

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
  var chartData=[];

  for(var i=0;i<array.length;i++){
     var response = await fetch(`https://uhunt.onlinejudge.org/api/p/id/${array[i][1]}`);
     response.json().then((data)=>{
         if(data.status == 1)
             normal++;
        else if(data.status ==2)
             special_judged++;
     });
  }

  chartData=[

      {
        "Name":"Normal",
        "value":normal
      },
      {
        "Name":"Special Judged",
        "value":special_judged
      }
  ];

  $('#probsTag').removeClass('hide');
  $('#tagsTitle').text('Tags of '+username);

 am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("tagsChart", am4charts.PieChart);
chart.legend = new am4charts.Legend();
chart.legend.position="right";

// Add data
chart.data = chartData;

// Set inner radius
chart.innerRadius = am4core.percent(40);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
 pieSeries.ticks.template.disabled = true;
 pieSeries.labels.template.disabled = true;
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "Name";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

});

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

    chartData[0]={language: "ANSI C",total: ansi};
    chartData[1]={language: "JAVA",total: java};
    chartData[2]={language: "C++",total: cPlus};
    chartData[3]={language: "Pascal",total: pascal};
    chartData[4]={language: "C++ 11",total: cPlus11};

  $('#lans').removeClass('hide');
  $('#lanTitle').text('Languages of '+username);

am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      var chart = am4core.create("languageChart", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0;
      chart.data = chartData ;

      var series = chart.series.push(new am4charts.PieSeries3D());
      series.ticks.template.disabled = true;
      series.dataFields.value = "total";
      series.dataFields.depthValue = "total";
      series.dataFields.category = "language";
      series.slices.template.cornerRadius = 5;
      series.colors.step = 3;

      series.labels.template.text = "{category}";
      series.labels.template.radius = am4core.percent(-40);
      series.alignLabels = false;
      series.labels.template.fill = am4core.color("white");
      // series.labels.template.relativeRotation = 90;
      series.labels.template.adapter.add("hidden",(hidden, target)=>{
            return target.dataItem.values.value.percent < 5 ? true : false;
      });


})
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

    chartData[0]={error: "Submission Error",total: SE};
    chartData[1]={error: "Compiler Error",total: CE};
    chartData[2]={error: "Runtime Error",total: RE};
    chartData[3]={error: "Output Limit",total: OL};
    chartData[4]={error: "Time Limit",total: TL};
    chartData[5]={error: "Memory Limit",total: ML};
    chartData[6]={error: "Wrong Answer",total: WA};
    chartData[7]={error: "Presentation Error",total: PE};
    chartData[8]={error: "Accepted",total: Accepted};



      $('#verdicts').removeClass('hide');
      $('#verdictTitle').text('Verdicts of '+username);


    am4core.ready(function() {

          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end

          var chart = am4core.create("verdictChart", am4charts.PieChart3D);
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




//  Main Functions

$(document).ready(function(){
    $('#handle').on('keydown', function(e){
        if(e.keyCode==13){
            e.preventDefault();
            var input_val = $(this).val();
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

               if( ! $('.sharethis').hasClass('hide');){
                     $('.sharethis').addClass('hide');;
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
                              $('.mdl-spinner').removeClass('is-active');
                               return;
                        }

                        submissionLanguages(data.subs,input_val);
                        verdict(data.subs,input_val);
                        tagsOfProblems(data.subs,input_val);
                        overviewTable(data.subs,input_val);
                        unsolvedProblems(data.subs,userId);
                        displayHeatmaps(data.subs,input_val);

                       // $('.fb-share-button').css('display','block');
                      // $('.fb-like').removeClass('hide');
                       $('.sharethis').removeClass('hide');
                  
      
              })

            })

      }
    })
})