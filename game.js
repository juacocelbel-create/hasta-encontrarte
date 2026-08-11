const mensajesCofres=[
"Al conocerte fue mi salvación. Me salvaste de mi dolor, mi cabeza; me sanaste las heridas que tú no provocaste, pero aun así lo hiciste.",
"A pesar de las cosas que se decían de mí, me elegiste sobre todas esas cosas. Decidiste creer en mí como nadie lo hizo antes, menos de esa forma. Gracias.",
"Desde el momento que te vi sabía que eras para mí, aunque tenía miedo de dañarte con mis problemas, con mis palabras y acciones. Pero aun así me esfuerzo todos los días para cambiar lo malo de mí.",
"De verdad estoy enamorado. Estoy loco por ti. No me crees, pero noche tras noche pienso en ti, en cómo hacerte feliz, en cómo cuidarte, en qué puedo hacer para ser el hombre que mereces.",
"Me has visto llorar por las cosas más leves, por un beso, por un abrazo. Porque me miras, lloro porque te amo. Me siento seguro mostrándome indefenso junto a ti.",
"Ya no sé cómo decirte que te amo. Te lo he dicho de muchas maneras, de muchas formas, pero no es suficiente.",
"Eres fuerte, no sé cómo lo haces. Cada día te veo seguir adelante. No sé cómo, pero te admiro. De verdad te admiro. Yo he pensado en rendirme tantas veces. Antes de conocerte estaba tan decidido, pero tú me salvaste, me diste una razón para no rendirme.",
"He dicho muchas cosas de la forma en que te amo, cómo me siento, cómo me sentía y cómo te veo. Simplemente eres tú. No hay nadie más que tú.",
"Eres única, mi amorcito. Me has hecho ser un hombre distinto. Ni en un millón de años encontraría a alguien como tú. Sé que hemos avanzado muy rápido en nuestra relación, pero siento que debió ser así, porque si no hubiera sido así, el tiempo no sería igual.",
"De verdad quiero una vida contigo. Tener hijos. Te apoyaré siempre. Quiero que en algún momento vivamos juntos. Sé que es apresurado, pero quiero todo contigo."
];

const world=document.getElementById("world"),player=document.getElementById("player");
let level=1,x=100,y=80,vx=0,vy=0,onGround=false,running=false,emoji="👨",platforms=[],traps=[],chestCollected=false,chestX=2200,chestY=390;

