import React, { useState, useEffect, useRef} from 'react';

const AppContent = () => {
    const [score, setScore] = useState(0);
    const instantScore = useRef(score); // burada bir score nesnesi referans alır ve aşağıda instantScore.current ile o score objesinin current değerine atar
    const [left, setLeft] = useState(700);
    const [top, setTop] = useState(270);
    const [time, setTime] = useState(30);
    const [isStarded, setIsStarded] = useState(false);

    useEffect(() => {
        instantScore.current = score;
    }, [score]);

    useEffect(() => {
        const timer = setInterval(() => {
            if(isStarded === true){
                setTime(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(timer);
                        alert("Time is up! Your score : " + instantScore.current);
                        window.location.reload();
                        return 0;
                    }
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isStarded]);

    const randomLocation = () => {
        const maxLeft = 1307;
        const minLeft = 110;
        const randomLeft = Math.random() * (maxLeft - minLeft) + minLeft;
        setLeft(randomLeft);
        const maxTop = 535;
        const minTop = 90;
        const randomTop = Math.random() * (maxTop - minTop) + minTop;
        setTop(randomTop);
    }

    const clicked = () => {
        if(isStarded === false){
            setIsStarded(true);
        }
        setScore(score + 1);
        randomLocation();
    }

    return (
        <div style={{ backgroundColor: 'rgb(230, 230, 230)', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '8vh' }}>
            <h1 style={{ userSelect: 'none' }} className='mt-1'>{score}</h1>
            <button className='btn btn-primary' style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, height: '120px', width: '120px', borderRadius: '55px', backgroundColor: 'rgb(190, 190, 190)', borderColor: 'rgb(32, 126, 197)' }} onClick={clicked}></button>
            <footer style={{ backgroundColor: 'rgb(230, 230, 230)', position: 'fixed', bottom: 0, width: '100vw', display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ userSelect: 'none' }} className='mb-2'>{time}</h1>
            </footer>
        </div>
    );
}

export default AppContent;
