import { useCallback, useEffect, useRef, useState } from 'react' 

 //starts the component
  const App = () => {
    //assign variable and change variable with the setters
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClikced] = useState(false);
    const boxRef = useRef(null);

    
    //inner function to component to handle document click
    // sets x and y to 0 axis objects
    const handleSingleClick = (event) => {
        setPosition({x: event.clientX, y: event.clientY})
        boxRef.current = position
        setIsClikced(true)
      }

    const handleMouseLeave = () => {

    // Hide the box as soon as the mouse moves
      setPosition({x: -50, y: -10})
      setIsClikced(false);
  }

    const handleBoxOne = () => {
      //alert("You clicked on box one")
      console.log(`One wuz clicked + x: ${position.x} y: ${position.y}`)
    }

    const handleBoxTwo = () => {
      //alert("You clicked on box one")
      console.log(`Two wuz clicked + x: ${position.x} y: ${position.y}`)
    }

    const handleBoxThree = () => {
      //alert("You clicked on box one")
      console.log(`Three wuz clicked + x: ${position.x} y: ${position.y}`)
    }



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


      {isClicked && (
        <>
          <div 
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
            <div className="row-item" onClick={handleBoxOne} >
              <img src='/option1.png' />
            </div>
            <div className="row-item" onClick={handleBoxTwo} >
              <img src='/option2.png' />
              </div>
            <div className="row-item" onClick={handleBoxThree} >
              <img src='/option3.png' />
              </div>
          </div>
          
        </>
        )}
    </div>
  </>
  )
}

export default App
