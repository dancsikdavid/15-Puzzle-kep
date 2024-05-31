var p=setup.puzzle_fifteen,freeslot=[],size=[],m=[],o,f=document.getElementById("fifteen");
let startButton;

let startTime, interval;
const timerDisplay = document.createElement("div");

function startTimer() {
    startTime = new Date().getTime();
    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date().getTime();
    const elapsedTime = now - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    timerDisplay.innerHTML = `${minutes}m ${seconds}s`;
}

function stopTimer() {
    clearInterval(interval);
}

function createTimerDisplay() {
    timerDisplay.style.position = 'absolute';
    timerDisplay.style.top = '10px';
    timerDisplay.style.right = '10px';
    timerDisplay.style.backgroundColor = '#28a745';
    timerDisplay.style.color = '#fff';
    timerDisplay.style.padding = '10px 20px';
    timerDisplay.style.borderRadius = '8px';
    timerDisplay.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    timerDisplay.style.fontFamily = 'Arial, sans-serif';
    timerDisplay.style.fontSize = '70px';
    timerDisplay.style.zIndex = '1000';
    document.body.appendChild(timerDisplay);
}

function createStartButton() {
    startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    startButton.style.position = 'absolute';
    startButton.style.top = '50%';
    startButton.style.left = '50%';
    startButton.style.transform = 'translate(-50%, -50%)';
    startButton.style.padding = '10px 20px';
    startButton.style.fontSize = '16px';
    startButton.style.backgroundColor = '#28a745';
    startButton.style.color = '#fff';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.cursor = 'pointer';
    startButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    startButton.style.zIndex = '1000';
    document.body.appendChild(startButton);

    startButton.addEventListener("click", function() {
        ceation_slots();
        startTimer();
        startButton.style.display = 'none';
        createClickDisplay();
    });
}

createTimerDisplay();
createStartButton();

let clickCount = 0;
const clickDisplay = document.createElement("div");


function createClickDisplay() {
    clickDisplay.style.position = 'absolute';
    clickDisplay.style.top = '10px';
    clickDisplay.style.left = '10px';
    clickDisplay.style.backgroundColor = '#28a745';
    clickDisplay.style.color = '#fff';
    clickDisplay.style.padding = '10px 20px';
    clickDisplay.style.borderRadius = '8px';
    clickDisplay.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    clickDisplay.style.fontFamily = 'Arial, sans-serif';
    clickDisplay.style.fontSize = '70px';
    clickDisplay.style.zIndex = '1000';
    clickDisplay.innerHTML = `Clicks: ${clickCount}`;
    document.body.appendChild(clickDisplay);
}

function incrementClickCount() {
    clickCount++;
    clickDisplay.innerHTML = `Clicks: ${clickCount}`;
}

incrementClickCount();

e.setAttribute("onclick", `move_slot(${o}); incrementClickCount();`);

function ceation_slots(){
    size=[p.size[0]/(p.grid[0]+1),p.size[1]/(p.grid[1]+1)]
    var c=(p.emptySlot)?p.emptySlot:(p.grid[1]+1)*(p.grid[0]+1);
    f.style.width=p.size[0]+'px';
    f.style.height=p.size[1]+'px';
    f.style.position='relative';
    if(p.fill){fifteen_resize();window.addEventListener('resize',fifteen_resize,true);}
    o=1;
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(o!=c){
                if(!m[y]){m[y]=[]};m[y][x]=o;
                var e=document.createElement("div");
                e.id="slot"+o;
                e.setAttribute("onclick","move_slot("+o+")");
                e.className="slot";
                if(p.number){e.innerHTML=o}
                e.style="background-image:url("+p.art.url+");background-size:"+((p.art.ratio)? p.size[0]+"px auto":"auto "+p.size[1]+"px")+";background-position:-"+(size[0]*x)+"px -"+(size[1]*y)+"px ;width:"+size[0]+"px;height:"+size[1]+"px;top:"+(size[1]*y)+"px;left:"+(size[0]*x)+"px;position:absolute;"+((p.style)?p.style:"")
                if(p.time){e.style.transitionDuration=p.time+"s"}
                f.appendChild(e);o++;
            }else{m[y][x]=0;freeslot=[y,x];o++;}
        }
    }stir_slots();
}

