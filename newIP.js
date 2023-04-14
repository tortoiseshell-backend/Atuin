const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user to enter a new value for MY_IP
rl.question('Enter a new value for MY_IP: ', (newIp) => {
  // Read the contents of the .env file
  const envContents = fs.readFileSync('.env', 'utf8');

  // Split the contents into an array of lines
  const envLines = envContents.split('\n');

  // Find the line that starts with "MY_IP="
  const ipLineIndex = envLines.findIndex(line => line.startsWith('MY_IP='));

  if (ipLineIndex >= 0) {
    // Replace the existing line with the new value for MY_IP
    envLines[ipLineIndex] = `MY_IP='${newIp}'`;

    // Write the updated contents back to the .env file
    fs.writeFileSync('.env', envLines.join('\n'));
    console.log(`Updated MY_IP to '${newIp}' in .env file.`);
  } else {
    console.error('Could not find MY_IP in .env file.');
  }

  rl.close();
});