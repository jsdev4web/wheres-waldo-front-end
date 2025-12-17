import { useCallback, useEffect, useRef, useState } from 'react' 

 //starts the component
  const App = () => {
    //assign variable and change variable with the setters
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClikced] = useState(false);
    const boxRef = useRef(null);

    //inner function to component to handle document click
    // sets x and y to 0 axis objects
    const handleDocumentClick = (event) => {
        setPosition({x: event.clientX, y: event.clientY}) 
        setIsClikced(true)
      }

    const handleDocumentMouseMove = () => {

    // Hide the box as soon as the mouse moves
      setIsClikced(false);
  }

  
//useEffect handles the side effects of unwanted rendors
    useEffect(() => {
      document.addEventListener('click', handleDocumentClick);//if clicked show bo
      if (isClicked) {
        window.addEventListener('dblclick', handleDocumentMouseMove) //mousemove remove box
      }

      return () => { //remove event listerners
        document.removeEventListener('mousemove', handleDocumentClick);
        window.removeEventListener('mousemove', handleDocumentMouseMove);
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
              style={{
                position:'fixed',
                display: 'block',
                left: position.x,
                top: position.y,
                width: '150px',
                height: '100px',
                backgroundColor: 'lightblue',
                // Center the box on the cursor position
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none', // Allows events to pass through the box to the document
                zIndex: 190
              }}
          >
            <div className="row-item">Row 1</div>
            <div className="row-item">Row 2</div>
            <div className="row-item">Row 3</div>
          </div>
          
        </>
        )}
    </div>
  </>
  )
}

export default App
