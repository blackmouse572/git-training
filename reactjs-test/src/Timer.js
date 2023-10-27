import {useState, useEffect} from "react";
import Button from "./Button";
import Display from "./Display.js";

function Timer({ startTime, onComplete }) {
    const [remaining, setRemaining] = useState(startTime);
    const [isRunning, setRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        function tick() {
            setRemaining((oldValue) => {
                const value = oldValue - 1;
                if (value <= 0) {
                    onComplete();
                    return 0;
                }
                return value;
            });
        }

        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [isRunning, onComplete]);

    return(
        <section className="timer">
            <Display time={remaining}/>
            {isRunning ? (
                <Button icon="pause" label="Pause" onClick={() => setRunning(false)}/>
            ) : (
                <Button icon="play" label="Play" onClick={() => setRunning(true)}/>
            )}
            <Button icon="trash" label="Delete" onClick={onComplete}/>
            <Button icon="reset" label="Reset" onClick={onComplete}/>
        </section>
    );
}
export default Timer;
