import React, { useState } from 'react';

 async function centerOfSquare(x:number, y:number) {
  let xcenter : number = (x * 100 + 50);
  let ycenter : number = (y * 100 + 50);
  return {x : xcenter, y : ycenter};
}



async function drawPartialX(x:number, y:number, r:number, p:number, ctx:any) : Promise<void> {
  let center = await centerOfSquare(x, y);
    let startX = center.x + r/2;
    let startY = center.y - r/2;
    let endX = startX + 1.6;
    let endY = startY - 1.6;

    for(let i = 0; i < p && i <= 50; i++) {

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      startX = endX;
      startY = endY;
      endX = endX - 1.6;
      endY = endY + 1.6;

    }
    if(p > 50) {
      startX = center.x - r/2;
      startY = center.y - r/2;
      endX = startX + 1.6;
      endY = startY + 1.6;
      for(let i = 50; i <= p; i++)
      {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        startX = endX;
        startY = endY;
        endX = endX + 1.6;
        endY = endY + 1.6;
      }
    }
  }


async function drawPartialO(x:number, y:number, r:number, p:number, ctx:any) : Promise<void> {
    let center = await centerOfSquare(x, y);
    let startX = center.x;
    let startY = center.y;
    let end =  (Math.PI/180) * (3.65);
    let start = 0;
    for(let i = 0; i <= p; i++) {
      ctx.beginPath();
      ctx.arc(startX, startY, r/2, start, end);
      ctx.stroke();
      end = (Math.PI/180) * (3.65 * i);
  }
}

function showError(e : any)
{
	alert("Jaaha... sait sitten tämän virheen... se on kyllä jo vähän oudompi juttu, että tähän asti pääsit ja silti tämän näet, mutta kahtotaan sitten ensi viikolla, miten edistys kehittyy. Sillä välin otappa Network-logit esille ja vilkaise, mitä siellä lukee, sillä nyt se kiinnostaa jo opeakin :-D");
}

function handleMove(j : any)
{
  if(j.error)
  {
    alert(j.error);
  }
  else
  {
    alert(j.message);
  }
}

function sendMove(mx: number, my: number, c: any)
{
	let obu = { x : mx, y : my};
	fetch(c.serviceroot+c.receiver, { method : "POST", mode : "cors", credentials : "include", 
							headers: {'Content-Type': 'text/plain'}, 
							body : JSON.stringify(obu) }).
								then( r => r.json() ).then( j => handleMove(j) ).catch( e => showError(e));
}
  let kloonimatriisi;

  async function DrawBoard(xlines : number, ylines : number, ctx : any, widht : number, heigth : number, matriisi : any, setMatriisi : any) {
  requestAnimationFrame(() => DrawBoard(xlines, ylines, ctx, widht, heigth, matriisi, setMatriisi));

  //tää oli tuskallinen kokeilu
  //new Audio("http://localhost:5173/aani.mp3").play();
  // let music = new Audio("http://localhost:5173/aani.mp3");
  // music.loop = true;
  // music.volume=0.25;
  // music.play();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, widht, heigth);
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  for (let i = 1; i < xlines; i++) {
    ctx.beginPath();
    ctx.moveTo(i * heigth / xlines, 0);
    ctx.lineTo(i * heigth / xlines, heigth);
    ctx.stroke();
  }
  for (let i = 1; i < ylines; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * widht / ylines);
    ctx.lineTo(widht, i * widht / ylines);
    ctx.stroke();
  }
    await checkMatriisi(matriisi, setMatriisi, ctx);

    ctx.canvas.addEventListener('click', (e : any) => HandleClick(e, matriisi, setMatriisi));
  };

  async function checkMatriisi(matriisi : any, setMatriisi : any, ctx : any) {
    matriisi.forEach( (row: any[], y: number) => {
      row.forEach( (val: number, x: number) => {
        if (val >= 100 || val <= -100) {
        return;
        }
        if (val > 0) {
          setTimeout(async () => await drawPartialX(x, y, 80, val, ctx), 1000);
          kloonimatriisi = matriisi;
          kloonimatriisi[x][y] += 1;
          setMatriisi(kloonimatriisi);
          console.log(kloonimatriisi[x][y]);
          return;
        } 
        if (val < 0) {
          drawPartialO(x, y, 80, Math.abs(val), ctx);
          setTimeout(() => drawPartialO(x, y, 80, val, ctx), 1000);
          kloonimatriisi = matriisi;
          kloonimatriisi[x][y] -= 1;
          setMatriisi(kloonimatriisi);
          return;
        }
      });
    });
  }

  async function HandleClick(e : any, matriisi : any, setMatriisi : any) {
    let x = Math.floor(e.offsetX / 100);
    let y = Math.floor(e.offsetY / 100);
    let matriisiKlooni = matriisi;
    matriisiKlooni[x][y] = 1;
    if (matriisiKlooni[x][y] != 0) return;
    if (matriisiKlooni[x][y] == 1) {
      matriisiKlooni[x][y] = 1;
      setMatriisi(matriisiKlooni);
    }
    else if (matriisiKlooni[x][y] == -1) {
      matriisiKlooni[x][y] = -1;
      setMatriisi(matriisiKlooni);
    }
    
  }

  // let timeout : any;

 function Game(props : any) {
  const [matriisi, setMatriisi] = useState(Array(props.sizex).fill(Array(props.sizex).fill(0)));
  const cref = React.useRef();
  let height : number = (props.sizey * 100);
  let widht : number = (props.sizex * 100);

  React.useEffect(() => {
    if(cref.current)
    {
      const c = (cref.current as any).getContext('2d');
      DrawBoard(props.sizex, props.sizey, c, widht, height, matriisi, setMatriisi);
    }
    else alert("Canvas ei vielä piirretty tai jotain muuta meni pieleen.");
  });
  return (<canvas
          ref={(cref as any)}
          width={widht}
          height={height}
          />
          );
}

export default Game;
