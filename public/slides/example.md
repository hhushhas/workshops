# Working Smart with AI

A practical workshop for developers

<!-- notes: Welcome everyone! This is Hasan. Aaj hum seekhenge how to actually work with AI tools effectively. Yeh koi theory class nahi hai, we're going to practice together. The session will be 30-45 minutes with hands-on exercises. -->

---

## The Big Idea

### Treat AI like a co-worker, not a machine

- Different strengths and weaknesses
- Some days it's brilliant, some days it's confused (bilkul hamare junior developer ki tarah)
- You need to communicate clearly
- Sometimes you need to ask a different colleague

<!-- notes: The most important thing: AI is not magic. Think of it like working with different team members. Some are great at planning, some are fast at routine work. Agar aik banda jawab nahi de raha, toh doosre se pooch lo. This mindset shift will make everything else click. -->

---

## Two Types of AI Models

<table>
<tr>
<td width="50%">

### 🧠 Smart Models

**For: Planning & Complex Work** (Dimagh wale kaam)

<img src="https://www.anthropic.com/_next/static/media/claude-logo.9b44c44d.svg" width="120" alt="Claude" />

**Claude Opus 4.5**

<img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" width="120" alt="Gemini" />

**Gemini 2.0 Pro**

<img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" width="100" alt="ChatGPT" />

**GPT-4**

✅ Architecture design  
✅ Complex debugging  
✅ Learning new concepts  
✅ Strategic planning

</td>
<td width="50%">

### ⚡ Fast Models

**For: Quick Execution** (Jugaad aur speed)

<img src="https://www.anthropic.com/_next/static/media/claude-logo.9b44c44d.svg" width="120" alt="Claude" />

**Claude Haiku 4.5**

<img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" width="120" alt="Gemini" />

**Gemini 2.0 Flash**

<img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" width="100" alt="ChatGPT" />

**GPT-4o mini**

✅ Code generation  
✅ Quick fixes  
✅ Repetitive tasks  
✅ Simple refactoring

</td>
</tr>
</table>

<!-- notes: Show of hands - who has used ChatGPT? Acha, ab yeh suno: there are different models for different jobs. Smart models are like your senior architect - thora slow par solid. Fast models are like that intern who types fast but needs checking. Wrong tool = frustration. Right tool = magic. -->

---

## The Context Problem

<table>
<tr>
<td width="33%">

### ❌ Too Little

```
"Fix the bug"
```

<div style="text-align: center; font-size: 60px;">🤷</div>

**AI will guess**  
**Probably wrong**  
_(Yaar mujhe kya pata?)_

</td>
<td width="33%">

### ❌ Too Much

```typescript
[dumps entire
5000-line
codebase]
```

<div style="text-align: center; font-size: 60px;">😵</div>

**AI gets lost**  
**Misses the point**  
_(Itna parhne ka time kiske paas hai?)_

</td>
<td width="33%">

### ✅ Just Right

```typescript
"Fix login bug
in auth.js

Sessions expire
immediately

[50 lines code]

Using JWT with
24h expiry"
```

<div style="text-align: center; font-size: 60px;">🎯</div>

**AI understands**  
**Fixes it right**  
_(Shabash!)_

</td>
</tr>
</table>

<!-- notes: This is where most people fail. Imagine asking a new teammate "fix the bug" with no other info - woh bechara kya karega? Give relevant context: what file, what's broken, what you tried. But don't paste your whole project - khichdi mat pakao. 50-200 lines of relevant code + clear problem description = sweet spot. -->

---


## The 5-Step Workflow

### Step 1: Clarify What You Want (15-20 min)

```compare
// 🔴 Bad Code
function bad() {}
===
// 🟢 Good Code
function good() {}

Write down:

- What problem am I solving?
- What does success look like?
- What constraints do I have?

<!-- notes: Is step ko skip mat karna please. I know you want to jump straight to coding, lekin 15 minute yahan lagana saves you 2 hours later. Write it down. Agar aap khud clear nahi ho, toh AI ghanta samajh payega. -->

---

## The 5-Step Workflow

### Step 2: Draft a Plan (Smart Model)

**Prompt example:**

```
I need to build a user authentication system for our web app.

