# Welcome to AI Productivity Workshop

Master AI tools to supercharge your development workflow

<!-- notes: Welcome everyone! Today we'll explore how AI can transform the way you code, debug, and ship software faster than ever before. -->

---

## What We'll Cover Today

- **AI-Assisted Coding**: From autocomplete to pair programming
- **Prompt Engineering**: Getting the best results from AI
- **Code Review & Debugging**: Let AI catch bugs before they ship
- **Documentation**: Auto-generate docs that don't suck
- **Workflow Integration**: Seamless AI in your daily routine

<!-- notes: This is the agenda for today. We'll spend roughly 15 minutes on each topic with hands-on exercises. Make sure you have your laptops ready! -->

---

## Why AI for Developers?

> "The best developers aren't the ones who write the most code—they're the ones who solve problems the fastest."

**Key Benefits:**
1. ⚡ 10x faster prototyping
2. 🐛 Catch bugs before they happen  
3. 📚 Instant documentation
4. 🎯 Focus on architecture, not boilerplate

<!-- notes: Let's discuss the real value proposition. Ask the audience: who has used GitHub Copilot or ChatGPT for coding? Get a show of hands. -->

---

## Setting Up Your AI Toolkit

```bash
# Install the essentials
npm install -g @anthropic-ai/claude-cli
code --install-extension github.copilot
```

**Recommended Tools:**
- **Claude** - Complex reasoning & architecture
- **GitHub Copilot** - In-editor suggestions
- **Cursor** - AI-first IDE

<!-- notes: Walk through the installation process. Have attendees follow along. If anyone has issues, we'll troubleshoot during the break. -->

---

## Prompt Engineering 101

**The CRAFT Framework:**

| Letter | Meaning | Example |
|--------|---------|---------|
| **C** | Context | "I'm building a React app..." |
| **R** | Role | "Act as a senior engineer..." |
| **A** | Action | "Write a function that..." |
| **F** | Format | "Return as TypeScript..." |
| **T** | Tone | "Use clear comments..." |

<!-- notes: This is the key framework to remember. We'll practice this in the next exercise. Give them 2 minutes to write down their own CRAFT prompt. -->

---

## Live Demo: AI Pair Programming

Let's build a **real-time dashboard** together:

1. Define the requirements with AI
2. Generate the component structure  
3. Iterate on the design
4. Add tests automatically

```javascript
// AI-generated starter code
const Dashboard = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchMetrics().then(setData);
  }, []);
  
  return <MetricGrid data={data} />;
};
```

<!-- notes: This is the hands-on portion. Share your screen and code live. Encourage questions during this section. -->

---

## Best Practices

### ✅ Do This
- Start with clear, specific prompts
- Iterate and refine AI suggestions
- Review all generated code carefully
- Use AI for repetitive tasks

### ❌ Avoid This
- Blindly accepting code without review
- Using AI for security-critical logic
- Sharing sensitive data in prompts
- Over-relying on AI for learning

<!-- notes: Emphasize the review step. AI is a tool, not a replacement for engineering judgment. Share a quick story about a bug you caught in AI-generated code. -->

---

## Your Turn: Exercise

**Task:** Use AI to refactor this code:

```javascript
function getData(u,c){
  return fetch('/api/'+u).then(r=>r.json()).then(d=>{
    if(d.err){throw d.err}
    c(d.result)
  })
}
```

**Goals:**
- Add TypeScript types
- Improve error handling
- Add meaningful variable names
- Include JSDoc comments

⏱️ **Time:** 10 minutes

<!-- notes: Give them 10 minutes. Walk around and help those who are stuck. After time is up, ask 2-3 volunteers to share their results. -->

---

## Key Takeaways

1. 🚀 **AI amplifies your skills**, it doesn't replace them
2. 💡 **Prompt quality = Output quality**
3. 🔍 **Always review** AI-generated code
4. 🔧 **Integrate AI** into your existing workflow
5. 📈 **Keep learning** - AI tools evolve rapidly

---

## Resources & Next Steps

📚 **Learn More:**
- [Anthropic Claude Documentation](https://docs.anthropic.com)
- [GitHub Copilot Tips](https://github.com/features/copilot)
- [Prompt Engineering Guide](https://www.promptingguide.ai)

💬 **Connect:**
- Join our Discord community
- Weekly AI office hours
- Monthly hands-on workshops

---

# Thank You! 🙏

## Questions?

**Workshop Materials:** [github.com/workshop-slides](https://github.com)

**Feedback Form:** Scan the QR code

<!-- notes: Thank everyone for attending. Remind them about the feedback form and the Discord community. Stay for 10 minutes after for individual questions. -->
