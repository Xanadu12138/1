var MONTH,DAY,YEAR;
var lastday;
var Udate= new Date();
today = Udate;
MONTH = Udate.getMonth();
YEAR = Udate.getFullYear();
form1.month.options[MONTH].selected=true;
form1.year.value=YEAR;

var selectRow=-1,selectCol=-1,todayRow,todayCol;

(showday());
//为每一个格子绑定事件
for( var row=0;row<6;row++){
        for(var col=0;col<7;col++){
                var ele = document.getElementById("table2").rows[row].cells[col];
                //默认选中当前日期
                if(ele.innerHTML== today.getDate()){
                    todayRow = row;
                    todayCol = col;
                    selectRow = todayRow;
                    selectCol = todayCol;
                    ele.style.background="#01B468";
                }
                //鼠标移上去，底色变为橘色
                ele.onmouseover =( function(){
                var i=row,j=col;
                var element = document.getElementById("table2").rows[i].cells[j];
                return function(){
                if(!(i==selectRow && j==selectCol)&&!( i==todayRow && j==todayCol)&& element.innerHTML!=""  )
                    element.style.background="orange";
                }
            }());
                // 鼠标离开，恢复底色
                ele.onmouseout =( function(){
                var i=row,j=col;
                return function(){
                if(!(i==selectRow && j==selectCol)&&!( i==todayRow && j==todayCol)  )
                    document.getElementById("table2").rows[i].cells[j].style.background="#DCDCDC";
                }
            }());
                // 选中某一个大于当前的日期
                ele.onclick = ( function(){
                    var i=row,j=col;
                    var element = document.getElementById("table2").rows[i].cells[j];
                    return function(){                  
                        if( isBigger(i,j)&& element.innerHTML!=""){
                        if(!(selectRow==todayRow && selectCol==todayCol))
                            document.getElementById("table2").rows[selectRow].cells[selectCol].style.background="#DCDCDC";
                        element.style.background="#02DF82"; 
                        selectRow=i;
                        selectCol=j;
                        }
                    }
                }());
        }
}

//判断是否大于当前日期
function isBigger(row,col){
    var thisYear=today.getFullYear();
    var thisMonth = today.getMonth();
    // 如果年份>现在，或者同年，但是月份大于现在
    if(YEAR>thisYear|| (YEAR==thisYear && MONTH > thisMonth))
        return true;
    //如果同年且同月
    else if (YEAR==thisYear&& MONTH==thisMonth)
    {   var thisDay=today.getDate();
        var selectDay = document.getElementById("table2").rows[row].cells[col].innerHTML;
        if( thisDay < selectDay)            
            return true;    
    }
    else return false;
}

//判断要显示的月份有多少天
function lastday(){
    var total_day= new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    //判断是否为闰年
    if(MONTH==1&&(YEAR%4==0&&YEAR%100!=0)||(YEAR%400==0))
            lastDay=29;
    else
        lastDay=total_day[MONTH];
}

//显示日历
function showday(){
    var firstDay=new Date(YEAR,MONTH,1);
    var day=1,i;
    lastday();
    clear();
    //清楚之前所选中的日期
    if(selectRow!= -1)
    {   
        document.getElementById("table2").rows[selectRow].cells[selectCol].style.background="#DCDCDC";
    //如果回到当前月份，默认选中当日   
    if(YEAR==today.getFullYear() && MONTH== today.getMonth()){
        document.getElementById("table2").rows[todayRow].cells[todayCol].style.background="#01B468";
        }
    else
        document.getElementById("table2").rows[todayRow].cells[todayCol].style.background="#DCDCDC";

    }
    //显示日期
    for( var row=0;row<6;row++){
        if(row==0) i=firstDay.getDay();
        else i=0;
        for( ;i<7&&day<lastDay+1;i++,day++){
            document.getElementById("table2").rows[row].cells[i].innerHTML=day;
        }
    }
}

//翻页，清楚日历
function clear(){
    for( var i=0;i<7;i++){
        document.getElementById("table2").rows[0].cells[i].innerHTML="";
        document.getElementById("table2").rows[4].cells[i].innerHTML="";
    }
    document.getElementById("table2").rows[5].cells[0].innerHTML="";
    document.getElementById("table2").rows[5].cells[1].innerHTML="";

}

//显示上一个月
function lastmonth(){
    if(MONTH>0){
    MONTH--;
    form1.month.options[MONTH].selected=true;
    showday();
    }
    else if(MONTH==0){
    MONTH=11;
    form1.month.options[MONTH].selected=true;   
    YEAR--;
    form1.year.value=YEAR;
    showday();
    }
}
//显示下一个月
function nextmonth(){
    if(MONTH<11){
    MONTH++;
    form1.month.options[MONTH].selected=true;   
    showday();
    }
    else if(MONTH==11){
    MONTH=0;
    form1.month.options[MONTH].selected=true;   
    YEAR++;
    form1.year.value=YEAR;
    showday();
    }
}
//下拉框选择月份
function changeMonth(){
    MONTH=this.selectedIndex;
    showday();
}
// 输入框改变年份
function changeYear(){
    if(this.value>=1990&&this.value<=2099){
        YEAR=this.value;
        showday();
    }
    else {
        alert("输入年份范围:1990-2099");
        form1.year.value=YEAR;
    }
}

function toGray(){  
        this.style.background="#A6FFA6";
}

function recover(){
    this.style.background = "lightgreen";
}

document.getElementById("lastMonth").addEventListener("click",lastmonth,false);
document.getElementById("nextMonth").addEventListener("click",nextmonth,false);
document.getElementById("Month").addEventListener("change",changeMonth,false);
document.getElementById("Year").addEventListener("change",changeYear,false);
document.getElementById("lastMonth").addEventListener("mouseover",toGray,false);
document.getElementById("nextMonth").addEventListener("mouseover",toGray,false);
document.getElementById("Month").addEventListener("mouseover",toGray,false);
document.getElementById("Year").addEventListener("mouseover",toGray,false);
document.getElementById("lastMonth").addEventListener("mouseout",recover,false);
document.getElementById("nextMonth").addEventListener("mouseout",recover,false);
document.getElementById("Month").addEventListener("mouseout",recover,false);
document.getElementById("Year").addEventListener("mouseout",recover,false);
