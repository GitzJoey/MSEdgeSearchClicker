import randomWords from 'random-words';

const main = () => {
  const iframe = document.getElementById('msBingFrame') as HTMLIFrameElement;
  const mainIntervalDiv = document.getElementById('mainInterval') as HTMLDivElement;
  const sec8IntervalDiv = document.getElementById('8SecInterval') as HTMLDivElement;
  const counterDiv = document.getElementById('counter') as HTMLDivElement;

  let counter = 0;
  let intervalId: number;
  let mainIntervalId: number;

  const updateDiv = () => {
    mainIntervalDiv.innerText = `Main Interval (30 sec): Running...`;
    sec8IntervalDiv.innerText = `8-Second Interval: Running...`;
    counterDiv.innerText = `Counter: ${counter}`;
  };

  const randomText = () => {
    // Generate a random number of words between 1 and 10
    const wordCount = Math.floor(Math.random() * 10) + 1; 
    return randomWords(wordCount).join(' ');
  }

  const func = () => {
    const searchString = randomText();
    iframe.src = `https://www.bing.com/search?q=${searchString}&PC=U316&FORM=CHROMN`;
    counter++;
    updateDiv();

    // Stop the intervals if counter reaches 35
    if (counter === 35) {
      clearInterval(intervalId);
      clearInterval(mainIntervalId);
      mainIntervalDiv.innerText = `Main Interval (30 sec): Stopped`;
      sec8IntervalDiv.innerText = `8-Second Interval: Stopped`;
      counterDiv.innerText = `Counter: ${counter} - Reached limit`;
    }
  }

  const start8SecondInterval = () => {
    let innerCounter = 0;

    intervalId = setInterval(() => {
      if (innerCounter < 3) {
        func();
        innerCounter++;
        sec8IntervalDiv.innerText = `8-Second Interval: Running... (${innerCounter}/3)`;
      } else {
        clearInterval(intervalId);
        sec8IntervalDiv.innerText = `8-Second Interval: Paused`;
      }
    }, 8000);
  }

  // Start the 30-second interval
  mainIntervalId = setInterval(() => {
    if (counter < 35) {
      start8SecondInterval();
    } else {
      clearInterval(mainIntervalId);
      mainIntervalDiv.innerText = `Main Interval (30 sec): Stopped`;
    }
  }, 30000);

  // Initial state
  mainIntervalDiv.innerText = `Main Interval (30 sec): Waiting...`;
  sec8IntervalDiv.innerText = `8-Second Interval: Waiting...`;
  counterDiv.innerText = `Counter: ${counter}`;
}

main();
