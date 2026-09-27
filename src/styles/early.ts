import type { StyleMeta } from "./types"

function payload(styles: StyleMeta[]) {
  return JSON.stringify(styles).replace(/</g, "\\u003c")
}

// Mirrors resolveStyle: a listed ?style= pins, otherwise roll and leave the url alone.
export function earlyScript(styles: StyleMeta[]) {
  return `window.__STYLES__=${payload(styles)};(function(){var list=window.__STYLES__||[];if(!list.length)return;var q=new URLSearchParams(location.search).get("style");var found=null;for(var i=0;i<list.length;i++){if(list[i].id===q){found=list[i];break;}}var style=found;if(!style)style=list[Math.floor(Math.random()*list.length)];var root=document.documentElement;root.dataset.style=style.id;root.dataset.scheme=style.scheme;if(style.scheme==="system"){var stored=null;try{stored=localStorage.getItem("theme");}catch(e){}var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var theme=stored==="dark"||stored==="light"?stored:(prefersDark?"dark":"light");root.classList.toggle("dark",theme==="dark");root.dataset.theme=theme;}else{root.classList.remove("dark");}})();`
}

export function labelScript() {
  return `(function(){var list=window.__STYLES__||[];var id=document.documentElement.dataset.style;var name="";for(var i=0;i<list.length;i++){if(list[i].id===id)name=list[i].name;}var btn=document.getElementById("style-toggle");if(btn&&name){btn.textContent=name;btn.setAttribute("aria-label",name);}})();`
}
