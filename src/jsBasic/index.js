// function sayHello(name) {
//   console.log('welcome');
//   console.log('to');
//   console.log('Loupe');
// }

// sayHello()

// setTimeout(function () {
//   console.log('good bye');
// }, 6000)

// console.log('easy fe');
// -----------

// let promise = new Promise((rs, rj) => {
//   setTimeout(() => rs(4), 0);

//   Promise.resolve(console.log(3));

//   console.log(2);
// });

// promise
//   .then((rs) => {
//     console.log(rs ? rs ** rs : rs);
//     return rs;
//   })
//   .then((rs) => console.log(rs == 256 ? rs : rs * rs));

// ---------------
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 0);
// }

// for (let j = 0; j < 3; j++) {
//   setTimeout(() => console.log(j), 0);
// }

/*------- setTimeout 0 --------*/
// [11, 12, 13, 14, 15].forEach((item) => {
//   setTimeout(() => {
//     for (let i = 0; i < 10; i++) {
//       console.log(i);
//     }
//     console.log('----');
//   }, 0);

//   console.log(item)
// });

/*------- Micro vs Macro task --------*/
// console.log('1');

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('Promise');
// });

// console.log('2');

/*------- Async await --------*/
// const getLog = async () => {
//   return 'log'
// }

// getLog().then(str => console.log(str))

// ------------
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const getName = async (name) => {
  await sleep(1000)
  return name
}

const getNameLower = async (name) => {
  await sleep(5000)
  return name
}

const testSpeedAwait = async () => {
  const nameA = await getName('A')
  const nameB = await getName('B')
  const nameC = await getNameLower('C')

  return [nameA, nameB, nameC]
}

// console.time('testSpeedAwait')
// testSpeedAwait().then(rs => {
//   console.log(rs)
//   console.timeEnd('testSpeedAwait')
// })
// -----------------
const testSpeedTryCatch = async () => {
  try {
    const nameA = await getName('A')
    const nameB = await getName('B')
    const nameC = await getNameLower('C')
    throw Error()
  } catch (error) {
    return 'error---'
  }
}

// console.time('testSpeedTryCatch')
// testSpeedTryCatch().then(rs => {
//   console.log(rs)
//   console.timeEnd('testSpeedTryCatch')
// })
// -------
const testSpeedPromise = () => {
  const arr = []
  return getName("D")
    .then(v => {
      arr.push(v)
      return getName('E')
    })
    .then(v => {
      arr.push(v)
      return getNameLower('F')
    })
    .then(v => {
      arr.push(v)
      return arr
    })

}

// console.time('testSpeedPromise')
// testSpeedPromise().then(rs => {
//   console.log(rs)
//   console.timeEnd('testSpeedPromise')
// })
// --------
const testSpeedPromiseAll = async () => {
  const nameA = getName('G')
  const nameB = getName('H')
  const nameC = getNameLower('I')
  const arrResult = await Promise.all([nameA, nameB, nameC])
  return arrResult
}

// console.time('testSpeedPromiseAll')
// testSpeedPromiseAll().then(rs => {
//   console.log(rs)
//   console.timeEnd('testSpeedPromiseAll')
// })
// --------------
const arrList = ['Alice', 'Bob', 'Charlie']
const result = arrList.map(async (item) => {
  return await getName(item)
})
console.log('result', result);

const promises = arrList.map(item => getName(item))

// (async () => {
//   try {
//     const results = await Promise.all(promises);
//     console.log(results); // Outputs: ['Alice', 'Bob', 'Charlie']
//   } catch (error) {
//     console.error(error);
//   }
// })();

const testAsyncFor = async () => {
  for (const item of arrList) {
    console.log('testAsyncFor', await getName(item));
  }
}

testAsyncFor()
const testAsyncFor2 = async () => {
  for await (const item of promises) {
    console.log('testAsyncFor2', item);
  }

  if (await getName('G' === 'G')) {
    console.log('G === G');
  }
}

testAsyncFor2()