function stir_slots(){
    for(var y=0;y<p.diff;y++){
        var a=[];
        if((Math.random()*2)>1){
            a=[freeslot[0]+(-1+Math.round(Math.random()*2)),freeslot[1]];
            if(a[0]<0){a[0]=a[0]+2}else if(a[0]>p.grid[1]){a[0]=a[0]-2}
        }else{
            a=[freeslot[0],freeslot[1]+(-1+Math.round(Math.random()*2))];
            if(a[1]<0){a[1]=a[1]+2}else if(a[1]>p.grid[0]){a[1]=a[1]-2}
        }
        var s=[m[freeslot[0]][freeslot[1]],m[a[0]][a[1]]]
        m[freeslot[0]][freeslot[1]]=s[1];m[a[0]][a[1]]=s[0]
        freeslot=[a[0],a[1]] 
    }
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(m[y][x]){
                var e=document.getElementById("slot"+m[y][x])
                e.style.left=(x*size[0])+"px";
                e.style.top =(y*size[1])+"px";
            }
        }
    }
}

function move_slot(s) {
    var z=0,e,a=[],k,j;
    function move(y,x,h,w){
        j=m[y][x]
        e=document.getElementById("slot"+j);
        e.style.left=((x+w)*size[0])+"px";
        e.style.top =((y+h)*size[1])+"px";
        m[y][x]=k;k=j;
    }
    for(var y=0;y<p.grid[1]+1;y++){
        for(var x=0;x<p.grid[0]+1;x++){
            if(m[y][x]==s){
                a=[y,x];k=0;
                if(freeslot[0]==a[0]){
                    if(freeslot[1]>a[1]){for(z=0;z<freeslot[1]-a[1];z++){move(a[0],a[1]+z,0,+1)}}
                    else if(freeslot[1]<a[1]){for(z=0;z<a[1]-freeslot[1];z++){move(a[0],a[1]-z,0,-1)}}
                    m[freeslot[0]][freeslot[1]]=k;freeslot=[a[0],a[1]];s=false;break;
                }else if(freeslot[1]==a[1]){
                    if(freeslot[0]>a[0]){for(z=0;z<freeslot[0]-a[0];z++){ move(a[0]+z,a[1],+1,0)}}
                    else if(freeslot[0]<a[0]){for(z=0;z<a[0]-freeslot[0];z++){move(a[0]-z,a[1],-1,0)}}
                    m[freeslot[0]][freeslot[1]]=k;freeslot=[a[0],a[1]];s=false;break;
                }
            }if(!s){break;}
        }if(!s){break;}
    }check_slots();
}

function check_slots(){
    var check=1;
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(m[y][x]==0||check==m[y][x]){check++}else{break;}
        }
    }if(check==o){setTimeout(()=>{ alert('win'); stopTimer(); },((p.time)?p.time*1000:0));}
}

function fifteen_resize(){
    var rect=f.parentNode.getBoundingClientRect();
    if((p.size[0]/p.size[1])<(rect.width/rect.height)){f.style.transform='scale('+(rect.height/p.size[1])+')'}
    else{f.style.transform='scale('+(rect.width/p.size[0])+')'}
}

if(p.keyBoard){document.addEventListener("keydown",function(e){
    e=e.keyCode;
         if(e==37){move_slot(m[freeslot[0]][freeslot[1]+1]);}
    else if(e==39){move_slot(m[freeslot[0]][freeslot[1]-1]);}
    else if(e==38){move_slot(m[freeslot[0]+1][freeslot[1]]);}
    else if(e==40){move_slot(m[freeslot[0]-1][freeslot[1]]);}
})}

let gamepad,gamepadPress;
if(p.gamePad){window.addEventListener('gamepadconnected',function(e){
        const update=()=>{
            for (gamepad of navigator.getGamepads()){
                if (!gamepad) continue;
                const statenow=gamepad.buttons.some(btn=>btn.pressed);
                if (gamepadPress!==statenow){
                    gamepadPress=statenow;
                         if(gamepad.buttons[12].pressed&&m[freeslot[0]+1]){move_slot(m[freeslot[0]+1][freeslot[1]]);}
                    else if(gamepad.buttons[14].pressed&&m[freeslot[0]])  {move_slot(m[freeslot[0]][freeslot[1]+1]);}
                    else if(gamepad.buttons[15].pressed&&m[freeslot[0]])  {move_slot(m[freeslot[0]][freeslot[1]-1]);}
                    else if(gamepad.buttons[13].pressed&&m[freeslot[0]-1]){move_slot(m[freeslot[0]-1][freeslot[1]]);}
                }
            }
            requestAnimationFrame(update);
        };update();
    });
}
