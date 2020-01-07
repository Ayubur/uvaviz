function totalCount(array){

var count=0;
   for(var i=0;i<array.length;i++){
        if(array[i][2]==90)
               count ++;
    }

    return count;
}


// calculating unsolved problems
function unsolvedProblems (array,userId){
  // var unsolved_probs_id =[];
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

//displaying submission languages

function submissionLanguages(array,username){
  $('#lanTitle').text('Languages of '+username);

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
      series.labels.template.radius = am4core.percent(-80);
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
  $('#verdictTitle').text('Verdicts of '+username);

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




$(document).ready(function(){
    $('#handle').on('keydown', function(e){
        if(e.keyCode==13){
            e.preventDefault();
            var input_val = $(this).val();
            if( ! $('.mdl-grid').hasClass('hide')){
                 $('.mdl-grid').removeClass('hide')
            }
           $('.mdl-spinner').addClass('is-active');
           $('#unsolvedProblems').empty();
           $('.card-heading').empty();
          $.ajax(`https://uhunt.onlinejudge.org/api/uname2uid/${input_val}`).then(function(userId){ 
               if (userId <=0) {
				        $("#input-div").addClass("is-invalid");
				        $("#input-div").addClass("is-dirty");
                 $('.mdl-spinner').removeClass('is-active');
                  $('.mdl-grid').addClass('hide')
				        return;
				      }
           
           $('.mdl-spinner').removeClass('is-active');

              $.ajax(`https://uhunt.onlinejudge.org/api/subs-user/${userId}`).then(function(data){
                        submissionLanguages(data.subs,input_val);
                        verdict(data.subs,input_val);
                        unsolvedProblems(data.subs,userId);
                        $('.mdl-grid').removeClass('hide');
              })

            })

      }
    })
})