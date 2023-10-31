async function getDuration(file) {
  const url = URL.createObjectURL(file);
 
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.muted = true;
    const source = document.createElement("source");
    source.src = url; //--> blob url
    audio.preload= "metadata";
    audio.appendChild(source);
    audio.onloadedmetadata = function(){
       let result = resolve(audio.duration)
       return result
    };
  });
 }

export default getDuration;