Before you suggest a solution, ask me 5 clarifying
questions about requirements, constraints, and context.
```

Then answer the questions. Repeat 3-4 times.

<!-- notes: This is the magic step repeatedly ignored. Instead of asking AI "build me auth", you ask it to INTERVIEW YOU first. Let it ask YOU questions. Bhai sawal poocho us se. Do this 3-4 rounds. By the end, both you and the AI understand the problem deeply. -->

---

## The 5-Step Workflow

### Step 3: Review & Iterate the Plan

- Read the plan carefully
- Point out anything wrong or unclear
- Ask "what if..." questions
- Iterate until the plan is solid

**Don't move to code until the plan makes sense!**

<!-- notes: The plan should read like a senior developer explaining the approach. If something feels off, dal mein kuch kala hai. Challenge it. Ask "what if we get 1000 users at once?". Keep refining. A good plan means the coding part becomes halwa. -->

---

## The 5-Step Workflow

### Step 4: Execute (New Chat)

**Important:** Open a fresh chat for implementation

- Use fast models for routine coding
- Switch to smart models for tricky parts
- Copy the final plan as context

<!-- notes: Why a new chat? Kyunki purana chat khichdi ban chuka hai. Fresh start lo. Paste your final plan. Now you can use faster models because the thinking is done - bas eentien lagani hain. Save the smart models for when you hit a wall. -->

---

## The 5-Step Workflow

### Step 5 (Optional): Refine Your Prompt

Before executing, ask a fast model:

```
Make this prompt clearer and more actionable:

[paste your instruction]
```

This helps catch unclear instructions.

<!-- notes: Pro tip: Sometimes humein lagta hai hum clear hain par hum hotay nahi hain. Ask a fast model to rewrite your instruction. It's like having someone proofread your email. Requires 30 seconds, saves 30 minutes of sar-khapai. -->

---

## Practical Prompting Tips

### ✅ Be Specific and Positive

```
❌ "Don't use var"
✅ "Use const for variables that don't change,
    let for variables that do"
```

### ✅ Show Examples

```
"Format the response like this:
{
  status: 'success',
  data: {...}
}"
```

### ✅ Set Expectations

```
"Explain this code to a junior developer.
Use simple language and include comments."
```

<!-- notes: AI mirrors your style. Negative prompts confuse it. Seedha seedha batao kya chahiye. Examples are gold - dikhao kya demand hai. And set the tone: "explain like I'm junior" gets different output than "give me production-ready code". -->

---

## When to Switch Models

### Signs you need a different model:

🚩 Answers are getting repetitive  
🚩 It's missing obvious issues  
🚩 The code quality is dropping  
🚩 It's taking too long for simple tasks  
_(Banda dheet ban gaya hai)_

**Don't fight it - just switch!**

Try: Claude → Gemini → GPT → back to Claude

<!-- notes: This is huge. Log eik hi model se ladte rehte hain. If Claude is being stubborn, try Gemini. They have different strengths. Koi sharam ki baat nahi hai. I switch models multiple times per day. Takes 30 seconds to copy your context over, saves you hours. -->

---

## 🎯 Live Demo

### We'll build a simple API endpoint together

**Task:** Create a POST endpoint that:

- Accepts user registration data
- Validates email format
- Checks if email already exists
- Saves to database
- Returns proper error messages

**Watch how I:**

1. Ask the AI to ask ME questions first
2. Iterate on the plan 3 times
3. Switch to implementation

<!-- notes: Chalo demo karte hain. Share your screen now. I'm going to show you the real workflow, mistakes and all. Dekho kaise sawal poochta hai yeh. Don't worry about following along yet - bas dekho aur seekho. -->

---

## 💪 Your Turn: Exercise (15 min)

### Pair up! One driver, one navigator.

**Your task:**
Create a function that processes customer orders and applies discount rules.

**Requirements:**

- Orders over $100 get 10% off
- First-time customers get an extra 5% off
- Discounts stack (but max 20% total)

**Follow the workflow:**

1. Spend 3 min clarifying the problem (write it down)
2. Use smart model to draft a plan
3. Iterate on the plan (2-3 rounds)
4. Implement with a fast model

<!-- notes: Alright, jodi bana lo sab. Decide who's typing first. Follow the workflow: clarify, plan with questions, iterate, then code. Direct code pe mat koodna! Set a timer for 15 minutes. Agar jaldi ho jaye toh explain your code to each other. -->

---

## ⏸️ Take a Break (2 min)

Stand up, stretch, pani wani pee lo.

<!-- notes: Let's take a quick 2-minute break. Stand up, shake it out. Wapis aake discuss karenge kya banaya. -->

---

## 🗣️ Debrief: What Did We Learn?

Let's share:

1. Show your solution (2-3 volunteers)
2. What model(s) did you use?
3. Did you switch models? Why?
4. What surprised you?

**Key question:** How was using the plan approach different from just asking for code directly?

<!-- notes: Hanji, kaun dikhayega sab se pehle? Don't be shy. [Pick 2-3 pairs]. Poocho unse: Kaunsa model use kiya? Switch kiya kya? Kya naya seekha? The goal is to hear different experiences. -->

---

## Common Mistakes to Avoid

### ❌ Pasting the same failing prompt 5 times

→ Switch models or rephrase completely _(Pagalpan hai yeh)_

### ❌ Skipping the planning phase

→ You'll rewrite code 3 times instead

### ❌ Not giving enough context

→ AI will hallucinate and guess _(Tukkay marega)_

### ❌ Giving too much irrelevant context

→ AI will get confused about what matters

### ❌ Trusting AI blindly

→ ALWAYS review the code. Always. _(Aankhein band karke trust mat karna)_

<!-- notes: Doosron ki galtiyon se seekho. Biggest mistake? Skipping planning. It feels faster but it's actually suuuuper slow. Second biggest? Pasting the same prompt over and over. Switch models! And please, PLEASE review the code. AI code often compiles fine but breaks in production. -->

---

## Quick Reference Card

### 📋 Smart Models → Planning & Architecture

Claude Opus, Gemini Pro, GPT-4

### ⚡ Fast Models → Quick Tasks

Claude Haiku, Gemini Flash, GPT-4o mini

### 🎯 The Workflow

1. Clarify (15-20 min)
2. Plan with Q&A (smart model)
3. Iterate the plan
4. Execute (new chat, fast model)
5. Refine prompts when needed

### 🔄 Switch models when:

Repetitive, wrong, slow, or stuck

<!-- notes: Iska screenshot le lo. This is your cheat sheet. Kal jab phanso toh yahan dekh lena. Am I using the right model? Did I skip the planning step? These four points will solve 80% of your AI problems. -->

---

## Real-World Example Prompts

### 🏗️ For Planning (Smart Model):

```
I'm designing a caching layer for our API.
Before suggesting an approach, ask me:
- What we're caching and why
- Our traffic patterns
- Infrastructure constraints
- Performance requirements