function startGame(g){
 emoji=g==="male"?"👨":"👩"; player.textContent=emoji;
 document.getElementById("menu").style.display="none"; document.getElementById("game").style.display="block";
 running=true; loadLevel(); requestAnimationFrame(loop);
}
function clearLevel(){world.querySelectorAll(".platform,.trap,.chest,.finish").forEach(e=>e.remove());platforms=[];traps=[]}
function platform(l,b,w){let e=document.createElement("div");e.className="platform";e.style.cssText=`left:${l}px;bottom:${b}px;width:${w}px`;world.appendChild(e);platforms.push({l,r:l+w,b})}
function trap(l,b){let e=document.createElement("div");e.className="trap";e.textContent="🔺";e.style.cssText=`left:${l}px;bottom:${b}px`;world.appendChild(e);traps.push({l,r:l+35,b})}
function loadLevel(){
 clearLevel();x=100;y=80;vx=vy=0;
 document.getElementById("levelText").textContent=`Nivel ${level} / 10`;
 platform(0,0,650);
 platform(720,80,260);
 platform(1030,150,280);
 platform(1360,210,300);
 platform(1720,150,300);
 platform(2080,230,320);
 platform(2460,170,320);
 platform(2840,250,320);
 platform(3220,320,360);
 platform(3660,390,420);
 // Pinchos separados y fáciles de esquivar.
 [650,990,1310,1660,2020,2400,2780,3160,3580].forEach((n,i)=>{
   const bases=[0,80,150,210,150,230,170,250,320];
   trap(n,bases[i]);
 });
 chestCollected=false;
 // Una sola caja física por nivel; al tocarla se recoge automáticamente.
 const chestPositions=[
   [500,25],[900,105],[1210,175],[1540,235],[1900,175],
   [2260,255],[2640,195],[3020,275],[3400,345],[3820,415]
 ];
 [chestX,chestY]=chestPositions[level-1] || chestPositions[0];
 let c=document.createElement("div");c.className="chest";c.id="levelChest";c.textContent="📦";c.style.cssText=`left:${chestX}px;bottom:${chestY}px`;world.appendChild(c);
 let f=document.createElement("div");f.className="finish";f.textContent=level===10?"❤️":"🚪";f.style.cssText="left:3550px;bottom:500px";world.appendChild(f);
}
function openChest(){
 if(chestCollected || !running)return;
 chestCollected=true;
 const c=document.getElementById("levelChest");
 if(c)c.remove();
 running=false;
 document.getElementById("message").textContent=mensajesCofres[level-1];
 document.getElementById("messageBox").style.display="flex";
}
function closeMessage(){document.getElementById("messageBox").style.display="none";running=true;if(level<10){level++;loadLevel()}else{showFinal()}}
function showFinal(){running=false;document.getElementById("finalContent").innerHTML=`<div class="finalHeart">❤️</div><h2>Lo encontraste...</h2><p>Después de superar los 10 niveles, finalmente llegaste hasta esa persona.</p><button onclick="giveKey()">🔑 Recibir la llave</button>`;document.getElementById("finalBox").style.display="flex"}
function giveKey(){document.getElementById("finalContent").innerHTML=`<div style="font-size:75px">🔑</div><h2>Una llave...</h2><p>La otra persona te entrega una pequeña llave.</p><button onclick="openHeartChest()">🔐 Abrir el cofre</button>`}
function openHeartChest(){document.getElementById("finalContent").innerHTML=`<div style="font-size:80px">💗</div><h2>El cofre del corazón</h2><p>La llave encaja perfectamente...<br><br>Dentro hay un anillo.</p><div style="font-size:80px">💍</div><p><strong>“No es real... pero en un momento lo será.”</strong></p><button onclick="finishGame()">❤️</button>`}
function finishGame(){document.getElementById("finalContent").innerHTML=`<div class="finalHeart">❤️</div><h2>FIN</h2><p>Dos mitades.<br>Un solo corazón.<br><br>Y una historia que recién comienza...</p><button onclick="location.reload()">Volver a jugar</button>`}

const keys={};
addEventListener("keydown",e=>{keys[e.key]=true;if((e.key==="ArrowUp"||e.key===" ")&&onGround)vy=11.5});
addEventListener("keyup",e=>keys[e.key]=false);

function holdButton(id,dir){
 const b=document.getElementById(id);
 if(!b)return;
 const down=e=>{e.preventDefault();keys[dir]=true};
 const up=e=>{e.preventDefault();keys[dir]=false};
 b.addEventListener("pointerdown",down,{passive:false});
 b.addEventListener("pointerup",up,{passive:false});
 b.addEventListener("pointercancel",up,{passive:false});
 b.addEventListener("pointerleave",up,{passive:false});
}
holdButton("left","left");holdButton("right","right");
document.getElementById("jump").addEventListener("pointerdown",e=>{e.preventDefault();if(onGround)vy=11.5},{passive:false});

function reset(){x=100;y=80;vx=vy=0}
function update(){
 if(!running)return;
 vx=(keys.right?4.5:0)-(keys.left?4.5:0); x+=vx; vy-=.65;y+=vy;onGround=false;
 for(const p of platforms)if(x+40>p.l&&x<p.r&&y<=p.b+30&&y>=p.b-5&&vy<=0){y=p.b+25;vy=0;onGround=true}
 if(!chestCollected && x+42>chestX-18 && x<chestX+70 && y+55>chestY-10 && y<chestY+75)openChest();
 for(const t of traps)if(x+35>t.l&&x<t.r&&y<t.b+50&&y>t.b-20)reset();
 if(y<-120)reset();
 if(x>3550 && chestCollected){if(level===10)showFinal();else{level++;loadLevel()}}
 player.style.left=x+"px";player.style.bottom=y+"px";
 world.style.transform=`translateX(${-Math.max(0,x-innerWidth/2)}px)`;
}
function loop(){update();requestAnimationFrame(loop)}
/* MODO MOVIL: controles táctiles sin bloquear los botones del menú */
(function () {
  const controls = document.querySelectorAll(".control");
  controls.forEach(btn => {
    btn.addEventListener("contextmenu", e => e.preventDefault());
  });
})();