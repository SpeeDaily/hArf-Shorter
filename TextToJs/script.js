function convertToJS() {
  const fileInput = document.getElementById('textFile');
  const variableName = document.getElementById('variableName').value.trim();
  const preview = document.getElementById('preview');
  
  if (!fileInput.files.length) {
    alert("Please select a text file.");
    return;
  }
  if (!variableName.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/)) {
    alert("Please enter a valid JS variable name.");
    return;
  }
  
  const file = fileInput.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    let textContent = e.target.result;
    
    // Escape backticks and backslashes for template literal
    textContent = textContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
    
    const jsContent = `export const ${variableName} = \`\n${textContent}\n\`;\n`;
    
    // Show preview
    preview.textContent = jsContent;
    
    // Trigger download
    const blob = new Blob([jsContent], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${variableName}.js`;
    link.click();
  };
  
  reader.readAsText(file);
}