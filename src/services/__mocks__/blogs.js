const blogs = [
  {
    user: [
      {
        username: "movd",
        name: "movd",
        id: "5dasdasdadsdasddasdasada"
      }
    ],
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 4,
    id: "5dcbe1212315151151541"
  },
  {
    user: [
      {
        username: "movd",
        name: "movd",
        id: "5dasdasdadsdasddasdasada"
      }
    ],
    title: "Getting started with security keys",
    author: "Paul Stamatiou",
    url: "https://paulstamatiou.com/getting-started-with-security-keys/",
    likes: 6,
    id: "5dcd59858451848975"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = () => {};

export default { getAll, setToken };
