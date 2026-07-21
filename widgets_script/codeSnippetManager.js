// Sample data for initial snippets
const initialSnippets = [
  {
    id: 1,
    title: 'Fibonacci Sequence',
    description: 'Generate Fibonacci sequence up to n terms',
    category: 'Algorithms',
    language: 'python',
    code: 'def fibonacci(n):\n      sequence = [0, 1]\n     for i in range(2, n):\n     sequence.append(sequence[i-1] + sequence[i-2])      return sequence\n\n# Example usage\nprint(fibonacci(10))',
    createdAt: '2026-10-15',
  },
  {
    id: 2,
    title: 'Array Shuffle',
    description: 'Fisher-Yates algorithm for shuffling an array',
    category: 'JavaScript',
    language: 'javascript',
    code: 'function shuffleArray(array) {\n     for (let i = array.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n        [array[i], array[j], array[i];\n    }\n     return array;\n}\n\n// Example usage\nconst myArray = [1, 2, 3, 4, 5];\nconsole.log(shuffleArray(myArray));',
    createdAt: '2026-10-10',
  },
  {
    id: 3,
    title: 'Responsive Navbar',
    description: 'CSS for a responsive navigation bar',
    category: 'CSS',
    language: 'css',
    code: '.navbar {\n      display: flex;\n        justify-content: space-between:\n       align-items: center;\n      padding: 1rem 2rem;\n       background-color: #333;\n       color: white;\n}\n\n.nav-links {\n      display: flex;\n    gap: 2rem;\n}\n\n@media (max-width: 768px) {\n      .nav-links {\n      display: none;\n    }\n     \n      .mobile-menu-btn {\n        display: block;\n   }/n}',
    createdAt: '2026-10-05',
  },
  {
    id: 4,
    title: 'Helper function for fetching data from API with error handling',
    category: 'JavaScript',
    language: 'javascript',
    code: "async function fetchData(url, options = {}) {\n      try {\n     const response = await fetch(url, {\n       headers: {\n        'Content-type': 'application/json',\n        ...options.headers\n        },\n        ...options\n        });\n       \n      if (!response.ok) {\n       throw new Error(`HTTP error! Status: ${response.status}`);\n        }\n     \n      return await response.json();\n     } catch (error) {\n     console.error('Fetch error:', error);\n     throw error;\n      }\n}\n\n// Example usage\nconst data = await fetchData('https://api.example.com/data');",
    createdAt: '2026-10-01',
  },
];

// Application state
let snippets = JSON.parse(localStorage.getItem('codeSnippets')) || initialSnippets;
let currentCategory = 'all';
let editingSnippetId = null;
let searchQuery = '';
