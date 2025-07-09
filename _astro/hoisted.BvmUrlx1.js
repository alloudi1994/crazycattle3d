import"./hoisted.CAoKieCc.js";class r{constructor(){this.query=new URLSearchParams(window.location.search).get("q")||"",this.resultsContainer=document.getElementById("search-results"),this.maxResults=20,console.log("JavaScript - URL search params:",window.location.search),console.log("JavaScript - Query from URL:",this.query),this.initializePage()}initializePage(){if(this.query&&this.query.trim()){document.title=`Search results for "${this.query}" - Search Games`;const e=document.getElementById("search-query-display"),t=document.getElementById("search-query-text");e&&t&&(t.textContent=this.query,e.style.display="block");const s=document.getElementById("search-input-main");s&&(s.value=this.query);const a=document.getElementById("initial-message");a&&(a.style.display="none"),this.showLoading(),this.performSearch()}else document.title="Search Games"}showLoading(){this.resultsContainer&&(this.resultsContainer.innerHTML=`
          <div class="loading-message">
            🔍 Searching for "${this.query}"...
          </div>
        `)}async performSearch(){try{if(!(await fetch("/pagefind/pagefind.js")).ok){this.showMessage("Search is still building. Please browse categories below!");return}await this.loadPagefind()}catch{this.showMessage("Search temporarily unavailable. Please browse categories below!")}}loadPagefind(){return new Promise((e,t)=>{const s=document.createElement("script");s.src="/pagefind/pagefind.js",s.onload=async()=>{try{let a=0;for(;typeof window.pagefind>"u"&&a<20;)await new Promise(i=>setTimeout(i,100)),a++;typeof window.pagefind<"u"?(window.pagefind.init&&await window.pagefind.init(),this.doSearch(),e()):(this.showMessage("Search initialization failed. Please browse categories below!"),t())}catch(a){console.error("Pagefind initialization error:",a),this.showMessage("Search loading failed. Please browse categories below!"),t()}},s.onerror=()=>{this.showMessage("Search loading failed. Please browse categories below!"),t()},document.head.appendChild(s)})}async doSearch(){try{if(typeof window.pagefind>"u"&&(await new Promise(i=>setTimeout(i,500)),typeof window.pagefind>"u")){this.showMessage("Search not ready yet. Please browse categories below!");return}const e=this.query.trim().toLowerCase();if(e.length===0){this.showMessage("Please enter a search term.");return}console.log("Searching for:",e);const t=await window.pagefind.search(e);if(console.log("Search results:",t),!t||!t.results||t.results.length===0){this.showNoResults();return}const s=t.results.slice(0,this.maxResults),a=await Promise.all(s.map(i=>i.data()));this.displayResults(a)}catch(e){console.error("Search error:",e),this.showMessage("Search error occurred. Please browse categories below!")}}displayResults(e){const t=e.map(s=>`
        <div class="search-result-item">
          <a href="${s.url}" class="search-result-title">
            ${s.meta?.title||"Game"}
          </a>
          <div class="search-result-excerpt">
            ${s.excerpt||"No description available."}
          </div>
          <div class="search-result-meta">
            ${s.meta?.category?`Category: ${s.meta.category}`:""}
            ${s.meta?.genre?` | Genre: ${s.meta.genre}`:""}
          </div>
        </div>
      `).join("");this.resultsContainer.innerHTML=`
        <h3 style="margin: 0 0 1.5rem 0; color: var(--theme-primary);">
          Found ${e.length} result${e.length!==1?"s":""}
        </h3>
        ${t}
      `}showNoResults(){this.resultsContainer.innerHTML=`
        <div class="no-results-message">
          <h3 style="margin: 0 0 1rem 0; color: var(--theme-primary);">No Results Found</h3>
          <p>Sorry, no games match "${this.query}". Try a different search term or browse the categories below!</p>
        </div>
      `}showMessage(e){this.resultsContainer.innerHTML=`
        <div class="loading-message">
          ${e}
        </div>
      `}}new r;
