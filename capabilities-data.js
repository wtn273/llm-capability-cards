// LLM Capability Cards Data
// Based on Bloom's Revised Taxonomy

const CAPABILITIES = [
    // REMEMBER
    {
        id: "identify",
        name: "Identify",
        level: "remember",
        levelName: "Remember",
        levelOrder: 1,
        icon: "🔍",
        aka: "Find, Look Up",
        definition: "Retrieve the relevant information from a source.",
        defaultPrompts: [
            "Find this client's emergency contact information.",
            "Identify what services this client has received.",
            "Look through John's notes and find any upcoming appointments."
        ]
    },

    // UNDERSTAND
    {
        id: "interpret",
        name: "Interpret",
        level: "understand",
        levelName: "Understand",
        levelOrder: 2,
        icon: "🔄",
        aka: "Paraphrase, Clarify, Represent, Translate",
        definition: "Take information and represent it in another form.",
        defaultPrompts: [
            "Paraphrase this document as a bulleted list.",
            "Translate this text from Spanish to English.",
            "Look at my calendar and rewrite my day as a to-do list."
        ]
    },
    {
        id: "exemplify",
        name: "Exemplify",
        level: "understand",
        levelName: "Understand",
        levelOrder: 2,
        icon: "💡",
        aka: "Illustrate, Instantiate",
        definition: "Provide a specific example or instance of a general concept.",
        defaultPrompts: [
            "Give me an example of a strength-based question.",
            "What would be a good icebreaker for a family session?",
            "Show me what an empathetic response would look like here."
        ]
    },
    {
        id: "classify",
        name: "Classify",
        level: "understand",
        levelName: "Understand",
        levelOrder: 2,
        icon: "📂",
        aka: "Categorize, Subsume",
        definition: "Determine that something belongs to a certain category.",
        defaultPrompts: [
            "What type of therapy approach is this?",
            "Categorize these client concerns by urgency level.",
            "Which stage of change is this client in?"
        ]
    },
    {
        id: "summarize",
        name: "Summarize",
        level: "understand",
        levelName: "Understand",
        levelOrder: 2,
        icon: "📝",
        aka: "Abstract, Generalize",
        definition: "Abstract a general theme or major points.",
        defaultPrompts: [
            "Summarize the key points from today's session.",
            "What are the main themes across these case notes?",
            "Give me a brief overview of this client's progress."
        ]
    },
    {
        id: "infer",
        name: "Infer",
        level: "understand",
        levelName: "Understand",
        levelOrder: 2,
        icon: "🧩",
        aka: "Think Step by Step, Commonsense, Logic",
        definition: "Draw a logical conclusion from presented information.",
        defaultPrompts: [
            "Based on these notes, infer the primary unmet need driving Jose's missed appointments.",
            "Given the pattern of crisis calls, predict the most likely trigger for future escalations.",
            "Read the supervision summary and conclude whether the safety plan is adequate."
        ]
    },
    {
        id: "compare",
        name: "Compare",
        level: "understand",
        levelName: "Understand",
        levelOrder: 2,
        icon: "⚖️",
        aka: "Contrast, Map, Match",
        definition: "Detect correspondences between two ideas, objects, or situations.",
        defaultPrompts: [
            "Compare this client's progress to their goals from intake.",
            "What's the difference between these two intervention approaches?",
            "How does this family's situation compare to similar cases?"
        ]
    },
    {
        id: "explain",
        name: "Explain",
        level: "understand",
        levelName: "Understand",
        levelOrder: 2,
        icon: "📖",
        aka: "Construct a Model",
        definition: "Construct a cause-and-effect model of a system.",
        defaultPrompts: [
            "Explain why this intervention might be effective for this client.",
            "What factors are contributing to this family's current crisis?",
            "Help me understand the relationship between these symptoms."
        ]
    },

    // APPLY
    {
        id: "execute",
        name: "Execute",
        level: "apply",
        levelName: "Apply",
        levelOrder: 3,
        icon: "▶️",
        aka: "Carry Out",
        definition: "Apply a procedure to a familiar task.",
        defaultPrompts: [
            "Fill out this intake form based on my notes.",
            "Apply the agency template to write this progress note.",
            "Use the safety plan format to document this conversation."
        ]
    },

    // ANALYZE
    {
        id: "differentiate",
        name: "Differentiate",
        level: "analyze",
        levelName: "Analyze",
        levelOrder: 4,
        icon: "🎯",
        aka: "Discriminate, Distinguish, Focus, Select",
        definition: "Distinguish relevant from irrelevant, important from unimportant.",
        defaultPrompts: [
            "What are the most critical issues to address first?",
            "Separate the urgent concerns from the ongoing ones.",
            "Which information here is most relevant to the safety assessment?"
        ]
    },
    {
        id: "organize",
        name: "Organize",
        level: "analyze",
        levelName: "Analyze",
        levelOrder: 4,
        icon: "🗂️",
        aka: "Find Coherence, Integrate, Outline, Structure",
        definition: "Determine how elements fit or function within a structure.",
        defaultPrompts: [
            "Organize these case notes chronologically.",
            "Create an outline of the key themes in this assessment.",
            "Structure this information into a coherent narrative."
        ]
    },
    {
        id: "attribute",
        name: "Attribute",
        level: "analyze",
        levelName: "Analyze",
        levelOrder: 4,
        icon: "🔎",
        aka: "Deconstruct",
        definition: "Determine point of view, bias, values, or intent.",
        defaultPrompts: [
            "What perspective is this report written from?",
            "Identify any assumptions in this assessment.",
            "What values seem to be guiding this intervention plan?"
        ]
    },

    // EVALUATE
    {
        id: "check",
        name: "Check",
        level: "evaluate",
        levelName: "Evaluate",
        levelOrder: 5,
        icon: "✓",
        aka: "Coordinate, Detect, Monitor, Test",
        definition: "Detect inconsistencies or fallacies within a process or product.",
        defaultPrompts: [
            "Check this documentation for any inconsistencies.",
            "Does this safety plan address all identified risks?",
            "Review this note for completeness."
        ]
    },
    {
        id: "critique",
        name: "Critique",
        level: "evaluate",
        levelName: "Evaluate",
        levelOrder: 5,
        icon: "📊",
        aka: "Judge",
        definition: "Detect inconsistencies between a product and external criteria.",
        defaultPrompts: [
            "Does this intervention align with best practices?",
            "Evaluate whether this treatment plan meets agency standards.",
            "Assess the strengths and gaps in this approach."
        ]
    },

    // CREATE
    {
        id: "generate",
        name: "Generate",
        level: "create",
        levelName: "Create",
        levelOrder: 6,
        icon: "✨",
        aka: "Hypothesize",
        definition: "Come up with alternative hypotheses based on criteria.",
        defaultPrompts: [
            "Generate some possible explanations for this behavior.",
            "What are some alternative approaches we could try?",
            "Brainstorm ideas for engaging this resistant client."
        ]
    },
    {
        id: "plan",
        name: "Plan",
        level: "create",
        levelName: "Create",
        levelOrder: 6,
        icon: "📋",
        aka: "Design",
        definition: "Devise a procedure for accomplishing some task.",
        defaultPrompts: [
            "Design a treatment plan for this client.",
            "Create a step-by-step transition plan.",
            "Outline an approach for the upcoming family meeting."
        ]
    },
    {
        id: "produce",
        name: "Produce",
        level: "create",
        levelName: "Create",
        levelOrder: 6,
        icon: "🎨",
        aka: "Construct",
        definition: "Invent a product.",
        defaultPrompts: [
            "Write a referral letter for this client.",
            "Create a psychoeducational handout on coping skills.",
            "Draft a summary report for the treatment team."
        ]
    }
];

// Level colors for styling
const LEVEL_COLORS = {
    remember: "#e74c3c",
    understand: "#f39c12",
    apply: "#27ae60",
    analyze: "#3498db",
    evaluate: "#9b59b6",
    create: "#e91e63"
};
