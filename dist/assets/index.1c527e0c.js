(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&d(g)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const C=`<section class="todoapp">
  <header class="header">
    <h1>TAREAS</h1>
    <input
      id="new-todo-input"
      class="new-todo"
      placeholder="Ingrese aqu\xED nueva tarea"
      autofocus
    />
  </header>

  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
      <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
      <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
    </ul>
  </section>

  <!-- This footer should hidden by default and shown when there are todos -->
  <footer class="footer">
    <!-- This should be "0 items left" by default -->
    <span class="todo-count"
      ><strong id="pending-count">0</strong> pendiente(s)</span
    >
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <!-- selected -->
        <a class="filtro" class="selected" href="#/">Todas</a>
      </li>
      <li>
        <a class="filtro filtro-pendientes" href="#/active">Pendientes</a>
      </li>
      <li>
        <a class="filtro" href="#/completed">Completadas</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left \u2193 -->
    <button class="clear-completed">Borrar completadas</button>
  </footer>
</section>

<footer class="info">
  <p>&copy; Todos los derechos reservados - A<sup>2</sup>B Systems</p>
  <!-- Change this out with your name and url \u2193 -->
  <p>Creado por Alberto Beguier</p>
  <img width="3%" src="logoEstudio.svg" alt="icono" />
  <p>Estudio Beguier</p>
</footer>
`;let y;const P=new Uint8Array(16);function k(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(P)}const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));function A(e,t=0){return(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase()}const q=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:q};function I(e,t,r){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||k)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){r=r||0;for(let o=0;o<16;++o)t[r+o]=d[o];return t}return A(d)}class L{constructor(t){this.id=I(),this.description=t,this.done=!1,this.createdAt=new Date}}const u={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[new L("Tarea de ejemplo")],filter:u.All},D=()=>{E(),console.log("InitStore \u{1F951}")},E=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=u.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(l))},x=(e=u.All)=>{switch(e){case u.All:return[...l.todos];case u.Completed:return l.todos.filter(t=>t.done);case u.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},U=e=>{if(!e)throw new Error("Description is required");l.todos.push(new L(e)),h()},B=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},F=e=>{l.todos=l.todos.filter(t=>t.id!==e),h()},O=()=>{l.todos=l.todos.filter(e=>!e.done),h()},M=(e=u.All)=>{l.filter=e,h()},$=(e,t)=>{const r=l.todos.find(d=>d.id===e);if(!r)throw new Error("Todo not found");r.description=t,h()},H=()=>l.filter,c={addTodo:U,deleteCompleted:O,deleteTodo:F,getCurrentFilter:H,getTodos:x,initStore:D,loadStore:E,setFilter:M,toggleTodo:B,updateTodoDescription:$},N=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:r,id:d}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${r}</label>
            <button class="edit-btn">\u270F\uFE0F</button> <!-- Bot\xF3n de edici\xF3n -->
            <button class="destroy"></button>
        </div>
        <input class
="edit" value="${r}" style="display: none;"> <!-- Campo oculto para editar -->
`,s=document.createElement("li");return s.innerHTML=o,s.setAttribute("data-id",d),e.done&&s.classList.add("completed"),s};let b;const R=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);const t=c.getTodos(u.Pending).length;b.innerHTML=t,V(t)};function V(e){const t=document.querySelector(".filtro-pendientes");e>0?t.classList.add("boton-titilar"):t.classList.remove("boton-titilar")}let f;const j=(e,t=[])=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`Element ${e} not found`);f.innerHTML="",t.forEach(r=>{f.append(N(r))})},m={ClearCompletedButton:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},J=e=>{const t=()=>{const n=c.getTodos(c.getCurrentFilter());j(m.TodoList,n),r()},r=()=>{R(m.PendingCountLabel)};(()=>{const n=document.createElement("div");n.innerHTML=C,document.querySelector(e).append(n),t()})();const d=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),s=document.querySelector(m.ClearCompletedButton),g=document.querySelectorAll(m.TodoFilters);d.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().length!==0&&(c.addTodo(n.target.value),t(),w(),n.target.value="")}),o.addEventListener("click",n=>{if(n.target.classList.contains("toggle")){const a=n.target.closest("[data-id]");c.toggleTodo(a.getAttribute("data-id")),t(),w()}}),o.addEventListener("click",n=>{if(n.target.classList.contains("destroy")){const a=n.target.closest("[data-id]");c.deleteTodo(a.getAttribute("data-id")),t(),w()}}),s.addEventListener("click",()=>{c.deleteCompleted(),t(),w()}),g.forEach(n=>{n.addEventListener("click",a=>{switch(g.forEach(p=>p.classList.remove("selected")),a.target.classList.add("selected"),a.target.text){case"Todas":c.setFilter(u.All);break;case"Pendientes":c.setFilter(u.Pending);break;case"Completadas":c.setFilter(u.Completed);break}t()})}),o.addEventListener("click",n=>{if(n.target.classList.contains("edit-btn")){const a=n.target.closest("li"),p=a.querySelector(".edit");a.classList.add("editing"),p.style.display="block",p.focus(),n.stopPropagation()}}),o.addEventListener("keyup",n=>{if(n.key!=="Enter"||!n.target.classList.contains("edit"))return;const a=n.target.closest("li"),p=n.target.value.trim(),S=a.getAttribute("data-id");if(p.length>0){c.updateTodoDescription(S,p);const v=a.querySelector("label");v.textContent=p}a.classList.remove("editing"),n.target.style.display="none"})};function w(){const e=document.querySelector(".filtro-pendientes");c.getTodos(u.Pending).length>0?e.classList.add("boton-titilar"):e.classList.remove("boton-titilar")}c.initStore();J("#app");
