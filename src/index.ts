import randomWords from 'random-words';

const main = () => {
  const iframe = document.getElementById('msBingFrame') as HTMLIFrameElement;
  let counter = 0;
  let intervalId: number;
  let mainIntervalId: number;

  const randomText = () => {
    const wordCount = Math.floor(Math.random() * 10) + 1; 
    return randomWords(wordCount).join(' ');
  }

  const func = () => {
    const searchString = randomText();
    iframe.src = `https://www.bing.com/search?q=${searchString}&PC=U316&FORM=CHROMN`;
    counter++;

    if (counter === 35) {
      clearInterval(intervalId);
      clearInterval(mainIntervalId);
    }
  }

  const start8SecondInterval = () => {
    let innerCounter = 0;

    intervalId = setInterval(() => {
      if (innerCounter < 3) {
        func();
        innerCounter++;
      } else {
        clearInterval(intervalId);
      }
    }, 8000);
  }

  mainIntervalId = setInterval(() => {
    if (counter < 35) {
      start8SecondInterval();
    } else {
      clearInterval(mainIntervalId);
    }
  }, 30000);
}

main();
