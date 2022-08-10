// TEMPORARY FILE. TABLE OF RESOURCES DEPENDS ON THIS. DELETE IMPORT LINE AND CHANGE THE CALL.

/* import namor from 'namor'; 

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  };
};

export default function makeData(...lens) {
  //lens is passed down from App.js
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      // range(len) creates an array with length = len
      return {
        // populates each index of the array with
        ...newPerson(), // returns: ...{ newPerson details } (need to keep ... i think)
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined, // if there is a next row, call the function again. if not, don't
      };
    });
  };

  return makeDataLevel();
}


const RESOURCES_DATA = [
    {
    title: "Intro to Image Analysis in Matlab",
        briefDescription: "Quick start to Image Analysis tools in Matlab",
    link: "https://www.mathworks.com/products/computer-vision.html",
        tags: "beginner, tools",
    date: '2022-07-23',
        user: "Tay Jiahui",
        icon: `<p>Text</p>`,
    }
] */