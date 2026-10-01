```{=html}
<% if (items.length) { %>
<div class="topic-grid">
<% for (const item of items) { %>
  <a class="topic-card" href="<%- item.path %>">
    <div class="card-top"><span class="eyebrow">Topic</span><span class="card-arrow" aria-hidden="true">↗</span></div>
    <h3><%- item.title %></h3>
    <p class="card-description"><%- item.description %></p>
    <span class="card-action">View lessons <span aria-hidden="true">→</span></span>
  </a>
<% } %>
</div>
<% } else { %>
<div class="empty-state">
  <span class="empty-symbol" aria-hidden="true">+</span>
  <h3>Topics are on their way.</h3>
  <p>There are no lessons published for this course yet. Your teacher will let you know when they are ready.</p>
  <a class="text-link" href="../../index.html">Browse all courses <span aria-hidden="true">→</span></a>
</div>
<% } %>
```
