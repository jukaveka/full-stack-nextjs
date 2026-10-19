const blogs = [
  {
    id     : 1,
    author : "Nick Sturdivant",
    url    : "https://blogs.perficient.com/replacing-postman-with-the-rest-client-visual-studio-code-extension/",
    title  : "Replacing Postman with the REST Client Visual Studio Code Extension",
    likes  : 5
  }, {
    id     : 2,
    author : "Damilola Olatunji",
    url    : "https://blog.appsignal.com/2025/06/11/using-sql-in-nodejs-with-sequelize.html",
    title  : "Using SQL in Node.js with Sequelize",
    likes  : 0
  }, {
    id     : 3,
    author : "John Loewen",
    url    : "https://towardsai.com/p/machine-learning/sturdy-gpt-4-guardrails-better-prompting-for-python-code-results",
    title  : "Sturdy GPT-4 Guardrails: Better Prompting For Python Code Results",
    likes  : 3
  }
]

const getNewId = () => {
  const identifiers = blogs.map(blog => blog.id)
  return Math.max(...identifiers) + 1
}

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  const newBlog = {
    id: getNewId(),
    title,
    author,
    url,
    likes: 0,
  }

  blogs.push(newBlog)
}