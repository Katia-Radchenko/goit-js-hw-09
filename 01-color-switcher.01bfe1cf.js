const t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")};t.start.addEventListener("click",(function(){e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.start.setAttribute("disabled",!0),t.stop.removeAttribute("disabled")})),t.stop.addEventListener("click",(function(){clearInterval(e),t.stop.setAttribute("disabled",!0),t.start.removeAttribute("disabled")}));let e=null;
//# sourceMappingURL=01-color-switcher.01bfe1cf.js.map