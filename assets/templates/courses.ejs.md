```{=html}
<% const groups = ["Years 7–10", "Year 11", "Year 12"]; %>
<% for (const group of groups) { const courses = items.filter(item => item['course-group'] === group); %>
<section class="course-section" aria-label="<%- group %> courses">
  <div class="section-heading"><h2><%- group %></h2><span><%- group === 'Years 7–10' ? 'Mathematics' : 'Senior mathematics' %></span></div>
  <div class="course-grid <%- group === 'Years 7–10' ? 'junior-grid' : '' %>">
  <% for (const item of courses) { const ready = item.availability === 'available'; %>
    <a class="course-card <%- ready ? 'is-available' : '' %>" href="<%- item.path %>">
      <div class="card-top"><span class="year-label">Year <%- item['course-year'] %></span><span class="card-arrow" aria-hidden="true">↗</span></div>
      <h3><%- item['course-name'] %></h3>
      <p class="status <%- ready ? 'status-ready' : '' %>"><span class="status-dot" aria-hidden="true"></span><%- ready ? 'Lessons available' : 'Topics coming soon' %></p>
    </a>
  <% } %>
  </div>
</section>
<% } %>
```
