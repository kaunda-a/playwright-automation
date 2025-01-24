const taskData = {
  type: "GoogleSearch",
  parameters: JSON.stringify({
    searchQuery: "OpenAI GPT-4",
    additionalParam: "exampleValue"
  }),
  url: "https://www.google.com",
  googleSearchQuery: "OpenAI GPT-4",
  googleSearchTarget: "openai.com",
  actions: JSON.stringify([
    { type: "type", selector: "input[name='q']", value: "OpenAI GPT-4" },
    { type: "wait", duration: 2000 },
    { type: "click", selector: "input[name='btnK']" },
    { type: "wait", duration: 3000 },
    { type: "scroll", value: "100" },
    { type: "hover", selector: "a[href*='openai.com']" },
    { type: "click", selector: "a[href*='openai.com']" }
  ])
};

// Simulate form submission
onSubmit(
  taskData.type,
  taskData.parameters,
  taskData.url,
  taskData.googleSearchQuery,
  taskData.googleSearchTarget,
  taskData.actions
);