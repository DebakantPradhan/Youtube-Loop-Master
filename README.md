# YouTube Loop Master Extension

**YouTube Loop Master** is a browser extension designed to allow you to loop specific segments of YouTube videos with ease. Whether you need to replay your favorite moments or study a specific part of a tutorial, this extension gives you full control over the playback, making it simple to set and stop loops between any two time points.

## Features

- **Loop any segment of a YouTube video**: Select a start and end time to loop.
- **Start and Stop Loops**: Easily start and stop loops with a simple click of a button.
- **Fast Performance**: The extension runs efficiently, allowing for smooth video looping without noticeable delays.

## Installation

### 1. Download the Extension
Clone or download the repository to your local machine.

### 2. Load the Extension
To install the extension in your browser, follow these steps:

1. Open `chrome://extensions/` in Chrome or `about:addons` in Firefox.
2. Enable **Developer Mode** (top-right in Chrome).
3. Click on **Load unpacked** (in Chrome) or **Load Temporary Add-on** (in Firefox).
4. Select the extension's root directory (where the `manifest.json` is located).

The extension should now be installed and running.

## Usage

Once the extension is installed, follow these steps to start using it:

1. Open any YouTube video in your browser.
2. Click on the extension icon in the browser toolbar to open the popup.
3. In the popup, enter the **start** and **end** time (in seconds) for the loop.
4. Click **Start Loop** to begin looping the segment between the specified times.
5. To stop the loop, click **Stop Loop**.

## File Structure
/loop-master-extension
│
├── icons/                  
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── popup.html              
├── popup.js                
├── content.js              
├── content.css             
├── manifest.json           
└── README.md



### File Descriptions

- **`manifest.json`**: The manifest file that describes the extension, including permissions, background scripts, and content scripts.
- **`popup.html`**: The HTML file that defines the user interface shown when the extension icon is clicked.
- **`popup.js`**: Handles the interactions within the popup, such as sending start/stop loop requests.
- **`content.js`**: Injected into YouTube pages, this script interacts with the YouTube player to manage video playback and looping.
- **`content.css`**: Used to style any UI elements injected into the YouTube page (though optional).
- **`icons/`**: Contains icons of different sizes used for the extension’s interface.


## Troubleshooting

If the extension doesn't work as expected:

- Ensure you are on a valid YouTube video page.
- Make sure you have permission to interact with the YouTube player.
- Refresh the page and try again if the loop doesn't start or stop as expected.
- Check the browser console (right-click → Inspect → Console) for any error messages, and report them if needed.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and create a pull request with your changes. Here's how you can contribute:

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Open a pull request on this repository.

## License

This extension is open-source software and can be freely used and modified. Contributions are welcome.

## Contact

For questions or feedback, please reach out to devk.developer18@gmail.com.

