
// احصل على المراجع لعناصر HTML
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const recordingsList = document.getElementById('recordingsList');

let mediaRecorder;
let audioChunks = [];

// وظيفة لبدء التسجيل
startBtn.addEventListener('click', async () => {
      // سجل النقر على زر البدء 
    console.log("Start button clicked");
    try {
    // طلب الإذن لاستخدام الميكروفون
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    // اجمع أجزاء الصوت عند تسجيلها
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    // عند توقف التسجيل، قم بإنشاء ملف صوت جديد
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = audioUrl;

        const li = document.createElement('li');
        li.appendChild(audio);

        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = 'recording.wav';
        downloadLink.textContent = 'تنزيل التسجيل';
        li.appendChild(downloadLink);

        recordingsList.appendChild(li);

        // إعادة تعيين أجزاء الصوت
        audioChunks = [];
    };

//     mediaRecorder.onstop = async () => { 
//     const audioBlob = new Blob(audioChunks, { type: 'audio/wav' }); 
//     const formData = new FormData(); formData.append('audio', audioBlob, 'recording.wav'); 
//     const response = await fetch('/upload', { 
//         method: 'POST', body: formData, 
//     }); 
//     const data = await response.json(); 
//     const audioUrl = data.filePath; 
//     const audio = document.createElement('audio'); 
//     audio.controls = true; 
//     audio.src = audioUrl; 
//     const li = document.createElement('li'); 
//     li.appendChild(audio); 
//     recordingsList.appendChild(li); 
//     audioChunks =[]; 
// };


    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    console.log("Recording started");  // سجل بدء التسجيل 
    } catch (error) { 
        console.error("Error accessing microphone: ", error); 
    }
});

// وظيفة لإيقاف التسجيل
stopBtn.addEventListener('click', () => {
    console.log("Stop button clicked"); // سجل النقر على زر الإيقاف
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        console.log("Recording stopped"); // سجل إيقاف التسجيل 
        } else { 
            console.log("Media recorder not active or not initialized"); 
    }
});
