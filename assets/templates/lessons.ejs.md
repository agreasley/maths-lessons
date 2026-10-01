```{=html}
<div class="lesson-list">
<% for (const item of items) { %>
<a class="lesson-card" href="<%- item.path %>">
  <span class="lesson-number" aria-hidden="true"><%- String(item['lesson-order']).padStart(2, '0') %></span>
  <div class="lesson-details">
    <div class="lesson-labels"><span class="eyebrow">Lesson <%- item['lesson-order'] %></span><span class="homework-tag">Homework <%- item.homework %></span></div>
    <h3><%- item['lesson-title'] %></h3>
    <p class="card-description"><%- item.description %></p>
    <p class="booklet-map"><%- item.booklet %></p>
  </div>
  <span class="lesson-open">Open lesson <span aria-hidden="true">→</span></span>
</a>
<% } %>
</div>
```
