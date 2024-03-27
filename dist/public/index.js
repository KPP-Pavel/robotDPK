const tryApp=async t=>{const e=document.getElementById("result");e.innerHTML="...загрузка";try{await t(e)}catch(t){console.log("err",t),e.innerHTML="Ошибка, нет данных"}},fetchData=async()=>await fetch("https://openweathermap.org/data/2.5/onecall?lat=55.7522&lon=37.6156&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02"),getCurrentForecast=()=>{tryApp((async t=>{const e=await fetchData(),a=(await e.json()).current,n=extructHTML(a);t.innerHTML=n}))},get8DaysForecast=()=>{tryApp((async t=>{const e=await fetchData(),a=(await e.json()).daily,n=a?.map((t=>extructHTML(t))).join("*******************");t.innerHTML=n}))},getTemp=t=>null!=t.temp.min?`мин: ${t.temp.min}°, макс: ${t.temp.max}°`:`${t.temp}°`,getTempFeelsLike=t=>null!=t.temp.day?`ночь: ${t.temp.night}°, день: ${t.temp.day}°`:`${t.temp}°`,getVisibility=t=>t.visibility?`<div>Видимость: ${(t.visibility/1e3).toFixed(1)}км</div>`:"",extructHTML=t=>{if(!t)throw new Error("empty data");return`\n        <div>Дата: ${getDate(t.dt)}</div>\n        <div>Температура: ${getTemp(t)}</div>\n        <div>Ощущается как: ${getTempFeelsLike(t)}°</div>\n        <div>Облачность: ${t.clouds}%</div>\n        <div>Влажность: ${t.humidity}%</div>\n        <div>Давление: ${t.pressure}hPa</div>\n        <div>Восход солнца: ${getTime(t.sunrise)}</div>\n        <div>Заход солнца: ${getTime(t.sunset)}</div>\n        ${getVisibility(t)}\n        <div>Скорость ветра: ${t.wind_speed}</div>\n    `},getDtNum=t=>t<10?`0${t}`:t,getDate=t=>{const e=new Date(1e3*t),a=e.getFullYear(),n=getDtNum(e.getMonth()+1);return`${e.getDate()}.${n}.${a}`},getTime=t=>{const e=new Date(1e3*t);return`${getDtNum(e.getHours())}:${getDtNum(e.getMinutes())}:${getDtNum(e.getSeconds())}`},printChart=()=>{tryApp((async t=>{const e=await fetchData(),a=await e.json();t.innerHTML='<canvas id="myChart1"></canvas>\n        <canvas id="myChart2"></canvas>\n        <canvas id="myChart3"></canvas>\n        <canvas id="myChart4"></canvas>';const n=document.getElementById("myChart1"),i=document.getElementById("myChart2"),r=document.getElementById("myChart3"),d=document.getElementById("myChart4"),s=a.daily,m=s.map((t=>getDate(t.dt))),c=s.map((t=>((t.temp.max+t.temp.min)/2).toFixed(2))),o=s.map((t=>t.pressure)),p=s.map((t=>t.wind_speed)),l=s.map((t=>t.clouds)),y=(t,e)=>({type:"line",data:{labels:m,datasets:[{label:t,data:e,fill:!1,borderColor:"rgb(75, 192, 192)"}]},options:{scales:{y:{beginAtZero:!0}}}});new Chart(n,y("Температура",c)),new Chart(i,y("Давление",o)),new Chart(r,y("Облачность",l)),new Chart(d,y("Скорость ветра",p))}))};