import { useCallback, useEffect, useRef, useState } from 'react' 

 //starts the component
  const App = () => {
    //assign variable and change variable with the setters
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClikced] = useState(false);
    const boxRef = useRef(null);

    const [ data, setData ] = useState(null);
    const [ dataTwo, setDataTwo ] = useState(null);
    const [ dataThree, setDataThree ] = useState(null);


    const [ one, setOne ] = useState(null)
    const [ two, setTwo ] = useState(null)
    const [ three, setThree ] = useState(null)


    const [ loading, setLoading ] = useState(false);
    const [ loadingTwo, setLoadingTwo ] = useState(false);
    const [ loadingThree, setLoadingThree ] = useState(false);

    const [ error, setError ] = useState(null);
    const [ errorTwo, setErrorTwo ] = useState(null);
    const [ errorThree, setErrorThree ] = useState(null);


    const [ option1, setOption1 ] = useState('/option1.png')
    const [ option2, setOption2 ] = useState('/option2.png')
    const [ option3, setOption3 ] = useState('/option3.png')

    const [ allTrue, setAllTrue ] = useState(null);

    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef(null);

    
    useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);


    useEffect(() => {
      //run once on mount
      const initData = async () => {
        try {
          await fetch('http://127.0.0.1:3000/coord/reset', { method: 'GET'});
          console.log("check if all isfound = false")
        } catch (error) {
        console.error('Error updating:', error);
      }
    };
    initData();
  }, []);
    
    //inner function to component to handle document click
    // sets x and y to 0 axis objects
    const handleSingleClick = async (event) => {
        setPosition({x: event.clientX, y: event.clientY})
        boxRef.current = position
        setIsClikced(true)

    }

    const handleMouseLeave = async () => {
    // Hide the box as soon as the mouse moves
      setPosition({x: -50, y: -10})
      setIsClikced(false);      

      //test a function to check false and end game
        try {
          const response = await fetch(`http://127.0.0.1:3000/coord/all`)
          const isTrue = await response.json()
          setAllTrue(isTrue)
          console.log(isTrue)

          if (allTrue === true){
            clearInterval(timerRef.current);
            timerRef.current = null;
            console.log("Timer stopped successfully.");
            console.log("game over")
            window.location.reload();
          }

        } catch (err) {
        setError(error)
      } finally {
        //setLoading(false)
      }

  }


    const handleBoxOne = async (e) => {
      e.stopPropagation()
      console.log("box one")
      console.log(position.x, " test x position")
      console.log(position.y, " test y position")

      setLoading(true)
      setError(null)
          
      try {
        const response = await fetch(`http://127.0.0.1:3000/coord/one/1?one=${position.x}&two=${position.y}`)
        const resultOne = await response.json()
        setData(resultOne)// get certain data
        console.log(data.name)
        

        const responseOne = await fetch('http://127.0.0.1:3000/coord/one')
          const resultTwo = await responseOne.json()
          setOne(resultTwo)
          console.log(one)
          if(one[0].isFound == true){
            console.log("yes")
            setOption1(null)
          }
      } catch (err) {
        setError(error)
      } finally {
        //setLoading(false)
      }
      console.log(loading, "test changing variable")
      console.log(error, "no error")
      console.log(`Handle One wuz clicked + x: ${position.x} y: ${position.y} AND ${JSON.stringify(data.name)} ..\njust shows the data for reference here`)      
    };

    const handleBoxTwo = async (e) => {
      e.stopPropagation()
      console.log("box two")
      console.log(position.x, " test x position")
      console.log(position.y, " test y position")

      setLoadingTwo(true)
      setErrorTwo(null)
      
          
      try {
        const response = await fetch(`http://127.0.0.1:3000/coord/two/2?one=${position.x}&two=${position.y}`)
        const resultOne = await response.json()
        setDataTwo(resultOne)// get certain data
        console.log(dataTwo.name)
        

        const responseOne = await fetch('http://127.0.0.1:3000/coord/two')
          const resultTwo = await responseOne.json()
          setTwo(resultTwo)
          console.log(two)
          if(two[0].isFound == true){
            console.log("yes")
            setOption2(null)
          }
      } catch (err) {
        setError(error)
      } finally {
        //setLoading(false)
      }
      console.log(loading, "test changing variable")
      console.log(error, "no error")
      console.log(`Handle Two wuz clicked + x: ${position.x} y: ${position.y} AND ${JSON.stringify(dataTwo.name)} ..\njust shows the data for reference here`)      
    };


      const handleBoxThree = async (e) => {
      e.stopPropagation()
      console.log("box three")
      console.log(position.x, " test x position")
      console.log(position.y, " test y position")

      setLoadingThree(true)
      setErrorThree(null)
          
      try {
        const response = await fetch(`http://127.0.0.1:3000/coord/three/3?one=${position.x}&two=${position.y}`)
        const resultOne = await response.json()
        setDataThree(resultOne)// get certain data
        console.log(setDataThree.name)
        

        const responseOne = await fetch('http://127.0.0.1:3000/coord/three')
          const resultTwo = await responseOne.json()
          setThree(resultTwo)
          console.log(two)
          if(three[0].isFound == true){
            console.log("yes")
            setOption3(null)
          }
      } catch (err) {
        setError(error)
      } finally {
        //setLoading(false)
      }
      console.log(loading, "test changing variable")
      console.log(error, "no error")
      console.log(`Handle Three wuz clicked + x: ${position.x} y: ${position.y} AND ${JSON.stringify(dataThree.name)} ..\njust shows the data for reference here`)      
    };


    useEffect(() => {
      document.addEventListener('click', handleSingleClick);//if clicked show bo
      if (isClicked) {
        window.addEventListener('mouseleave', handleMouseLeave) //mousemove remove box
      }

      return () => { //remove event listerners
        document.removeEventListener('mousemove', handleSingleClick);
        window.removeEventListener('mousemove', handleMouseLeave);
      };
    }, [isClicked])

  //return visual code
  return (
    <>
    <div className='backgroundContainer'
    >
    <p className='timer'>Timer:{seconds}s</p>


      {isClicked && (
        <>
          <div 
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={handleMouseLeave}
              style={{
                position:'fixed',
                display: 'block',
                left: boxRef.current.x,
                top: boxRef.current.y,
                width: '75px',
                height: '180px',
                backgroundColor: 'black',
                // Center the box on the cursor position
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto', // Allows events to pass through the box to the document
                //zIndex: 190
              }}
          >
            <div className="row-item-one" onClick={handleBoxOne} >
              <img src={option1} />
            </div>
            <div className="row-item-two" onClick={handleBoxTwo} >
              <img src={option2} />
              </div>
            <div className="row-item-three" onClick={handleBoxThree} >
              <img src={option3} />
              </div>
          </div>
          
        </>
        )}
    </div>
  </>
  )
}

export default App
