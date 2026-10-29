/* Dental Krafts motion layer v4. Vanilla JS, no dependencies except optional Lenis (window.Lenis).
   Call DKM.init(root) once per page (in Next.js: from a client component on each route change, and DKM.destroy() on unmount).
   Attributes it understands:
     data-split            headline: words rise out of masks
     data-r                block fades and rises; data-r="left" slides from the left; data-r="stagger" staggers its children
     data-delay="ms"       extra delay for data-r / data-split
     data-unveil           photo frame opens from an inset clip while the image settles
     data-par="0.08"       parallax for the image inside (negative values move the other way)
     data-count            counts the number in its text up from zero
     data-cursor="Drag"    shows the round cursor label over this element
     data-carousel         scroll-snap carousel: needs [data-track]; optional [data-prev] [data-next] [data-progress] [data-counter], data-autoplay="ms"
     data-pin-x            pinned horizontal scroll on desktop: needs .pin and [data-pin-track]; optional [data-progress]
     data-steps            scroll-linked progress line across steps (sets --sp 0..1; children .st get .on)
     data-acc              smooth open/close for the <details> inside */
(function(){
  "use strict";
  var W=window,D=document,H=D.documentElement;
  var RM=W.matchMedia("(prefers-reduced-motion: reduce)");
  var FINE=W.matchMedia("(hover: hover) and (pointer: fine)");
  var DESK=W.matchMedia("(min-width: 981px)");
  var EASE="cubic-bezier(.19,1,.22,1)";
  var $$=function(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))};
  var clamp=function(v,a,b){return v<a?a:v>b?b:v};
  var lenis=null,io=null,offs=[],scrollFns=[],resizeFns=[],raf=0,lastY=-1;

  function motionOK(){return !RM.matches}

  /* ---------- split headlines into word masks ---------- */
  function split(el){
    if(el.__split)return;el.__split=1;
    var label=el.textContent.replace(/\s+/g," ").trim(),i=0;
    el.setAttribute("aria-label",label);
    (function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var parts=n.textContent.split(/(\s+)/),frag=D.createDocumentFragment();
          parts.forEach(function(p){
            if(!p)return;
            if(/^\s+$/.test(p)){frag.appendChild(D.createTextNode(" "));return}
            var w=D.createElement("span");w.className="w";w.setAttribute("aria-hidden","true");
            var wi=D.createElement("span");wi.className="wi";wi.style.setProperty("--i",i++);wi.textContent=p;
            w.appendChild(wi);frag.appendChild(w);
          });
          node.replaceChild(frag,n);
        }else if(n.nodeType===1&&!n.classList.contains("w")){walk(n)}
      });
    })(el);
    var d=parseInt(el.getAttribute("data-delay")||"0",10);
    if(d)$$(".wi",el).forEach(function(w){w.style.transitionDelay="calc(var(--i)*55ms + "+d+"ms)"});
  }

  /* ---------- count up ---------- */
  function countUp(el){
    var txt=el.textContent,m=txt.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if(!m)return;
    var pre=m[1],num=parseFloat(m[2].replace(/,/g,"")),post=m[3],dec=(m[2].split(".")[1]||"").length,t0=null,dur=1500;
    function fmt(v){return pre+(dec?v.toFixed(dec):Math.round(v).toLocaleString("en-IN"))+post}
    el.style.minWidth=el.getBoundingClientRect().width+"px";
    function step(t){if(!t0)t0=t;var p=clamp((t-t0)/dur,0,1),e=1-Math.pow(2,-10*p);el.textContent=fmt(num*(p===1?1:e));if(p<1)requestAnimationFrame(step);else el.textContent=txt}
    el.textContent=fmt(0);requestAnimationFrame(step);
  }

  /* ---------- reveal on enter ---------- */
  function play(el){
    if(el.hasAttribute("data-in"))return;
    /* split lazily on first reveal — mutating pre-hydration DOM causes a hydration mismatch */
    if(el.hasAttribute("data-split")&&!el.__split){split(el);void el.offsetWidth}
    el.setAttribute("data-in","");
    var d=parseInt(el.getAttribute("data-delay")||"0",10),r=el.getAttribute("data-r");
    if(r===null){}else if(r==="stagger"){
      Array.prototype.slice.call(el.children).forEach(function(c,i){
        c.animate([{opacity:0,transform:"translateY(26px)"},{opacity:1,transform:"none"}],{duration:1000,delay:d+i*75,easing:EASE,fill:"backwards"});
      });
    }else{
      var from=r==="left"?"translateX(-28px)":"translateY(28px)";
      el.animate([{opacity:0,transform:from},{opacity:1,transform:"none"}],{duration:1100,delay:d,easing:EASE,fill:"backwards"});
    }
    if(el.hasAttribute("data-count"))setTimeout(function(){countUp(el)},d+150);
  }
  function observe(root){
    var els=$$("[data-split],[data-r],[data-unveil],[data-count],.eb",root);
    if(!motionOK()){els.forEach(function(e){e.setAttribute("data-in","")});return}
    io=io||new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){play(e.target);io.unobserve(e.target)}})},{rootMargin:"0px 0px -9% 0px",threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }

  /* ---------- one scroll loop for parallax, header, pins, steps ---------- */
  function onFrame(){
    raf=0;var y=W.scrollY;if(y===lastY)return;var dir=y>lastY?1:-1;lastY=y;
    scrollFns.forEach(function(f){f(y,dir)});
  }
  function req(){if(!raf)raf=requestAnimationFrame(onFrame)}
  function onResize(){lastY=-1;resizeFns.forEach(function(f){f()});req()}

  function parallax(root){
    if(!motionOK())return;
    var items=$$("[data-par]",root).map(function(el){return{el:el,img:el.querySelectorAll("img"),f:parseFloat(el.getAttribute("data-par"))||.08}});
    scrollFns.push(function(){
      var vh=W.innerHeight;
      items.forEach(function(it){
        var r=it.el.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)return;
        var p=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);
        var px=(-p*it.f*r.height).toFixed(1)+"px";
        for(var i=0;i<it.img.length;i++)it.img[i].style.translate="0 "+px;
      });
    });
  }

  function header(){
    var hd=D.querySelector("header.hd");if(!hd)return;
    var mn=D.getElementById("mnav"),acc=0;
    scrollFns.push(function(y,dir){
      var max=H.scrollHeight-W.innerHeight;hd.style.setProperty("--sp",max>0?(y/max).toFixed(4):0);
      hd.classList.toggle("pill",y>120);
      if(!motionOK())return;
      var open=mn&&!mn.hasAttribute("hidden");
      acc=dir>0?Math.max(0,acc)+1:Math.min(0,acc)-1;
      if(open||y<420)hd.classList.remove("hide");
      else if(acc>3)hd.classList.add("hide");
      else if(acc<-1)hd.classList.remove("hide");
    });
    /* scroll-spy: underline the link for the section in view */
    var links=$$('.nav a[href^="#"]',hd),map={};
    links.forEach(function(a){var s=D.querySelector(a.getAttribute("href"));if(s)map[s.id]=a});
    if(!("IntersectionObserver" in W)||!links.length)return;
    var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.remove("on")});var l=map[e.target.id];if(l)l.classList.add("on")}})},{rootMargin:"-45% 0px -50% 0px"});
    Object.keys(map).forEach(function(id){spy.observe(D.getElementById(id))});
  }

  /* ---------- cursor label ---------- */
  function cursor(root){
    if(!FINE.matches||!motionOK())return;
    var c=D.querySelector(".cur");if(!c){c=D.createElement("div");c.className="cur";c.setAttribute("aria-hidden","true");D.body.appendChild(c)}
    var x=0,y=0,cx=0,cy=0,run=0;
    function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform="translate("+cx+"px,"+cy+"px)";if(Math.abs(x-cx)+Math.abs(y-cy)>.3)run=requestAnimationFrame(loop);else run=0}
    $$("[data-cursor]",root).forEach(function(el){
      el.addEventListener("pointerenter",function(e){c.textContent=el.getAttribute("data-cursor");c.dataset.tone=el.getAttribute("data-cursor-tone")||"";x=cx=e.clientX;y=cy=e.clientY;c.style.transform="translate("+x+"px,"+y+"px)";c.classList.add("on")});
      el.addEventListener("pointermove",function(e){x=e.clientX;y=e.clientY;if(!run)run=requestAnimationFrame(loop)});
      el.addEventListener("pointerleave",function(){c.classList.remove("on")});
    });
  }

  /* ---------- magnetic buttons ---------- */
  function magnetic(root){
    if(!FINE.matches||!motionOK())return;
    $$(".btn-p,.btn-wa,.qnav button",root).forEach(function(b){
      b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);b.style.transform="translate("+(dx*.16).toFixed(1)+"px,"+(dy*.28).toFixed(1)+"px)"});
      b.addEventListener("pointerleave",function(){b.style.transform=""});
    });
  }

  /* ---------- carousel ---------- */
  function carousel(el){
    var tr=el.querySelector("[data-track]");if(!tr)return;
    var items=Array.prototype.slice.call(tr.children),prev=el.querySelector("[data-prev]"),next=el.querySelector("[data-next]");
    var bar=el.querySelector("[data-progress]"),ctr=el.querySelector("[data-counter]");
    var auto=parseInt(el.getAttribute("data-autoplay")||"0",10),timer=0,hold=0,visible=false,hover=false;
    function idx(){var l=tr.scrollLeft+parseFloat(getComputedStyle(tr).scrollPaddingLeft||0)+4,b=0;items.forEach(function(it,i){if(it.offsetLeft<=l)b=i});return b}
    function max(){return tr.scrollWidth-tr.clientWidth}
    function go(i){i=(i+items.length)%items.length;var pad=parseFloat(getComputedStyle(tr).scrollPaddingLeft||0);tr.scrollTo({left:items[i].offsetLeft-pad,behavior:motionOK()?"smooth":"auto"})}
    function upd(){var m=max(),p=m>0?tr.scrollLeft/m:1,i=idx();if(tr.scrollLeft>=m-4)i=items.length-1;
      if(bar)bar.style.setProperty("--p",Math.max(p,(1/items.length)).toFixed(3));
      if(ctr)ctr.innerHTML=String(i+1).padStart(2,"0")+" <span>/ "+String(items.length).padStart(2,"0")+"</span>";
      if(prev)prev.disabled=tr.scrollLeft<4&&!auto;}
    function step(d){var i=idx();if(d>0&&tr.scrollLeft>=max()-4)go(0);else go(i+d)}
    if(prev)prev.addEventListener("click",function(){stop();step(-1)});
    if(next)next.addEventListener("click",function(){stop();step(1)});
    tr.addEventListener("scroll",function(){requestAnimationFrame(upd)},{passive:true});
    tr.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){e.preventDefault();stop();step(1)}if(e.key==="ArrowLeft"){e.preventDefault();stop();step(-1)}});
    /* mouse drag (touch uses native swipe) — skipped on data-nodrag rails */
    var down=false,sx=0,sl=0,moved=0,dragged=false;
    if(!el.hasAttribute("data-nodrag")){
    tr.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse"||e.button!==0)return;down=true;dragged=false;moved=0;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add("drag");stop()});
    W.addEventListener("pointermove",function(e){if(!down)return;var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));tr.scrollLeft=sl-dx});
    W.addEventListener("pointerup",function(){if(!down)return;down=false;tr.classList.remove("drag");var v=tr.scrollLeft-sl,i=idx();if(moved<6)return;dragged=Math.abs(v)>8;if(v>40)i=Math.min(i+1,items.length-1);go(i)});
    tr.addEventListener("click",function(e){if(dragged){dragged=false;e.preventDefault();e.stopPropagation()}},true);
    tr.addEventListener("dragstart",function(e){e.preventDefault()});
    }
    /* autoplay: only in view, never while hovered, stops for good after the visitor takes over */
    function stop(){hold=1;clearInterval(timer);timer=0}
    function tick(){if(!D.body.contains(el)){clearInterval(timer);return}if(!hold&&visible&&!hover&&!D.hidden)step(1)}
    if(auto&&motionOK()){
      timer=setInterval(tick,auto);
      el.addEventListener("pointerenter",function(){hover=true});el.addEventListener("pointerleave",function(){hover=false});
      el.addEventListener("focusin",function(){hover=true});el.addEventListener("focusout",function(){hover=false});
      new IntersectionObserver(function(es){visible=es[0].isIntersecting},{threshold:.35}).observe(el);
      tr.addEventListener("touchstart",stop,{passive:true});
    }
    resizeFns.push(upd);upd();
  }

  /* ---------- pinned horizontal strip ---------- */
  function pinX(sec){
    var pin=sec.querySelector(".pin"),tr=sec.querySelector("[data-pin-track]"),bar=sec.querySelector("[data-progress]");if(!pin||!tr)return;
    var dist=0,on=false,cards=Array.prototype.slice.call(tr.children);
    function measure(){
      on=DESK.matches&&motionOK();sec.classList.toggle("pinned",on);
      if(!on){sec.style.height="";tr.style.transform="";return}
      dist=Math.max(0,tr.scrollWidth-pin.clientWidth);
      sec.style.height=(pin.offsetHeight+dist)+"px";
    }
    resizeFns.push(measure);measure();
    scrollFns.push(function(){
      if(!on)return;
      var top=sec.getBoundingClientRect().top,p=dist?clamp(-top/dist,0,1):0;
      tr.style.transform="translate3d("+(-p*dist).toFixed(1)+"px,0,0)";
      if(bar)bar.style.setProperty("--p",p.toFixed(3));
      var mid=W.innerWidth/2;
      cards.forEach(function(c){var r=c.getBoundingClientRect();c.classList.toggle("lit",Math.abs(r.left+r.width/2-mid)<r.width*.75)});
    });
  }

  /* ---------- steps progress ---------- */
  function steps(el){
    var st=$$(".st",el);
    if(!motionOK()){st.forEach(function(s){s.classList.add("on")});el.style.setProperty("--sp",1);return}
    scrollFns.push(function(){
      var r=el.getBoundingClientRect(),vh=W.innerHeight;
      var p=clamp((vh*.82-r.top)/(r.height*.5+vh*.3),0,1);
      el.style.setProperty("--sp",p.toFixed(3));
      st.forEach(function(s,i){s.classList.toggle("on",p>=(i)/st.length+.02)});
    });
  }

  /* ---------- smooth accordion ---------- */
  function acc(root){
    $$("[data-acc] details",root).forEach(function(d){
      var s=d.querySelector("summary"),body=s.nextElementSibling;if(!body)return;
      s.addEventListener("click",function(e){
        if(!motionOK())return;e.preventDefault();
        if(d.open){var h=body.offsetHeight;d.classList.add("closing");
          body.animate([{height:h+"px",opacity:1},{height:"0px",opacity:0}],{duration:380,easing:EASE}).onfinish=function(){d.open=false;d.classList.remove("closing")};
        }else{d.open=true;var h2=body.offsetHeight;
          body.animate([{height:"0px",opacity:0},{height:h2+"px",opacity:1}],{duration:520,easing:EASE});}
      });
    });
  }

  /* ---------- smooth scrolling ---------- */
  function smooth(){
    if(!motionOK()||!W.Lenis||!FINE.matches||lenis)return;
    var L=lenis=new W.Lenis({lerp:.11,wheelMultiplier:1,smoothWheel:true});
    function f(t){if(lenis!==L)return;L.raf(t);requestAnimationFrame(f)}requestAnimationFrame(f);
    if(D.__dkAnchors)return;D.__dkAnchors=1;
    D.addEventListener("click",function(e){
      if(!lenis)return;
      var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
      var id=a.getAttribute("href");if(id.length<2)return;var t=D.querySelector(id);if(!t)return;
      e.preventDefault();lenis.scrollTo(t,{offset:id==="#top"?0:-84,duration:1.3});
    });
  }

  function init(root){
    root=root||D;
    smooth();observe(root);parallax(root);header();cursor(root);magnetic(root);acc(root);
    $$("[data-carousel]",root).forEach(carousel);
    $$("[data-pin-x]",root).forEach(pinX);
    $$("[data-steps]",root).forEach(steps);
    W.addEventListener("scroll",req,{passive:true});W.addEventListener("resize",onResize);
    W.addEventListener("load",onResize);
    if(D.fonts&&D.fonts.ready)D.fonts.ready.then(onResize);
    onResize();
  }
  function destroy(){
    if(io){io.disconnect();io=null}scrollFns=[];resizeFns=[];
    W.removeEventListener("scroll",req);W.removeEventListener("resize",onResize);
    if(lenis){lenis.destroy();lenis=null}
  }
  W.DKM={init:init,destroy:destroy,lenis:function(){return lenis},scrollTo:function(t,o){if(lenis)lenis.scrollTo(t,o);else (typeof t==="string"?D.querySelector(t):t).scrollIntoView({behavior:"smooth"})}};
})();

export {}
