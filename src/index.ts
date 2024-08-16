import randomWords from 'random-words';

const main = () => {
  const iframe = document.getElementById('msBingFrame') as HTMLIFrameElement;
  const mainIntervalDiv = document.getElementById('mainInterval') as HTMLDivElement;
  const sec8IntervalDiv = document.getElementById('8SecInterval') as HTMLDivElement;
  const counterDiv = document.getElementById('counter') as HTMLDivElement;

  const MAX_8_SECOND_RUNS = 3;
  const MAX_MAIN_INTERVAL_RUNS = 35;
  let counter = 0;
  let intervalId: number;
  let mainIntervalId: number;
  let countdownIntervalId: number;
  let countdownValue = 30;

  const updateDiv = () => {
    counterDiv.innerText = `Counter: ${counter}`;
  };

  const randomText = () => {
    const wordCount = Math.floor(Math.random() * 10) + 1;
    return randomWords(wordCount).join(' ');
  };

  const func = () => {
    const searchString = randomText();
    iframe.src = `https://www.bing.com/search?q=${searchString}&PC=U316&FORM=CHROMN`;
    counter++;
    updateDiv();

    if (counter >= MAX_MAIN_INTERVAL_RUNS) {
      clearInterval(intervalId);
      clearInterval(mainIntervalId);
      clearInterval(countdownIntervalId);
      mainIntervalDiv.innerText = `Main Interval (30 sec): Stopped`;
      sec8IntervalDiv.innerText = `8-Second Interval: Stopped`;
      counterDiv.innerText = `Counter: ${counter} - Reached limit`;
    }
  };

  const start8SecondInterval = () => {
    let innerCounter = 0;

    intervalId = setInterval(() => {
      if (innerCounter < MAX_8_SECOND_RUNS && counter < MAX_MAIN_INTERVAL_RUNS) {
        func();
        innerCounter++;
        sec8IntervalDiv.innerText = `8-Second Interval: Running... (${innerCounter}/${MAX_8_SECOND_RUNS})`;
      } else {
        clearInterval(intervalId);
        sec8IntervalDiv.innerText = `8-Second Interval: Paused`;
      }
    }, 8000);
  };

  const startCountdown = () => {
    countdownValue = 30;
    mainIntervalDiv.innerText = `Main Interval (30 sec): ${countdownValue} seconds remaining`;

    countdownIntervalId = setInterval(() => {
      countdownValue--;
      mainIntervalDiv.innerText = `Main Interval (30 sec): ${countdownValue} seconds remaining`;

      if (countdownValue === 0) {
        clearInterval(countdownIntervalId);
      }
    }, 1000);
  };

  mainIntervalId = setInterval(() => {
    if (counter < MAX_MAIN_INTERVAL_RUNS) {
      start8SecondInterval();
      startCountdown();
    } else {
      clearInterval(mainIntervalId);
      mainIntervalDiv.innerText = `Main Interval (30 sec): Stopped`;
    }
  }, 30000);

  mainIntervalDiv.innerText = `Main Interval (30 sec): ${countdownValue} seconds remaining`;
  sec8IntervalDiv.innerText = `8-Second Interval: Waiting...`;
  counterDiv.innerText = `Counter: ${counter}`;

  startCountdown();
  start8SecondInterval();
};

main();
