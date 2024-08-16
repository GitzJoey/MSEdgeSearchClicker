import randomWords from 'random-words';

const main = () => {
  const iframe = document.getElementById('msBingFrame') as HTMLIFrameElement;
  let counter = 0;
  let intervalId: number;

  const randomText = () => {
    const wordCount = Math.floor(Math.random() * 10) + 1; 
    return randomWords(wordCount).join(' ');
  }

  const func = () => {
    const searchString = randomText();
    iframe.src = `https://www.bing.com/search?q=${searchString}&PC=U316&FORM=CHROMN`;
    counter++;
    console.log('counter', counter);

    if (counter === 35) {
      clearInterval(intervalId);
    }
  }

  intervalId = setInterval(func, 8000) as any;
}

main();
