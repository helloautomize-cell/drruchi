(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var RMm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* IST open/closed */
  function ist(){var n=new Date(),u=n.getTime()+n.getTimezoneOffset()*60000;return new Date(u+5.5*3600000)}
  function status(close){var t=ist(),d=t.getDay(),h=t.getHours()+t.getMinutes()/60;
    if(d===3)return [false,"Closed Wednesdays · open Thu 10 am"];
    if(h<10)return [false,"Opens today at 10 am"];
    if(h>=close){var nd=(d+1)%7;return [false,nd===3?"Closed · open Thu 10 am":"Closed · opens tomorrow 10 am"]}
    var c=close===20?"8 pm":"8:30 pm";return [true,"Open now · until "+c]}
  function paint(el,close){if(!el)return;var s=status(close);el.classList.toggle("off",!s[0]);$("span",el).textContent=s[1]}
  $$(".live[data-close]").forEach(function(el){paint(el,parseFloat(el.getAttribute("data-close")))});
  paint($("#live-u"),20.5);

  /* header border + phone action bar */
  var hd=$("header.hd"),mb=$("#mbar"),hero=$(".hero5");
  function onS(){hd.classList.toggle("sc",scrollY>10);if(mb)mb.classList.toggle("show",hero.getBoundingClientRect().bottom<0)}
  addEventListener("scroll",onS,{passive:true});onS();

  /* mobile menu */
  var mn=$("#mnav"),mbtn=$(".menu");
  mbtn.addEventListener("click",function(){var o=mn.hasAttribute("hidden");if(o)mn.removeAttribute("hidden");else mn.setAttribute("hidden","");mbtn.setAttribute("aria-expanded",o?"true":"false")});
  $$("a",mn).forEach(function(a){a.addEventListener("click",function(){mn.setAttribute("hidden","");mbtn.setAttribute("aria-expanded","false")})});

  /* results: drag slider with counter, arrows, thumbnails and a one-time hint */
  /*RESULTS*/

  /* videos: full vertical reels; one plays at a time, with sound and controls */
  var vids=$$(".reel video,.story.vid video");
  function stopAll(except){vids.forEach(function(v){if(v!==except&&!v.paused){v.pause()}})}
  $$(".reel,.story.vid").forEach(function(card){var v=$("video",card),b=$(".rp",card);if(!v||!b)return;
    b.addEventListener("click",function(){stopAll(v);v.controls=true;card.classList.add("on");var p=v.play();if(p&&p.catch)p.catch(function(){})});
    v.addEventListener("pause",function(){if(v.currentTime===0||v.ended){card.classList.remove("on");v.controls=false}});
    v.addEventListener("ended",function(){card.classList.remove("on");v.controls=false;v.currentTime=0;v.load()});
    v.addEventListener("play",function(){stopAll(v)})});
  if("IntersectionObserver" in window){var vio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting&&!e.target.paused)e.target.pause()})},{threshold:.2});vids.forEach(function(v){vio.observe(v)})}

  /* booking */
  var days=$("#b-days"),t=ist(),DN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],MN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var earliest=document.createElement("label");earliest.innerHTML='<input type="radio" name="day" value="the earliest day" checked><span>Earliest<small>we can</small></span>';days.appendChild(earliest);
  for(var k=t.getHours()>=19?1:0,c=0;c<8;k++){var d=new Date(t.getFullYear(),t.getMonth(),t.getDate()+k);if(d.getDay()===3)continue;
    var lab=k===0?"Today":k===1?"Tomorrow":DN[d.getDay()],val=(k===0?"today, ":k===1?"tomorrow, ":"")+DN[d.getDay()]+" "+d.getDate()+" "+MN[d.getMonth()];
    var l=document.createElement("label");l.innerHTML='<input type="radio" name="day"><span>'+lab+'<small>'+d.getDate()+" "+MN[d.getMonth()]+'</small></span>';$("input",l).value=val;days.appendChild(l);c++}
  function val(n){var e=$('input[name="'+n+'"]:checked');return e?e.value:""}
  function msg(){return "Hello Dental Krafts, my name is "+($("#b-name").value.trim()||"…")+". I'd like to see "+val("doc")+" about "+val("con")+" at "+val("cl")+", on "+val("day")+" ("+val("tm")+")."}
  /* the chips in the hero and the treatment cards preselect the topic */
  var MAP={"Missing teeth":"missing teeth","Tooth pain":"tooth pain","A better smile":"a better smile","Crooked teeth":"braces or aligners","My child's teeth":"my child","Bleeding gums":"gums",
    "Replace missing teeth":"missing teeth","Save a tooth":"tooth pain","Smile design":"a better smile","Straighten teeth":"braces or aligners","Kids and teens":"my child","Gums and urgent care":"gums"};
  function pick(txt){var v=MAP[txt.trim()];if(!v)return;var i=$('input[name="con"][value="'+v+'"]');if(i)i.checked=true;
    if(v==="my child"){$('input[name="doc"][value="Dr Parmod Gulia"]').checked=true}else if(v==="missing teeth"||v==="a better smile"){$('input[name="doc"][value="Dr Ruchi Goel"]').checked=true}}
  $$(".chips a").forEach(function(a){a.addEventListener("click",function(){pick(a.textContent)})});
  $$(".tc").forEach(function(a){a.addEventListener("click",function(){pick($(".h3",a).textContent)})});
  $$(".doc5").forEach(function(d){var b=$(".btn",d);b.addEventListener("click",function(){$('input[name="doc"][value="'+(d.classList.contains("r")?"Dr Ruchi Goel":"Dr Parmod Gulia")+'"]').checked=true})});
  $("#b-wa").addEventListener("click",function(){window.open("https://wa.me/919810448720?text="+encodeURIComponent(msg()),"_blank","noopener")});
  $("#bk").addEventListener("submit",function(e){e.preventDefault();var er=$("#b-err"),n=$("#b-name").value.trim(),p=$("#b-ph").value.replace(/\D/g,"");
    if($("#b-hp").value)return;
    if(!n){er.textContent="Please enter your name.";$("#b-name").focus();return}
    if(p.length!==10){er.textContent="Please enter a 10-digit mobile number.";$("#b-ph").focus();return}
    er.textContent="";$("#bk-form").hidden=true;$("#ok-t").textContent="Thanks, "+n+". We'll call you on "+p.replace(/(\d{5})(\d{5})/,"$1 $2")+" within working hours to confirm "+val("day")+" with "+val("doc")+".";$("#bk-ok").classList.add("show")});
})();