Then we'll iterate on the design together.
```

<!-- notes: See how this prompt sets up a conversation? Solution nahi maang rahe, sawal maang rahe hain. This is how senior developers work. Save this template. -->

---

## Real-World Example Prompts

### ⚡ For Implementation (Fast Model):

```
Implement this caching layer plan:
[paste the final plan from smart model]

Requirements:
- Use Redis for the cache store
- Handle cache misses gracefully
- Add proper error handling
- Include TypeScript types
- Add comments explaining the logic

Focus on the UserCache class first.
```

<!-- notes: Ab fark dekho. This prompt is directive, specific. The thinking is done. Ab bas execution chahiye. This is where fast models shine. -->

---

## Real-World Example Prompts

### 🐛 For Debugging (Smart Model):

```
I'm getting intermittent 500 errors in production.

Context:
- Node.js API with PostgreSQL
- Happens randomly, about 2-3 times per hour
- Error log shows "connection pool exhausted"
- We have 1000 concurrent users peak
- Currently using default pool settings

What debugging steps should I take, and what
information do you need from me to diagnose this?
```

<!-- notes: Good debugging prompt example. Specific error, relevant context, and asking for guidance. This teaches you while fixing the problem. "Fix code" bolne se kuch nahi seekhoge. -->

---

## Your Action Plan

### This Week:

1. ✅ Bookmark your favorite AI models (one smart, one fast)
2. ✅ Try the 5-step workflow on ONE real task
3. ✅ Practice asking AI to ask YOU questions first

### This Month:

1. ✅ Compare outputs between different models
2. ✅ Build a prompt template library for common tasks
3. ✅ Share what works with the team

<!-- notes: Kal sab badalne ki koshik mat karna. Pick ONE thing this week. Try the Q&A planning approach just once. See how it feels. In a month, yeh natural lagega. -->

---

## Resources

### 🤖 Try These Models:

- **Claude.ai** (Anthropic) - Great at reasoning
- **Gemini** (Google) - Fast and versatile
- **ChatGPT** (OpenAI) - Most popular

### 📚 Learn More:

- Anthropic Prompt Engineering Guide
- Google AI Best Practices
- Our internal #ai-tips Slack channel

### 💬 Keep Learning:

- Share prompts that work in Slack
- Weekly AI tips on Fridays
- Ask me anytime!

<!-- notes: Aaj hi account bana lo in sab pe. They each have strengths. Claude explains complex code beautifully. Gemini is blazing fast. ChatGPT has plugins. Use all three. And join our Slack channel - wahan hum apni jeet aur haar share karte hain. -->

---

# Questions?

### Remember:

- AI is a co-worker, not magic
- Use the right model for the job
- Plan before you code
- Switch when stuck
- Always review the output

**You're going to be 2-3x better at this by next week.**

<!-- notes: Okay, questions? Kuch bhi poocho. "Is this cheating?" (Nahi, tool hai). "Will this replace us?" (Nahi, it makes you more valuable). Thank everyone. Maza aya? -->

---

# Thank You! 🙏

<!-- notes: Bahut shukriya sab ka aanay ke liye. Slides main abhi Slack pe bhej raha hoon. If you have questions later, DM me. I'm excited to hear what you build. Chalo, Allah Hafiz! -->
