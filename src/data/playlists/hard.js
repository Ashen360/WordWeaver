/**
 * Hard Difficulty Playlist
 * Tricky overlapping domains requiring expert knowledge
 */

export const HARD_PLAYLIST = {
  title: "Expert Mode",
  groups: [
    {
      category: "Design Patterns",
      color: "#4ade80",
      words: ["Singleton", "Observer", "Factory", "Facade"],
    },
    {
      category: "HTTP Status Codes (as words)",
      color: "#60a5fa",
      words: ["OK", "Created", "Forbidden", "Found"],
    },
    {
      category: "Famous CS Papers / Systems",
      color: "#f472b6",
      words: ["MapReduce", "PageRank", "Dynamo", "Raft"],
    },
    {
      category: "Big O Notations",
      color: "#fb923c",
      words: ["Constant", "Linear", "Quadratic", "Logarithmic"],
    },

    {
      category: "Concurrency Concepts",
      color: "#4ade80",
      words: ["Mutex", "Semaphore", "Deadlock", "Race"],
    },
    {
      category: "Garbage Collection Strategies",
      color: "#60a5fa",
      words: ["Mark", "Sweep", "Compact", "Reference"],
    },
    {
      category: "CPU Scheduling Algorithms",
      color: "#f472b6",
      words: ["Round Robin", "FIFO", "Shortest Job", "Priority"],
    },
    {
      category: "CAP Theorem Terms",
      color: "#fb923c",
      words: ["Consistency", "Availability", "Partition", "Tolerance"],
    },

    {
      category: "Graph Theory Terms",
      color: "#4ade80",
      words: ["Vertex", "Edge", "Path", "Cycle"],
    },
    {
      category: "Compiler Phases",
      color: "#60a5fa",
      words: ["Lexing", "Parsing", "Optimization", "Codegen"],
    },
    {
      category: "Memory Segments",
      color: "#f472b6",
      words: ["Stack", "Heap", "Text", "Data"],
    },
    {
      category: "Process States",
      color: "#fb923c",
      words: ["Ready", "Running", "Waiting", "Terminated"],
    },

    {
      category: "ACID Properties",
      color: "#4ade80",
      words: ["Atomicity", "Consistency", "Isolation", "Durability"],
    },
    {
      category: "Isolation Levels",
      color: "#60a5fa",
      words: [
        "Read Uncommitted",
        "Read Committed",
        "Repeatable Read",
        "Serializable",
      ],
    },
    {
      category: "Normalization Forms",
      color: "#f472b6",
      words: ["1NF", "2NF", "3NF", "BCNF"],
    },
    {
      category: "Index Structures",
      color: "#fb923c",
      words: ["B-Tree", "Hash Index", "Bitmap", "Clustered"],
    },

    {
      category: "Networking Layers (TCP/IP)",
      color: "#4ade80",
      words: ["Application", "Transport", "Internet", "Link"],
    },
    {
      category: "OSI Layers (subset)",
      color: "#60a5fa",
      words: ["Physical", "Data Link", "Network", "Transport"],
    },
    {
      category: "Common Load Balancing Methods",
      color: "#f472b6",
      words: ["Round Robin", "Least Connections", "IP Hash", "Weighted"],
    },
    {
      category: "DNS Record Types",
      color: "#fb923c",
      words: ["A", "AAAA", "CNAME", "MX"],
    },

    {
      category: "Cryptographic Concepts",
      color: "#4ade80",
      words: ["Nonce", "Salt", "Key", "Cipher"],
    },
    {
      category: "Hashing Algorithms",
      color: "#60a5fa",
      words: ["MD5", "SHA1", "SHA256", "Bcrypt"],
    },
    {
      category: "Public Key Algorithms",
      color: "#f472b6",
      words: ["RSA", "DSA", "ECC", "ElGamal"],
    },
    {
      category: "TLS Handshake Steps",
      color: "#fb923c",
      words: ["ClientHello", "ServerHello", "Certificate", "Finished"],
    },

    {
      category: "Functional Programming Terms",
      color: "#4ade80",
      words: ["Closure", "Lambda", "Currying", "Immutability"],
    },
    {
      category: "Type Systems",
      color: "#60a5fa",
      words: ["Static", "Dynamic", "Strong", "Weak"],
    },
    {
      category: "Programming Language Features",
      color: "#f472b6",
      words: ["Reflection", "Generics", "Inheritance", "Polymorphism"],
    },
    {
      category: "Paradigm Keywords",
      color: "#fb923c",
      words: ["Pure", "Declarative", "Imperative", "Reactive"],
    },

    {
      category: "Distributed System Problems",
      color: "#4ade80",
      words: ["Split Brain", "Thundering Herd", "Clock Skew", "Hotspot"],
    },
    {
      category: "Consensus Algorithms",
      color: "#60a5fa",
      words: ["Raft", "Paxos", "Zab", "Viewstamped"],
    },
    {
      category: "Replication Strategies",
      color: "#f472b6",
      words: ["Leader-Follower", "Multi-Leader", "Quorum", "Gossip"],
    },
    {
      category: "Event Streaming Terms",
      color: "#fb923c",
      words: ["Producer", "Consumer", "Topic", "Partition"],
    },

    {
      category: "Compiler Optimizations",
      color: "#4ade80",
      words: ["Inlining", "Unrolling", "Constant Folding", "Dead Code"],
    },
    {
      category: "Cache Concepts",
      color: "#60a5fa",
      words: ["Hit", "Miss", "Eviction", "TTL"],
    },
    {
      category: "Paging Terms",
      color: "#f472b6",
      words: ["Page", "Frame", "Fault", "TLB"],
    },
    {
      category: "Virtual Memory Terms",
      color: "#fb923c",
      words: ["Swap", "Segment", "Page Table", "Offset"],
    },

    {
      category: "Machine Learning Steps",
      color: "#4ade80",
      words: ["Training", "Validation", "Testing", "Inference"],
    },
    {
      category: "Model Problems",
      color: "#60a5fa",
      words: ["Overfitting", "Underfitting", "Bias", "Variance"],
    },
    {
      category: "Activation Functions",
      color: "#f472b6",
      words: ["ReLU", "Sigmoid", "Tanh", "Softmax"],
    },
    {
      category: "Loss Functions",
      color: "#fb923c",
      words: ["MSE", "MAE", "CrossEntropy", "Hinge"],
    },

    {
      category: "Git Internals",
      color: "#4ade80",
      words: ["Blob", "Tree", "Commit", "Tag"],
    },
    {
      category: "Git States",
      color: "#60a5fa",
      words: ["Modified", "Staged", "Committed", "Untracked"],
    },
    {
      category: "Branching Strategies",
      color: "#f472b6",
      words: ["GitFlow", "Trunk", "Feature Branch", "Release Branch"],
    },
    {
      category: "Merge Strategies",
      color: "#fb923c",
      words: ["Fast-forward", "Recursive", "Squash", "Octopus"],
    },

    {
      category: "Web Rendering Steps",
      color: "#4ade80",
      words: ["Parse", "Style", "Layout", "Paint"],
    },
    {
      category: "Browser Storage",
      color: "#60a5fa",
      words: ["LocalStorage", "SessionStorage", "IndexedDB", "Cookies"],
    },
    {
      category: "Web Security Headers",
      color: "#f472b6",
      words: ["CSP", "HSTS", "X-Frame-Options", "Referrer-Policy"],
    },
    {
      category: "CORS Terms",
      color: "#fb923c",
      words: ["Origin", "Preflight", "Headers", "Credentials"],
    },
  ],
};
