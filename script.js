document.addEventListener('DOMContentLoaded', () => {
  const dropArea = document.getElementById('dropArea');
  const imageInput = document.getElementById('imageInput');
  const preview = document.getElementById('preview');
  const uploadForm = document.getElementById('uploadForm');

  dropArea.addEventListener('click', () => {
    imageInput.click();
  });

  dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = 'green';
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#ccc';
  });

  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#ccc';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
      imageInput.files = files; // ドロップしたファイルをファイル入力に設定
    }
  });

  imageInput.addEventListener('change', () => {
    const files = imageInput.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  });

  uploadForm.addEventListener('submit', (event) => {
    if (imageInput.files.length === 0) {
      alert('Please select an image file before submitting.');
      event.preventDefault(); // フォーム送信をキャンセル
    }
  });

  function handleFiles(files) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      preview.innerHTML = '';
      preview.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});
