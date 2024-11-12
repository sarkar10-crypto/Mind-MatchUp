import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const getNums = () => {
  const List = [];
  for (let i = 1; i <= 8; i++){
    List.push(i); 
    List.push(i);
  }
  return List;
}

function App() {

  // same number ko solvelist ke help se remove kardenge
  const [solvedList, setsolvedList] = useState([]);

  const [opened, setopened] = useState([]);

  // getNums() main numbers hain usko initialization karni hai or ek state ko maintain karni hai
  const [nums, setnums] = useState(getNums());

  
  // ek stage maintain karenge usestate ko use karke
  const [stage, setstage] = useState("init");


  // toh jab bhi start hoga to random numbers generate honi chahiye uske liye ek function generate kar rahe hai
  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
    
  }
  const handleStart = () => {
    setstage('start');
    randomNums();
    setnums(randomNums());
    setsolvedList([]);
    // normal output {1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8}----> aisa nahin karna hai hum ko randomized number chahiye
  }

  const handleClick = (num, index) => {
    if (opened.length === 2)
      return;
    setopened((prev) => [...prev, index]);
    
  }


  useEffect(() => {
    if (opened.length === 2) {
      //  num equal ho sakta hai nahin toh
      // not equal
      setTimeout(() => {
        // index ki value se card find karna hai
        const id1 = opened[0];
        const id2 = opened[1];
        if (nums[id1] === nums[id2]) {
          //if equal then remove the card
          // agar equal hai toh setsolved vali list bhi maintain karni hai
          setsolvedList((prev) => [...prev, nums[id1]]);
        } 
        setopened([]);
      })
   }
  }, [opened])

  // jab solveList pura hojaye or display main cards har ek remove ho jaye toh or ek UseEffect ko use karna hai .

  useEffect(() => {
    if (solvedList.length === 8) {
      setstage('win');
    }
  }, [solvedList])
  


  // card ke upar class apply karna hai takiki pata chale show karna hai , hide karna hai ya phir remove karna hai

  const getClassName = (num, index) => {
    if (solvedList.includes(num)) {
      return 'remove';
    }
    else if (opened.includes(index)) {
      return 'show';
    }
    else
      return 'hide';
  }
  
  // ab class ko pass karna hai `${getClassName(num, i)}`

  // console.log(nums);
  console.log(opened);
  
  

  return (
    <div className="App">
      <h1 className='heading'>MIND-MATCHUP</h1>
{/* stage - 1 init stage */}

      {
        // button pe onclick listner apply karenge taki actions apply ho and next page pe shift ho jaye
        stage === "init" && <button onClick={handleStart}>Play</button>
      }

      {/* stage -2 (start Stage)  1 st button initialize karega or jab bhi button pe click hoga toh ek div show karana hai */}

      {
        stage === "start" &&
        <div className='game-bord'>
            <div className='cards'>
              {
                nums.map((num, i) => (
                  <div onClick={()=>handleClick(num,i)} key={i} className={`card ${getClassName(num, i)}`}>{num}</div>
                ))
              }
            </div>
        </div>
      }

      {/* stage -3 (win stage) */}

      {
        stage === "win" &&
        <div>
            <h1 className='uwon'>{"🎉"} You Won {"🎉"} </h1>
            <button onClick={handleStart}>Play Again</button>
        </div>
      }
      
    </div>
  );
}

export default App;
