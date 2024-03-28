    const recognition = new window.webkitSpeechRecognition();
    const synthesis = window.speechSynthesis;

    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    document.getElementById('recordBtn').addEventListener('click', function() {
      recognition.start();      
    });   
     
    recognition.onresult = function(event) {  
      const transcript = event.results[0][0].transcript;    
      document.getElementById('noteInput').value += transcript;
    };

    document.getElementById('playBtn').addEventListener('click', function() { 
      const noteText = document.getElementById('noteInput').value;
      const utterance = new SpeechSynthesisUtterance(noteText);
      synthesis.speak(utterance);
    });

    document.getElementById('saveBtn').addEventListener('click', function() {
      saveNote();
    });

    function saveNote() {
      const noteText = document.getElementById('noteInput').value;
      const noteList = document.getElementById('noteList');
      const noteItem = document.createElement('li');
      noteItem.className = 'list-group-item';
      noteItem.innerHTML = `
        <span>${noteText}</span>
        <button class="btn btn-sm btn-primary editBtn"><i class="fas fa-edit"></i> Edit</button>
        <button class="btn btn-sm btn-danger deleteBtn"><i class="fas fa-trash-alt"></i> Delete</button>
      `;
      noteList.appendChild(noteItem);
      document.getElementById('noteInput').value = '';
    }

    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('editBtn')) {
        const noteText = event.target.previousElementSibling.textContent;
        document.getElementById('noteInput').value = noteText;

        event.target.parentElement.remove();
      } else if (event.target.classList.contains('deleteBtn')) {
        
        event.target.parentElement.remove();
      }
    });
