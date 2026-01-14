// LLM Capability Cards Data
// Based on Bloom's Revised Taxonomy

const CAPABILITIES = [
    // REMEMBER
    {
        id: "identify",
        name: "Identify",
        level: "remember",
        levelName: "Remember",
        definition: "Locate and retrieve specific information from provided content.",
        defaultPrompts: [
            "Find all mentions of [topic] in this document",
            "List the key dates mentioned in this text",
            "Extract the names of all people referenced"
        ]
    },

    // UNDERSTAND
    {
        id: "interpret",
        name: "Interpret",
        level: "understand",
        levelName: "Understand",
        definition: "Clarify the meaning of information by paraphrasing or explaining it differently.",
        defaultPrompts: [
            "Explain this passage in simpler terms",
            "What does this technical term mean in context?",
            "Paraphrase this paragraph for a general audience"
        ]
    },
    {
        id: "exemplify",
        name: "Exemplify",
        level: "understand",
        levelName: "Understand",
        definition: "Provide specific examples or instances of a concept or category.",
        defaultPrompts: [
            "Give me three examples of [concept]",
            "What are some real-world instances of this principle?",
            "Illustrate this idea with concrete examples"
        ]
    },
    {
        id: "classify",
        name: "Classify",
        level: "understand",
        levelName: "Understand",
        definition: "Determine the category or type that something belongs to.",
        defaultPrompts: [
            "Categorize these items by [criteria]",
            "Which type of [category] does this belong to?",
            "Sort these examples into appropriate groups"
        ]
    },
    {
        id: "summarize",
        name: "Summarize",
        level: "understand",
        levelName: "Understand",
        definition: "Condense information into a shorter form while preserving key points.",
        defaultPrompts: [
            "Summarize this document in 3 bullet points",
            "What are the main takeaways from this text?",
            "Provide a brief overview of the key arguments"
        ]
    },
    {
        id: "infer",
        name: "Infer",
        level: "understand",
        levelName: "Understand",
        definition: "Draw conclusions or make predictions based on available information.",
        defaultPrompts: [
            "Based on this data, what conclusions can we draw?",
            "What might happen next given this information?",
            "What underlying patterns do you notice?"
        ]
    },
    {
        id: "compare",
        name: "Compare",
        level: "understand",
        levelName: "Understand",
        definition: "Identify similarities and differences between two or more items.",
        defaultPrompts: [
            "Compare and contrast these two approaches",
            "What are the similarities between X and Y?",
            "How do these options differ from each other?"
        ]
    },
    {
        id: "explain",
        name: "Explain",
        level: "understand",
        levelName: "Understand",
        definition: "Describe how something works or why something occurs.",
        defaultPrompts: [
            "Explain why this process works this way",
            "What causes this phenomenon?",
            "Walk me through how this system functions"
        ]
    },

    // APPLY
    {
        id: "execute",
        name: "Execute",
        level: "apply",
        levelName: "Apply",
        definition: "Apply a procedure or method to complete a specific task.",
        defaultPrompts: [
            "Apply this formula to calculate [result]",
            "Use this template to draft [document]",
            "Follow this process to complete [task]"
        ]
    },

    // ANALYZE
    {
        id: "differentiate",
        name: "Differentiate",
        level: "analyze",
        levelName: "Analyze",
        definition: "Distinguish relevant from irrelevant parts, or important from unimportant aspects.",
        defaultPrompts: [
            "What are the most critical points in this document?",
            "Separate the essential information from the background details",
            "Which factors are most relevant to this decision?"
        ]
    },
    {
        id: "organize",
        name: "Organize",
        level: "analyze",
        levelName: "Analyze",
        definition: "Determine how elements fit together or function within a structure.",
        defaultPrompts: [
            "Organize this information into a logical structure",
            "Create an outline showing how these ideas relate",
            "Map out the relationships between these components"
        ]
    },
    {
        id: "attribute",
        name: "Attribute",
        level: "analyze",
        levelName: "Analyze",
        definition: "Determine the perspective, bias, values, or intent underlying information.",
        defaultPrompts: [
            "What perspective is this written from?",
            "Identify any potential biases in this text",
            "What assumptions underlie this argument?"
        ]
    },

    // EVALUATE
    {
        id: "check",
        name: "Check",
        level: "evaluate",
        levelName: "Evaluate",
        definition: "Detect inconsistencies, errors, or whether something meets specific criteria.",
        defaultPrompts: [
            "Review this for factual accuracy",
            "Check if this meets the specified requirements",
            "Identify any logical inconsistencies"
        ]
    },
    {
        id: "critique",
        name: "Critique",
        level: "evaluate",
        levelName: "Evaluate",
        definition: "Judge something based on criteria and standards, identifying strengths and weaknesses.",
        defaultPrompts: [
            "Evaluate the strengths and weaknesses of this approach",
            "What are the pros and cons of this solution?",
            "Assess how well this meets the stated goals"
        ]
    },

    // CREATE
    {
        id: "generate",
        name: "Generate",
        level: "create",
        levelName: "Create",
        definition: "Brainstorm multiple ideas, possibilities, or hypotheses.",
        defaultPrompts: [
            "Generate 5 possible solutions to this problem",
            "Brainstorm ideas for [project]",
            "What are some alternative approaches we could consider?"
        ]
    },
    {
        id: "plan",
        name: "Plan",
        level: "create",
        levelName: "Create",
        definition: "Devise a strategy, procedure, or method to accomplish an objective.",
        defaultPrompts: [
            "Create a step-by-step plan for [goal]",
            "Outline a strategy to address this challenge",
            "Design a process for implementing this solution"
        ]
    },
    {
        id: "produce",
        name: "Produce",
        level: "create",
        levelName: "Create",
        definition: "Create a finished product, document, or artifact.",
        defaultPrompts: [
            "Write a draft of [document type]",
            "Create a [deliverable] based on these requirements",
            "Produce a complete [output] incorporating this feedback"
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
